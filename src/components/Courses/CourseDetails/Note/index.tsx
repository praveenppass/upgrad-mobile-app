import React from "react";
import { FlatList, Image, Pressable, ScrollView, View } from "react-native";

import CollapsibleList from "@components/Courses/CourseDetails/common/CollapsibleList";
import CourseDesc from "@components/Courses/CourseDetails/common/CourseDesc";
import CourseSelector from "@components/Courses/CourseDetails/common/CourseSelector";
import AddNotesModal from "@components/Courses/CourseDetails/Note/common/AddNotesModal";
import DeleteModal from "@components/Courses/CourseDetails/Note/common/DeleteModal";
import { IAssetItem } from "@components/Courses/CourseDetails/Note/common/ModuleAndAssetInterface";
import NoteListItemView from "@components/Courses/CourseDetails/Note/common/NoteListItemView";
import NotesAssetModal from "@components/Courses/CourseDetails/Note/common/NotesListModal";
import NoteSkeleton, {
	NoteFlatListSkeleton,
} from "@components/Courses/CourseDetails/Note/notesSkelton";
import notesStyles from "@components/Courses/CourseDetails/Note/noteStyles";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import {
	IGeneralNote,
	IGeneralNotesItems,
} from "@graphql/query/generalNotes/getAllGeneralNotesQuery";

import { enableRadius, horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import {
	BookmarkComputerIcon,
	DownloadCircleIcon,
	EmptyNotesIcon,
} from "@assets/icons";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";

import useNotesController, { ActiveTab } from "./useNotesController";

interface INotesScreenProps {
	learningPathType: string;
	learningPathId: string;
	learningPathName: string;
	learningPathCode: string;
	workshopId: string;
	workshopCode: string;
	userProgramId?: string;
}
const NotesScreen = ({
	learningPathType,
	learningPathId,
	learningPathName,
	workshopId,
	learningPathCode,
	workshopCode,
	userProgramId,
}: INotesScreenProps) => {
	const {
		courseRender,
		programContainerDetails,
		courseContainerDetails,
		addNote,
		activeNotesTab,
		listOfGeneralNotes,
		editNoteItem,
		isLoading,
		isConfirmationModalVisible,
		emptyGeneralNotesItems,
		assetModuleList,
		totalNotesCount,
		studyProgramContainer,
		studyCourseContainer,
		showNoteModal,
		isProgramType,
		handleNumberSelect,
		handleNotesPopup,
		handleTabs,
		downloadGeneralNote,
		navigateToAssetScreen,
		handleConfirmationModal,
		deleteGeneralNote,
		handleAddNoteApiCall,
		handleNoteApiCall,
		deleteNote,
		handleItemPress,
		handleNoteModal,
		saveNoteList,
		setSaveNoteList,
		modalType,
		INotesModalType,
		editInfo,
		openAddNote,
		handleModal,
		showDeleteModal,
		closeDeleteModal,
		downloadCourseNote,
	} = useNotesController({
		learningPathType,
		learningPathId,
		learningPathName,
		workshopId,
		learningPathCode,
		workshopCode,
		userProgramId,
	});

	const courseData = Array.isArray(courseRender?.courseData)
		? courseRender?.courseData[0]
		: (courseRender?.courseData ?? null);

	const COMPUTER_ICON_DIMENSIONS = {
		height: verticalScale(20),
		width: horizontalScale(20),
	};
	const DOWNLOAD_ICON_DIMENSIONS = {
		height: verticalScale(30),
		width: horizontalScale(30),
	};
	const EMPTY_NOTES_ICON_DIMENSIONS = {
		width: horizontalScale(151),
		height: horizontalScale(148),
	};
	// filter because in the programContainerDetails extra course are coming that add from general notes
	const filteredData =
		(isProgramType
			? programContainerDetails?.notesForUserProgram
			: courseContainerDetails?.notesForUserCourse
		)?.filter((item) => item.name !== null) || [];

	if (isLoading) {
		return <NoteSkeleton />;
	}
	const filteredGeneralNotes = listOfGeneralNotes?.filter(
		(item: IGeneralNotesItems) => item.note !== null,
	);

	const isTabActive = (tabKey: string, activeTab: string): boolean => {
		return tabKey === activeTab;
	};

	const filterCourseIndex = (
		(isProgramType
			? studyProgramContainer?.userProgramContainers
			: studyCourseContainer?.userCourseContainers) ?? []
	).reduce<number[]>((indices, subItem, index) => {
		const isMatch = filteredData.some(
			(item) =>
				subItem.label === item.label && subItem.name === item.name,
		);

		if (isMatch) indices.push(index);

		return indices;
	}, []);

	return (
		<View style={notesStyles.flex1}>
			<View style={notesStyles.container}>
				<View style={notesStyles.tabView}>
					<Pressable
						onPress={() => handleTabs(ActiveTab.Notes)}
						style={[
							isTabActive(ActiveTab.Notes, activeNotesTab)
								? notesStyles.tabActiveContainer
								: notesStyles.tabInActiveContainer,
							{ ...notesStyles.pr10 },
						]}
					>
						<RNText
							style={
								isTabActive(ActiveTab.Notes, activeNotesTab)
									? notesStyles.tabActveText
									: notesStyles.tabInActveText
							}
							title={strings.NOTES}
						/>
						<View style={notesStyles.roundTxt}>
							<RNText
								title={
									(totalNotesCount?.learnerCourseNotesCount
										?.totalCount || 0) -
									(filteredGeneralNotes?.length || 0)
								}
								style={notesStyles.childTxt}
							/>
						</View>
					</Pressable>
					{isProgramType ? (
						<Pressable
							onPress={() => handleTabs(ActiveTab.GenerateNotes)}
							style={[
								isTabActive(
									ActiveTab.GenerateNotes,
									activeNotesTab,
								)
									? notesStyles.tabActiveContainer
									: notesStyles.tabInActiveContainer,
								{ ...notesStyles.pr10 },
							]}
						>
							<RNText
								style={
									isTabActive(
										ActiveTab.GenerateNotes,
										activeNotesTab,
									)
										? notesStyles.tabActveText
										: notesStyles.tabInActveText
								}
								title={strings.GENERAL_NOTES}
							/>
							<View style={notesStyles.roundTxt}>
								<RNText
									title={filteredGeneralNotes?.length ?? 0}
									style={notesStyles.childTxt}
								/>
							</View>
						</Pressable>
					) : null}
				</View>

				<Pressable
					style={notesStyles.downloadIcon}
					onPress={() => {
						isProgramType
							? downloadGeneralNote()
							: downloadCourseNote();
					}}
				>
					<DownloadCircleIcon {...DOWNLOAD_ICON_DIMENSIONS} />
				</Pressable>
			</View>
			<ScrollView
				style={notesStyles.flex}
				showsVerticalScrollIndicator={false}
			>
				{activeNotesTab == ActiveTab.GenerateNotes ? (
					<>
						{filteredGeneralNotes &&
						filteredGeneralNotes.length == 0 ? (
							<>
								<RNText
									title={strings.GENERAL_NOTE_HINT}
									style={notesStyles.generalNoteText}
								/>
								<Pressable
									style={notesStyles.addNoteButton}
									onPress={() =>
										handleNotesPopup(
											ActiveTab.GenerateNotes,
											emptyGeneralNotesItems,
										)
									}
								>
									<RNText
										title={strings.ADD_NOTE}
										style={notesStyles.addNoteButtonText}
									/>
								</Pressable>
							</>
						) : (
							<>
								<Pressable
									onPress={() =>
										handleNotesPopup(
											ActiveTab.GenerateNotes,
											emptyGeneralNotesItems,
										)
									}
								>
									<RNText
										title={`${strings.ADD_NOTE} +`}
										style={notesStyles.addNoteTxt}
									/>
								</Pressable>
								<FlatList
									data={filteredGeneralNotes}
									renderItem={({ item }) => {
										return (
											<NoteListItemView
												item={
													item?.note as IGeneralNote
												}
												handlEditNote={() =>
													handleNotesPopup(
														ActiveTab.GenerateNotes,
														item,
													)
												}
											/>
										);
									}}
									showsVerticalScrollIndicator={false}
									keyExtractor={(_, index) => String(index)}
									contentContainerStyle={
										notesStyles.gernalListView
									}
								/>
							</>
						)}
					</>
				) : (
					<>
						{filteredData?.length == 0 ? (
							<View style={notesStyles.emptyView}>
								<View style={notesStyles.emptyContentWrapper}>
									<EmptyNotesIcon
										{...EMPTY_NOTES_ICON_DIMENSIONS}
									/>
									<RNText
										title={strings.NO_NOTE_ADDED_TITLE}
										style={notesStyles.titleText}
									/>
									<RNText
										title={strings.NO_NOTE_DISC}
										style={notesStyles.subtitleText}
									/>
								</View>
							</View>
						) : (
							<View style={notesStyles.main}>
								<RNText
									title={strings.SELECT_COURSE}
									style={notesStyles.titleStyle}
								/>
								<CourseSelector
									courseRender={courseRender}
									data={filteredData}
									onSelect={handleNumberSelect}
									indices={filterCourseIndex as number[]}
								/>
								<CourseDesc
									description={
										courseData?.description?.trim() || ""
									}
									title={courseData?.name ?? ""}
									course={courseData?.label ?? ""}
								/>
								<View style={notesStyles.ph20}>
									<FlatList
										data={assetModuleList}
										renderItem={({ item, index }) => {
											const isFirstItem = index === 0;
											const isLastItem =
												index ===
												assetModuleList.length - 1;
											const assetName =
												item?.aliasName ||
												item?.asset?.name;

											const getBorderRadius = () =>
												enableRadius(
													isFirstItem ||
														!assetModuleList?.[
															index - 1
														]?.asset,
													isLastItem ||
														!assetModuleList?.[
															index + 1
														]?.asset,
												);

											const getBorderRadiusNonAssetItem =
												() =>
													enableRadius(
														isFirstItem ||
															!!assetModuleList?.[
																index - 1
															]?.asset,
														isLastItem ||
															!!assetModuleList?.[
																index + 1
															]?.asset,
													);

											// Render asset item
											const renderAssetItem = () => (
												<>
													<View
														style={
															assetModuleList?.[
																index - 1
															]?.asset
																? notesStyles.mt0
																: notesStyles.mt5
														}
													/>
													<Pressable
														style={[
															notesStyles.overflowHidden,
															getBorderRadius(),
														]}
														onPress={() => {
															handleNoteModal(
																true,
															);
															setSaveNoteList(
																item as IAssetItem,
															);
														}}
													>
														<View
															style={
																notesStyles.noteItemContainer
															}
														>
															<BookmarkComputerIcon
																{...COMPUTER_ICON_DIMENSIONS}
															/>
															<RNText
																title={
																	assetName
																}
																style={
																	notesStyles.noteText
																}
															>
																<RNText
																	title={`  \u2022 ${item?.notes?.length} ${strings.NOTES}`}
																	style={
																		notesStyles.countNoteTxt
																	}
																/>
															</RNText>
														</View>
													</Pressable>
												</>
											);

											// Render non-asset item

											const renderNonAssetItem = () => (
												<>
													<View
														style={
															assetModuleList?.[
																index - 1
															]?.asset
																? notesStyles.mt5
																: notesStyles.mt0
														}
													/>
													<View
														style={[
															notesStyles.shadow,
															getBorderRadiusNonAssetItem(),
														]}
													>
														<CollapsibleList
															item={item}
															index={index}
															isNoteList
															handleItemPress={() =>
																handleItemPress(
																	courseData.code,
																	item,
																	index,
																)
															}
															notesAssetData={
																item.assetItem ??
																[]
															}
															handleNavigation={(
																subItem,
															) => {
																handleNoteModal(
																	true,
																);
																setSaveNoteList(
																	subItem as IAssetItem,
																);
															}}
														/>
													</View>
													<View
														style={
															notesStyles.dividerLine
														}
													/>
												</>
											);

											return item.asset
												? renderAssetItem()
												: renderNonAssetItem();
										}}
										keyExtractor={(item, index) =>
											`${item.code ?? index}`
										}
										showsVerticalScrollIndicator={false}
										ListFooterComponent={() => (
											<View style={notesStyles.mb100} />
										)}
										ListEmptyComponent={
											NoteFlatListSkeleton
										}
									/>
								</View>
							</View>
						)}
					</>
				)}
			</ScrollView>

			<ActionModal
				isOpen={showNoteModal}
				closeModal={() => handleNoteModal(false)}
				onBackPress={() => handleNoteModal(false)}
				disableCloseOnSwipeDown
			>
				{modalType === INotesModalType.AddNotes ? (
					<AddNotesModal
						noteType={strings.NOTES}
						handleApiCall={handleNoteApiCall}
						editNoteItem={editInfo}
						handleConfirmationModal={handleModal}
					/>
				) : (
					<NotesAssetModal
						item={saveNoteList as IAssetItem}
						navigateToAssetScreen={navigateToAssetScreen}
						handleAddNote={openAddNote}
						handleNoteModal={handleNoteModal}
					/>
				)}
			</ActionModal>

			<ActionModal
				isOpen={!!addNote}
				closeModal={() => handleNotesPopup("", emptyGeneralNotesItems)}
			>
				<AddNotesModal
					noteType={addNote}
					handleApiCall={handleAddNoteApiCall}
					editNoteItem={editNoteItem.note}
					handleConfirmationModal={handleConfirmationModal}
				/>
			</ActionModal>

			<DeleteModal
				visible={showDeleteModal}
				onClose={closeDeleteModal}
				handleModal={handleModal}
				styles={notesStyles}
				deleteNote={deleteNote}
			/>

			<ConfirmationModal
				visible={isConfirmationModalVisible}
				onClose={() => handleConfirmationModal}
				bgColor={colors.state.warning_light_yellow}
			>
				<Image
					source={{ uri: IMAGE_URLS.WARNING }}
					style={notesStyles.image}
					resizeMode="contain"
				/>
				<RNText
					title={strings.NOTE_DELETE_WARNING}
					style={notesStyles.warningText}
				/>
				<RNText
					title={strings.RESTORE_WORNING}
					style={notesStyles.warningTxt}
				/>
				<View style={notesStyles.btnContainer}>
					<Pressable
						onPress={handleConfirmationModal}
						style={notesStyles.button}
					>
						<RNText title={strings.NO} style={notesStyles.textNo} />
					</Pressable>

					<Pressable
						onPress={deleteGeneralNote}
						style={[notesStyles.button, notesStyles.buttonYes]}
					>
						<RNText
							title={strings.YES}
							style={notesStyles.textYes}
						/>
					</Pressable>
				</View>
			</ConfirmationModal>
		</View>
	);
};

export default NotesScreen;
