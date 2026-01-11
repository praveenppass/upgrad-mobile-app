import React from "react";
import { FlatList, Image, Pressable, ScrollView, View } from "react-native";

import BookmarkSkeleton, {
	BookmarkFlatListSkeleton,
} from "@components/Courses/CourseDetails/Bookmark/bookmarkSkelton";
import bookmarkStyles from "@components/Courses/CourseDetails/Bookmark/bookmarkStyle";
import useBookmarkController from "@components/Courses/CourseDetails/Bookmark/useBookmarkController";
import CollapsibleList from "@components/Courses/CourseDetails/common/CollapsibleList";
import CourseDesc from "@components/Courses/CourseDetails/common/CourseDesc";
import CourseSelector from "@components/Courses/CourseDetails/common/CourseSelector";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { enableRadius, horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import {
	BookmarkComputerIcon,
	BookMarkedIcon,
	EmptyNotesIcon,
} from "@assets/icons";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";

interface IBookmark {
	learningPathType: string;
	learningPathId: string;
	learningPathName: string;
	workshopId: string;
	workshopCode: string;
	userProgramId?: string;
	learningPathCode: string;
}
const BookMarkScreen = ({
	learningPathType,
	learningPathId,
	learningPathName,
	workshopId,
	workshopCode,
	userProgramId,
	learningPathCode,
}: IBookmark) => {
	const {
		courseRender,
		courseDetailsData,
		isLoading,
		assetModuleList,
		isConfirmationModalVisible,
		studyProgramContainer,
		isProgramType,
		courseContainer,
		studyCourseContainer,
		handleNumberSelect,
		navigateToAssetScreen,
		handleItemPress,
		deleteBookmark,
		handleConfirmationModal,
	} = useBookmarkController({
		learningPathType,
		learningPathId,
		learningPathName,
		workshopId,
		learningPathCode,
		workshopCode,
		userProgramId,
	});

	const courseData = Array.isArray(courseRender?.courseData)
		? (courseRender?.courseData?.[0] ?? null)
		: (courseRender?.courseData ?? null);

	const BOOKMARK_ICON_DIMENSIONS = {
		height: verticalScale(16),
		width: horizontalScale(18),
	};
	const BOOKMARK_COMPUTER_ICON_DIMENSIONS = {
		height: verticalScale(18),
		width: horizontalScale(24),
	};
	const EMPTY_NOTES_ICON_DIMENSIONS = {
		width: horizontalScale(151),
		height: horizontalScale(148),
	};

	if (isLoading) {
		return <BookmarkSkeleton />;
	}

	const filterCourseIndex = (
		isProgramType
			? (studyProgramContainer?.userProgramContainers ?? [])
			: (studyCourseContainer?.userCourseContainers ?? [])
	).reduce<number[]>((indices, subItem, index) => {
		const isMatch = (
			isProgramType
				? (courseDetailsData?.bookmarksForUserProgram ?? [])
				: (courseContainer?.bookmarksForUserCourse ?? [])
		).some(
			(item) =>
				subItem.label === item.label && subItem.name === item.name,
		);

		if (isMatch) indices.push(index);

		return indices;
	}, []);

	return (
		<View style={bookmarkStyles.flex1}>
			<View style={bookmarkStyles.txtView}>
				<RNText
					style={bookmarkStyles.bookmarkTxt}
					title={strings.BOOKMARKS}
				/>
			</View>

			{courseDetailsData?.bookmarksForUserProgram.length === 0 ||
			courseContainer?.bookmarksForUserCourse.length === 0 ? (
				<View style={bookmarkStyles.emptyView}>
					<View style={bookmarkStyles.emptyContentWrapper}>
						<EmptyNotesIcon {...EMPTY_NOTES_ICON_DIMENSIONS} />
						<RNText
							title={strings.NO_BOOKMARK_TITLE}
							style={bookmarkStyles.titleText}
						/>
						<RNText
							title={strings.NO_BOOKMARK_DISC}
							style={bookmarkStyles.subtitleText}
						/>
					</View>
				</View>
			) : (
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={bookmarkStyles.main}>
						<RNText
							title={strings.SELECT_COURSE}
							style={bookmarkStyles.titleStyle}
						/>
						<CourseSelector
							courseRender={courseRender}
							data={
								isProgramType
									? courseDetailsData?.bookmarksForUserProgram
									: courseContainer?.bookmarksForUserCourse
							}
							onSelect={handleNumberSelect}
							indices={filterCourseIndex as number[]}
						/>
					</View>
					<CourseDesc
						description={courseData?.description?.trim() || ""}
						title={courseData?.name ?? ""}
						course={courseData?.label ?? ""}
					/>

					<View style={bookmarkStyles.flatView}>
						<FlatList
							data={assetModuleList}
							renderItem={({ item, index }) => {
								const isAsset = item?.asset;
								const isFirstItem = index === 0;
								const isLastItem =
									index === assetModuleList.length - 1;

								const assetName =
									item?.aliasName || item?.asset?.name;

								const getBorderRadius = () =>
									enableRadius(
										isFirstItem ||
											!assetModuleList?.[index - 1]
												?.asset,
										isLastItem ||
											!assetModuleList?.[index + 1]
												?.asset,
									);

								const getBorderRadiusNonAssetItem = () =>
									enableRadius(
										isFirstItem ||
											!!assetModuleList?.[index - 1]
												?.asset,
										isLastItem ||
											!!assetModuleList?.[index + 1]
												?.asset,
									);

								// Render asset item
								const renderAssetItem = () => (
									<>
										<View
											style={
												assetModuleList?.[index - 1]
													?.asset
													? bookmarkStyles.mt0
													: bookmarkStyles.mt5
											}
										/>
										<Pressable
											style={[
												bookmarkStyles.backgroundView,
												getBorderRadius(),
											]}
											onPress={() =>
												navigateToAssetScreen(item)
											}
										>
											<View
												style={
													bookmarkStyles.noteItemContainer
												}
											>
												<BookmarkComputerIcon
													{...BOOKMARK_COMPUTER_ICON_DIMENSIONS}
												/>
												<RNText
													title={assetName}
													style={
														bookmarkStyles.noteText
													}
												/>
												<Pressable
													onPress={() =>
														handleConfirmationModal(
															item?.asset?.code ??
																"",
															index,
														)
													}
												>
													<BookMarkedIcon
														{...BOOKMARK_ICON_DIMENSIONS}
													/>
												</Pressable>
											</View>
										</Pressable>
									</>
								);

								// Render non-asset item
								const renderNonAssetItem = () => (
									<>
										<View
											style={
												assetModuleList?.[index - 1]
													?.asset
													? bookmarkStyles.mt5
													: bookmarkStyles.mt0
											}
										/>
										<View
											style={[
												bookmarkStyles.shadow,
												getBorderRadiusNonAssetItem(),
											]}
										>
											<CollapsibleList
												item={item}
												index={index}
												handleItemPress={() =>
													handleItemPress(
														courseData?.code,
														item,
														index,
													)
												}
												notesAssetData={
													item.assetItem ?? []
												}
												handleNavigation={
													navigateToAssetScreen
												}
												removeBookmark={(
													assetCode: string,
												) =>
													handleConfirmationModal(
														assetCode,
														index,
													)
												}
											/>
										</View>
										<View
											style={bookmarkStyles.dividerLine}
										/>
									</>
								);

								return isAsset
									? renderAssetItem()
									: renderNonAssetItem();
							}}
							keyExtractor={(item, index) =>
								`${item.code}${index}`
							}
							showsVerticalScrollIndicator={false}
							ListFooterComponent={() => (
								<View style={bookmarkStyles.mb100} />
							)}
							ListEmptyComponent={BookmarkFlatListSkeleton}
						/>
					</View>
				</ScrollView>
			)}

			<ConfirmationModal
				visible={isConfirmationModalVisible}
				onClose={() => handleConfirmationModal("", 0)}
				bgColor={colors.state.warning_light_yellow}
			>
				<Image
					source={{ uri: IMAGE_URLS.WARNING }}
					style={bookmarkStyles.image}
					resizeMode="contain"
				/>
				<RNText
					title={strings.BOOKMARK_DELETE_WARNING}
					style={bookmarkStyles.warningText}
				/>
				<RNText
					title={strings.RESTORE_WORNING}
					style={bookmarkStyles.warningTxt}
				/>
				<View style={bookmarkStyles.btnContainer}>
					<Pressable
						onPress={() => handleConfirmationModal("", 0)}
						style={bookmarkStyles.button}
					>
						<RNText
							title={strings.NO}
							style={bookmarkStyles.textNo}
						/>
					</Pressable>

					<Pressable
						onPress={deleteBookmark}
						style={[
							bookmarkStyles.button,
							bookmarkStyles.buttonYes,
						]}
					>
						<RNText
							title={strings.YES}
							style={bookmarkStyles.textYes}
						/>
					</Pressable>
				</View>
			</ConfirmationModal>
		</View>
	);
};

export default BookMarkScreen;
