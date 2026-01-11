import React, { memo, useEffect, useState } from "react";
import { C } from "@assets/constants";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@redux/store/root.reducer";
import { client } from "@config/apollo";
import { useLazyQuery } from "@apollo/client";
import {
	Asset,
	IUserProgramContainer,
} from "@interface/milestonetype.interface";
import {
	IOutComeDrivenData,
	UserCourseContainer,
} from "@interface/outcomedriven.interface";
import { getUserCourseContainersQuery } from "@graphql/query/getUserCourseContainersQuery";
import ModuleContent from "@components/Courses/ModuleContent";
import AccordionIcon from "@components/IconComponents/AccordionIcon";
import Accordion from "@components/Courses/Accordion";
import { Divider } from "react-native-paper";
import TopicItemsState from "@components/Courses/TopicItemsState";
import { courseDetailsStyles as styles } from "@screens/Tabs/Courses/CourseDetails/CourseDetailsStyles";
import measures from "@utils/measures";
import { moderateScale, removeHtmlTags } from "@utils/functions";
import SpinningLoader from "@components/Reusable/Loaders/SpinningLoader";
import { dueDatePassed, yetToStart } from "@utils/courseDetailsUtils";
import { appSlice } from "@redux/slices/app.slice";
import useAssetHandler from "@utils/asset.utils";

const {
	themes: { primary, text },
	commonStyles: {
		spacing: { mb2, mt12, m16 },
	},
} = C;

const { SCREEN_WIDTH } = measures;
interface IOutComeDrivenTopic {
	code: string;
	currentModule?: unknown; //TODO
	item?: IUserProgramContainer;
	index: number;
	isParentOptional?: boolean;
	isParentLock?: boolean;
	onPressAssets: (
		asset?: Asset,
		index?: number,
		label?: string,
		moduleCode?: string,
		item?: IUserProgramContainer,
	) => void;
	onSelectModule: (
		code: string,
		name: string,
		index: number,
		label: string,
		isOpen: boolean,
		isNested?: boolean,
	) => void;
}

interface IModuleAndTopicDropDown {
	item?: IUserProgramContainer;
	index: number;
	isParentOptional?: boolean;
	isParentLock?: boolean;
	currentModule?: unknown; //TODO
	onPressAssets: (
		asset?: Asset,
		index?: number,
		label?: string,
		moduleCode?: string,
		item?: IUserProgramContainer,
	) => void;
	onSelectModule: (
		code: string,
		name: string,
		index: number,
		label: string,
		isOpen: boolean,
		isNested?: boolean,
	) => void;
}

const ModuleAndTopicDropDown = ({
	item,
	index,
	onPressAssets,
	onSelectModule,
	isParentOptional,
	isParentLock,
	currentModule,
}: IModuleAndTopicDropDown) => {
	const { isSelectedAsset } = useAssetHandler();
	const onTopicItem = () => {
		onPressAssets(item?.asset, index, item?.name, item?.code, item);
	};
	const selectedWeek = useSelector(
		(state: RootState) => state.studyPlan?.selectedWeek,
	);
	return (
		<>
			{item?.asset ? (
				<TopicItemsState
					isScreenAsset={true}
					isSelected={isSelectedAsset(item?.asset)}
					onTopicItemPress={onTopicItem}
					containerStyles={[mb2, mt12]}
					title={removeHtmlTags(item?.asset?.name ?? "")}
					disabled={item?.asset?.activity?.enableLock}
					state={item?.asset?.activity?.status}
					assetType={item?.asset?.assetType?.type}
					dueDate={item?.asset?.activity?.endsAt ?? ""}
					isDueDateCrossed={dueDatePassed(item?.asset)}
					startDate={item?.asset?.activity?.startsAt ?? ""}
					yetToStart={yetToStart(item?.asset)}
					extensionRequests={item?.asset?.activity?.extensionRequests}
					assetCode={item?.asset?.code ?? ""}
					deadlineReferredFrom={
						item.asset.activity?.deadlineReferredFrom
					}
					isOptional={
						(!isParentOptional && item?.isOptional) ?? false
					}
					level4={item?.code}
					level3={item?.code}
					level2={selectedWeek?.code}
					availableTill={item?.asset?.activity?.availableTill ?? ""}
				/>
			) : (
				<Topics
					item={item}
					index={index}
					code={item?.code ?? ""}
					onPressAssets={onPressAssets}
					onSelectModule={onSelectModule}
					currentModule={currentModule}
					isParentOptional={item?.isOptional}
					isParentLock={item?.activity?.enableLock}
					availableFrom={item?.activity?.availableFrom}
				/>
			)}
		</>
	);
};

const Topics = ({
	code,
	item,
	index,
	onPressAssets,
	onSelectModule,
	currentModule,
	isParentOptional,
	isParentLock,
	availableFrom,
}: IOutComeDrivenTopic) => {
	const dispatch = useDispatch();
	const isResume = useSelector(
		(state: RootState) => state.studyPlan?.isResume,
	);
	const selectedCourseID = useSelector(
		(state: RootState) => state.studyPlan?.selectedCourseID,
	);
	const isNetworkBack = useSelector(
		(state: RootState) => state.app.isNetworkBack,
	);
	const selectedMilestone = useSelector(
		(state: RootState) => state.studyPlan?.selectedMilestone,
	);
	const selectedWeek = useSelector(
		(state: RootState) => state.studyPlan?.selectedWeek,
	);
	const { isSelectedAsset } = useAssetHandler();

	const onChange = (isOpen: boolean) => {
		if (isOpen) {
			getOutComeDrivenTopics();
			onSelectModule(code, item?.name ?? "", index, item?.name, isOpen);
			return;
		}
		onSelectModule(null, item?.name ?? "", index, item?.name, isOpen);
	};

	useEffect(() => {
		if (item?.isCurrent) {
			getOutComeDrivenTopics();
		}
	}, [isResume ? item?.isCurrent ?? false : false]);

	useEffect(() => {
		if (item?.isCurrent) {
			onSelectModule(code, item?.name ?? "", index, item?.name, true);
		}
	}, [isResume ? item?.isCurrent ?? false : false]);

	async function getOutComeDrivenTopics() {
		const variables = {
			where: {
				id: selectedCourseID ?? "",
				level1: code,
			},
		};
		await getOutComeDrivenTopicsQuery({
			variables,
		});
	}

	const [
		getOutComeDrivenTopicsQuery,
		{ data: outComeDrivenTopic, loading: loadingOutComeData, refetch },
	] = useLazyQuery<IOutComeDrivenData>(getUserCourseContainersQuery, {
		client,
		fetchPolicy: "network-only",
	});

	useEffect(() => {
		if (isNetworkBack) {
			refetch();
			dispatch(appSlice.actions.changeNetworkStatus());
		}
	}, [isNetworkBack]);

	const isOpen = currentModule?.code === code ? true : false;

	let optionalStatus = item?.isOptional;

	if (
		(selectedWeek?.isOptional && selectedMilestone?.isOptional) ||
		(selectedWeek?.isOptional && !selectedMilestone?.isOptional)
	) {
		optionalStatus = isParentOptional && optionalStatus;
	} else {
		optionalStatus = !isParentOptional && optionalStatus;
	}
	if (selectedWeek?.isOptional || selectedMilestone?.isOptional) {
		optionalStatus = false;
	}
	return (
		<View style={styles.module}>
			<Accordion
				isSelected={isOpen}
				isOpen={
					currentModule?.code === code
						? true
						: !currentModule?.code
							? false
							: false
				}
				onChange={onChange}
				parentContainerStyles={styles.moduleShadow}
				customHeaderComponent={
					<>
						<ModuleContent
							moduleName={item?.name}
							moduleNameStyle={{ width: SCREEN_WIDTH / 1.4 }}
							dueDatePenalty={item?.activity?.dueAt ?? ""}
							deadlineReferredFrom={
								item?.activity?.deadlineReferredFrom ?? ""
							}
							extensionRequests={
								item?.activity?.extensionRequests
							}
							modal={false}
							isOptional={optionalStatus ?? false}
							isLocked={isParentLock}
							availableFrom={item?.activity?.availableFrom}
							leftComponent={
								<AccordionIcon
									isOpen={isOpen}
									iconColor={primary.color3}
								/>
							}
							level2={selectedWeek?.code}
							level3={code}
							level4={item?.code}
							moduleCode={currentModule?.code}
						/>
						{/* {isOpen && <Divider />} */}
					</>
				}
			>
				<>
					{!loadingOutComeData || outComeDrivenTopic ? (
						outComeDrivenTopic?.userCourseContainers?.map(
							(topicItem, index) => {
								const onTopicItem = () => {
									onPressAssets(
										topicItem?.asset,
										index,
										topicItem?.asset?.name,
										code,
									);
								};

								return (
									<View
										key={
											topicItem?.code ?? index?.toString()
										}
									>
										{topicItem?.asset ? (
											<TopicItemsState
												isSelected={isSelectedAsset(
													topicItem?.asset,
												)}
												key={
													topicItem?.code ??
													index?.toString()
												}
												onTopicItemPress={onTopicItem}
												containerStyles={[mb2, mt12]}
												title={
													topicItem?.asset?.name
														? removeHtmlTags(
															topicItem?.asset
																?.name,
														)
														: ""
												}
												assetType={
													topicItem?.asset?.assetType
														?.type
												}
												disabled={
													topicItem?.asset?.activity
														?.enableLock
												}
												state={
													topicItem?.asset?.activity
														?.status
												}
												dueDate={
													topicItem?.asset?.activity
														?.endsAt ?? ""
												}
												isDueDateCrossed={dueDatePassed(
													topicItem?.asset,
												)}
												startDate={
													topicItem?.asset?.activity
														?.startsAt ?? ""
												}
												yetToStart={yetToStart(
													topicItem?.asset,
												)}
												extensionRequests={
													topicItem?.asset?.activity
														?.extensionRequests
												}
												assetCode={
													topicItem?.asset?.code
												}
												deadlineReferredFrom={
													topicItem?.asset?.activity
														?.deadlineReferredFrom ??
													""
												}
												isOptional={
													(!isParentOptional &&
														topicItem.isOptional) ??
													false
												}
												availableTill={
													topicItem?.asset?.activity
														?.availableTill ?? ""
												}
												level4={topicItem.code}
												level3={code}
												level2={selectedWeek?.code}
												moduleCode={currentModule?.code}
											/>
										) : topicItem?.children ? (
											<RenderNestedTopics
												onSelectModule={onSelectModule}
												item={topicItem}
												index={index}
												isParentOptional={
													topicItem?.isOptional
												}
												moduleCode={currentModule?.code}
												onPressAssets={onPressAssets}
												isParentLock={
													topicItem.activity
														?.enableLock
												}
												availableFrom={availableFrom}
											/>
										) : null}
									</View>
								);
							},
						)
					) : (
						// <SpinningLoader loaderStyle={m16} />
						<></>
					)}
					<View style={[mb2, mt12]} />
				</>
			</Accordion>
		</View>
	);
};

interface IRenderNestedTopics {
	item?: UserCourseContainer;
	index: number;
	isParentOptional?: boolean;
	isParentLock?: boolean | null;
	onSelectModule: (
		code: string,
		name: string,
		index: number,
		label: string,
		isOpen: boolean,
		isNested?: boolean,
	) => void;
	onPressAssets: (
		asset?: Asset,
		index?: number,
		label?: string,
		item?: IUserProgramContainer,
	) => void;
	moduleNumber?: string;
	level3?: string | number | null;
	moduleOptional?: boolean;
	moduleCode?: string | number | null;
	pullDownToRefresh?: any
}

const RenderNestedTopics = ({
	item,
	index,
	onSelectModule,
	onPressAssets,
	moduleNumber,
	isParentOptional,
	isParentLock,
	level3,
	moduleOptional,
	moduleCode,
	pullDownToRefresh
}: IRenderNestedTopics) => {
	const isResume = useSelector(
		(state: RootState) => state.studyPlan?.isResume,
	);
	const [open, setOpen] = useState<boolean>(
		isResume ? item?.isCurrent ?? false : false,
	);
	const selectedMilestone = useSelector(
		(state: RootState) => state.studyPlan?.selectedMilestone,
	);
	const selectedWeek = useSelector(
		(state: RootState) => state.studyPlan?.selectedWeek,
	);
	const { isSelectedAsset } = useAssetHandler();

	useEffect(() => {
		if (item?.isCurrent) {
			onSelectModule(
				null,
				item?.name ?? "",
				index,
				item?.name,
				true,
				true,
			);
		}
	}, [item?.isCurrent]);

	const onChange = (isOpen: boolean) => {
		setOpen(isOpen);
		// onSelectModule(null, item?.name ?? "", index, item?.name, isOpen, true);
	};
	return (
		<Accordion
			isOpen={open}
			key={item?.code}
			onChange={onChange}
			customHeaderComponent={
				<View>
					<ModuleContent
						moduleNameStyle={{
							color: open ? text.steelBlue : primary.color3,
						}}
						moduleName={item?.name ?? ""}
						moduleNumber={`Topic ${moduleNumber || index + 1}`}
						dueDatePenalty={item?.activity?.dueAt ?? ""}
						deadlineReferredFrom={
							item?.activity?.deadlineReferredFrom ?? ""
						}
						extensionRequests={item?.activity?.extensionRequests}
						isOptional={isParentOptional}
						isLocked={
							(isParentLock && item?.activity?.enableLock) ??
							false
						}
						level4={item?.code}
						level3={level3}
						level2={selectedWeek?.code}
						moduleCode={moduleCode}
						modal={false}
						availableFrom={item?.activity?.availableFrom ?? ""}
						leftComponent={
							<AccordionIcon
								isOpen={open}
								svgSize={{
									width: moderateScale(16),
									height: moderateScale(16),
								}}
								iconColor={primary.color3}
							/>
						}
						pullDownToRefresh={pullDownToRefresh}
					/>
					{open && <Divider />}
				</View>
			}
		>
			<View>
				{item?.children?.map((childItem, index) => {
					const onTopicItem = () => {
						onPressAssets(
							childItem?.asset,
							index,
							moduleNumber,
							childItem?.asset?.activity?.level1,
							item,
						);
					};

					let topicOptionalTag;
					if (isParentOptional) {
						topicOptionalTag = false;
					} else {
						topicOptionalTag = childItem?.isOptional === true;
					}
					if (
						selectedWeek?.isOptional ||
						selectedMilestone?.isOptional
					) {
						topicOptionalTag = false;
					}
					if (moduleOptional) {
						topicOptionalTag = false;
					}

					return (
						<TopicItemsState
							isSelected={isSelectedAsset(childItem?.asset)}
							key={childItem?.code}
							onTopicItemPress={onTopicItem}
							containerStyles={[mb2, mt12]}
							title={
								childItem?.asset?.name
									? removeHtmlTags(childItem?.asset?.name)
									: ""
							}
							assetType={childItem?.asset?.assetType?.type}
							disabled={
								childItem.asset?.activity?.enableLock ?? false
							}
							state={childItem?.asset?.activity?.status}
							dueDate={childItem?.asset?.activity?.endsAt ?? ""}
							isDueDateCrossed={dueDatePassed(childItem?.asset)}
							startDate={
								childItem?.asset?.activity?.startsAt ?? ""
							}
							yetToStart={yetToStart(childItem?.asset)}
							extensionRequests={
								childItem?.asset?.activity?.extensionRequests
							}
							assetCode={childItem?.asset?.code}
							deadlineReferredFrom={
								childItem?.asset?.activity?.deadlineReferredFrom
							}
							isOptional={topicOptionalTag ?? false}
							availableTill={
								childItem?.asset?.activity?.availableTill ?? ""
							}
							level4={childItem.code}
							level3={level3}
							level2={selectedWeek?.code}
							moduleCode={moduleCode}
							pullDownToRefresh={pullDownToRefresh}
						/>
					);
				})}
				<Divider style={[mb2, mt12]} />
			</View>
		</Accordion>
	);
};

export { RenderNestedTopics };

export default memo(ModuleAndTopicDropDown);
