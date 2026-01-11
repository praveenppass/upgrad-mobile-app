import { useRef } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { IUserProgramContainer } from "@interface/milestonetype.interface";
import { UserCourseContainer } from "@interface/outcomedriven.interface";
import { RootState } from "@redux/store/root.reducer";

type IsScrollToIndexFailed = {
	index: number;
	highestMeasuredFrameIndex: number;
	averageItemLength: number;
};

const useScrollToIndex = () => {
	const flatListRef = useRef<FlatList>(null);

	const isResume = useSelector(
		(state: RootState) => state.studyPlan?.isResume,
	);

	//* scrollToCurrentCourseIndex function to auto Scroll
	const scrollToCurrentCourseIndex = (
		data: UserCourseContainer[] | IUserProgramContainer[] | undefined,
	) => {
		if (!isResume) {
			return;
		}
		//* Check which index is Current
		   const trueIndex = data?.findIndex((item) => item?.isCurrent);
		   if (typeof trueIndex === "number" && trueIndex >= 0) {
			   scrollToIndex(trueIndex, data);
		   }
	};

	   const scrollToIndex = (
		   index: number,
		   data?: UserCourseContainer[] | IUserProgramContainer[],
	   ) => {
		   // waiting for UI to get render before calling scrollToIndex function
		   if (
			   typeof index !== "number" ||
			   index < 0 ||
			   !data ||
			   index >= data.length
		   ) {
			   return;
		   }
		   setTimeout(() => {
			   if (flatListRef.current && isResume) {
				   flatListRef.current.scrollToIndex({ index, animated: true });
			   }
		   }, 600);
	   };

	const scrollToIndexFailed = (error: IsScrollToIndexFailed) => {
		const offset = error.averageItemLength * error.index;
		flatListRef?.current?.scrollToOffset({ offset });
		setTimeout(
			() => flatListRef?.current?.scrollToIndex({ index: error.index }),
			100,
		);
	};

	return {
		flatListRef,
		scrollToCurrentCourseIndex,
		scrollToIndexFailed,
	};
};

export default useScrollToIndex;
