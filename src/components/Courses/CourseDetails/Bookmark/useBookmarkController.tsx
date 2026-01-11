/* eslint-disable func-style */
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useBookmarkModel } from "@components/Courses/CourseDetails/Bookmark/useBookmarkModel";
import {
	IAssetItem,
	IModuleType,
} from "@components/Courses/CourseDetails/Note/common/ModuleAndAssetInterface";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { BookmarksForUserProgram } from "@graphql/query/bookmark/getCourseBookmarkQuery";

import { studyPlanSlice } from "@redux/slices/studyplan.slice";

import { LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

interface IBookmarkController {
	learningPathType: string;
	learningPathId: string;
	learningPathName: string;
	workshopId: string;
	workshopCode: string;
	userProgramId: string;
	learningPathCode: string;
}
export const useBookmarkController = ({
	learningPathType,
	learningPathId,
	learningPathName,
	workshopId,
	workshopCode,
	userProgramId,
	learningPathCode,
}: IBookmarkController) => {
	const dispatch = useDispatch();

	const [courseRender, setCourseRender] = useState<{
		courseData: BookmarksForUserProgram[];
		activeIndex: number;
	}>({ courseData: [], activeIndex: 0 });

	const {
		courseDetailsData,
		modulesDetailsData,
		bookMarkAssetsListData,
		studyProgramContainer,
		courseContainer,
		courseBookmarkAsset,
		studyCourseContainer,
		getCourseDetailsList,
		getBookmarkAssetsList,
		deleteBookmarkCall,
		getStudyProgramContainerList,
		getCourseBookmarkAssetDetails,
		getCourseBookmarkContainerDetails,
		getStudyCourseContainerDetails,
	} = useBookmarkModel();

	const navigation = useNavigation<RootHomeStackList>();

	const { showToast } = useToast();
	const isProgramType = learningPathType === LearningPathType.PROGRAM;

	const [isLoading, setIsLoading] = useState(true);
	const [isConfirmationModalVisible, setConfirmationModalVisible] =
		useState(false);

	const navigateToAssetScreen = async (item: IModuleType | IAssetItem) => {
		const level1 = item.level1;
		const level2 = item.level2;
		const level3 = item.level3;
		const level4 = item.level4;

		const code = item.asset?.code || "";
		const name = item.asset?.name || "";
		const assetType = item.asset?.assetType?.type;

		// Dispatch action to select the asset
		await dispatch(
			studyPlanSlice.actions.selectAsset({
				id: "", // id not use in bookmark case
				activity: { level1, level2, level3, level4 },
				code,
				name,
			}),
		);

		// Navigate to the Asset screen
		navigation.navigate("Container6Screen", {
			assetCode: code,
			learningPathType: isProgramType
				? LearningPathType.PROGRAM
				: LearningPathType.COURSE,
			learningPathId: learningPathId,
			learningPathName: learningPathName,
			courseId: level1 || null,
			moduleId: level2 || null,
			sessionId: level3 || null,
			segmentId: level4 || null,
			ispostSubmission: false,
			workshopId,
			workshopCode,
			userProgramId,
			learningPathCode,
			elective: "",
			electiveGroup: "",
			track: "",
			trackGroup: "",
			assetType: (assetType as IAssetType) || null,
		});
	};

	useEffect(() => {
		const courses = isProgramType
			? (courseDetailsData?.bookmarksForUserProgram ?? [])
			: (courseContainer?.bookmarksForUserCourse ?? []);

		if (courses?.length > 0) {
			const _data_arr = courses[courseRender?.activeIndex];
			setCourseRender({
				courseData: [_data_arr],
				activeIndex: courseRender?.activeIndex,
			});
			getAssetDetails(_data_arr?.code);
		}
		setIsLoading(false);
	}, [courseDetailsData, courseContainer]);

	const handleNumberSelect = (value: number) => {
		setIsLoading(true);
		const courses = courseDetailsData?.bookmarksForUserProgram ?? [];
		const _data_arr = courses[value];
		if (_data_arr?.code === null) {
			_data_arr.code = "";
		}
		setCourseRender({ courseData: [_data_arr], activeIndex: value });
		getAssetDetails(_data_arr?.code);
	};

	useFocusEffect(
		useCallback(() => {
			(async () => {
				setIsLoading(true);
				if (isProgramType) {
					await getCourseSelector();
					await getStudyProgramSelector();
				} else {
					await getCourseContainer();
					await getStudyCourseSelector();
				}
			})();
		}, []),
	);

	useEffect(() => {
		if (bookMarkAssetsListData?.bookmarksForUserProgram.length == 0) {
			getCourseSelector();
		}
	}, [bookMarkAssetsListData]);

	// Course Selector Api
	async function getCourseSelector() {
		const variables = { where: { userProgram: learningPathId } };
		await getCourseDetailsList({ variables });
	}

	async function getCourseContainer() {
		const variables = { where: { userCourse: learningPathId } };
		await getCourseBookmarkContainerDetails({ variables });
	}

	async function getStudyProgramSelector() {
		const variables = { where: { id: learningPathId } };
		await getStudyProgramContainerList({ variables });
	}

	async function getStudyCourseSelector() {
		const variables = { where: { id: learningPathId } };
		await getStudyCourseContainerDetails({ variables });
	}

	// Module Card Api
	const [assetModuleList, setAssetModuleList] = useState<IModuleType[]>([]);

	async function getAssetDetails(code: string) {
		const variables = {
			where: {
				...(isProgramType
					? { userProgram: learningPathId }
					: { userCourse: learningPathId }),
				level1: code,
			},
		};

		// Fetch data from the API
		const { data } = isProgramType
			? await getBookmarkAssetsList({ variables })
			: await getCourseBookmarkAssetDetails({ variables });

		const bookmarks = isProgramType
			? data?.bookmarksForUserProgram
			: data?.bookmarksForUserCourse;

		const list: IModuleType[] = Array.isArray(bookmarks)
			? bookmarks.map((module) => ({ ...module, assetItem: [] }))
			: [];

		setIsLoading(false);
		setAssetModuleList(list);
	}

	const handleItemPress = async (code: string, item: any, index: number) => {
		try {
			// Construct variables dynamically
			const variables = {
				where: {
					userProgram: learningPathId,
					level1: item.level1 || code,
					...(item.level2 && { level2: item.level2 }),
					...(item.level2 && { level3: item.code }),
				},
			};

			// Fetch data from the API
			const { data } = isProgramType
				? await getBookmarkAssetsList({ variables })
				: await getCourseBookmarkAssetDetails({ variables });

			if (data?.bookmarksForUserProgram || data?.bookmarksForUserCourse) {
				const filterAssetList =
					(isProgramType
						? data?.bookmarksForUserProgram
						: data?.bookmarksForUserCourse
					)?.filter((assetItem) => assetItem.asset != null) || [];

				const filteredModules =
					(isProgramType
						? data?.bookmarksForUserProgram
						: data?.bookmarksForUserCourse
					)?.filter((moduleItem) => moduleItem.asset == null) || [];

				setAssetModuleList((prevAssetModulesList) => {
					const updatedModulesList = [...prevAssetModulesList];

					const newFilteredModules = filteredModules.filter(
						(moduleItem) =>
							!updatedModulesList.some(
								(existingModule) =>
									existingModule.code === moduleItem.code,
							),
					);

					newFilteredModules.forEach((moduleItem, idx) => {
						updatedModulesList.splice(index + 1 + idx, 0, {
							...moduleItem,
							assetItem: [],
						});
					});

					if (updatedModulesList[index]) {
						updatedModulesList[index].assetItem = filterAssetList;
					}

					return updatedModulesList;
				});
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const resetCourse = () => {
		getCourseSelector();
		setCourseRender({ courseData: [], activeIndex: 0 });
	};

	const [removeBookmarkId, setRemoveBookmarkId] = useState({
		assetCode: "",
		index: 0,
	});

	const deleteBookmark = () => {
		const { assetCode, index } = removeBookmarkId;
		deleteBookmarkCall({
			variables: {
				where: {
					asset: assetCode,
					...(isProgramType
						? { userProgram: learningPathId }
						: { userCourse: learningPathId }),
				},
			},

			onCompleted: async () => {
				let filteredArray = [...assetModuleList];
				const item = filteredArray[index];
				if (item.assetItem && item.assetItem.length > 0) {
					item.assetItem = item?.assetItem?.filter(
						(asset) => asset?.asset?.code !== assetCode,
					);
					if (item.assetItem.length === 0) {
						if (isProgramType) {
							getCourseSelector();
						} else {
							getCourseContainer();
						}
						resetCourse();
					}
				} else {
					if (assetModuleList.length == 1) {
						if (isProgramType) {
							getCourseSelector();
						} else {
							getCourseContainer();
						}
						resetCourse();
					} else {
						filteredArray = filteredArray?.filter(
							(filterItem) =>
								filterItem?.asset?.code !== assetCode,
						);
					}
				}

				setConfirmationModalVisible(!isConfirmationModalVisible);
				setAssetModuleList(filteredArray);
				showToast({
					message: strings.BOOKMARK_DELETED,
					type: ToastType.SUCCESS,
				});
			},
		});
	};

	const handleConfirmationModal = (assetCode: string, index: number) => {
		setConfirmationModalVisible(!isConfirmationModalVisible);
		setRemoveBookmarkId({ assetCode, index });
	};

	return {
		courseRender,
		courseDetailsData,
		modulesDetailsData,
		isLoading,
		bookMarkAssetsListData,
		assetModuleList,
		isConfirmationModalVisible,
		studyProgramContainer,
		courseContainer,
		courseBookmarkAsset,
		isProgramType,
		studyCourseContainer,
		handleNumberSelect,
		navigateToAssetScreen,
		handleItemPress,
		deleteBookmark,
		handleConfirmationModal,
	};
};

export default useBookmarkController;
