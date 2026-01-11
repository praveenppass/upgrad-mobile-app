import { useCallback, useEffect, useMemo, useState } from "react";

import useSearchCourseModel from "@screens/Home/SearchCourses/useSearchCourseModel";

import { storage } from "@config/mmkvStorage";

import { ICourseVariantEnum } from "@interface/app.interface";
import { IHomeCourseCard } from "@interface/components/home/homeCourseCard";

import StorageKeys from "@constants/storage.constants";

import { strings } from "@assets/strings";

export const useSearchCoursesController = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [courses, setCourses] = useState<IHomeCourseCard[]>([]);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [filteredCourses, setFilteredCourses] = useState<IHomeCourseCard[]>(
		[],
	);
	const [showSearchHistory, setShowSearchHistory] = useState(true);
	const [showClearBtn, setShowClearBtn] = useState(false);
	const { data: data, loading: loading } = useSearchCourseModel();

	const onClear = useCallback(() => setSearchQuery(""), [setSearchQuery]);

	useEffect(() => {
		loadSearchHistory();
	}, []);

	useEffect(() => {
		if (!searchQuery.trim() || searchQuery.trim().length) {
			const fc = courses.filter((course) =>
				course?.title
					?.toLowerCase()
					.includes(searchQuery.toLowerCase()),
			);

			setFilteredCourses(fc);
		} else {
			setFilteredCourses([]);
		}
	}, [searchQuery]);

	useEffect(() => {
		setShowClearBtn(!!searchQuery.trim());
		setShowSearchHistory(!searchQuery.trim());
	}, [searchQuery]);

	useEffect(() => {
		if (!data || !data.learnerCourses.totalCount) return;
		const stateCourses: IHomeCourseCard[] = [];
		data.learnerCourses.result.map((course) =>
			stateCourses.push({
				title:
					course.courseInfo.name ||
					course?.program?.name ||
					course?.course?.name,
				duration: course?.totalLearningDuration,
				progress: course?.progress,
				imageUrl: course?.program?.image || course?.course?.image,
				id: course?.id,
				variant: course?.variant as ICourseVariantEnum,
			}),
		);

		setCourses(stateCourses);
	}, [data]);

	const loadSearchHistory = async () => {
		try {
			const jsonValue = await storage.getString(
				StorageKeys.SEARCH_HISTORY,
			);
			if (jsonValue != null) {
				setSearchHistory(JSON.parse(jsonValue));
			}
		} catch (e) {
			//
		}
	};

	const removeSearchQuery = useCallback(
		async (query: string) => {
			try {
				const updatedHistory = searchHistory.filter(
					(item) => item !== query,
				);
				setSearchHistory(updatedHistory);

				const jsonValue = JSON.stringify(updatedHistory);
				await storage.set(StorageKeys.SEARCH_HISTORY, jsonValue);
			} catch (e) {
				//
			}
		},
		[searchHistory],
	);

	const saveSearchQuery = async (query: string) => {
		try {
			if (!searchHistory.includes(query)) {
				const updatedHistory = [query, ...searchHistory].slice(0, 5); // Limit history to 5 items
				setSearchHistory(updatedHistory);

				const jsonValue = JSON.stringify(updatedHistory);
				await storage.set(StorageKeys.SEARCH_HISTORY, jsonValue);
			}
		} catch (e) {
			//
		}
	};

	const onSubmitHandler = useCallback(() => {
		if (searchQuery.trim()) saveSearchQuery(searchQuery.trim());
	}, [searchQuery, saveSearchQuery]);

	const resultsText = useMemo(() => {
		if (filteredCourses.length === 0) return "";
		return `${strings.SHOWING} ${filteredCourses.length} ${strings.RESULTS}`;
	}, [filteredCourses.length]);

	const searchHistoryKeyExtractor = useCallback(
		(_item: string, index: number) => index.toString(),
		[],
	);

	const courseKeyExtractor = useCallback(
		(item: IHomeCourseCard) => String(item.title),
		[],
	);

	return {
		onClear,
		onSubmitHandler,
		removeSearchQuery,
		loadSearchHistory,
		searchHistory,
		data,
		loading,
		searchQuery,
		showSearchHistory,
		showClearBtn,
		courses,
		filteredCourses,
		setSearchQuery,
		resultsText,
		searchHistoryKeyExtractor,
		courseKeyExtractor,
	};
};

export default useSearchCoursesController;
