import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import RNText from "@components/Reusable/RNText";

import { getMilestoneListQuery } from "@graphql/query/drawerQuery/getMilestoneListQuery";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { client } from "@config/apollo";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum } from "@interface/asset.interface";
import { IMilestoneType } from "@interface/milestonetype.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import {
	AddIconLxp,
	CheckMarkGreenCircleIcon,
	CircleIcon,
	MinimizeIconLxp,
	ModuleCardLockedIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";

import { ModuleItemL2 } from "./ModuleItemL2";
import { ModuleItemL3 } from "./ModuleItemL3";
import { SkeletonModuleItem } from "./SkeletonModuleItem";

const {
	themes: { primary },
	commonStyles: {
		text: { w400, sm, med, md },
		align: { row, flex1, alignCenter, alignContentCenter },
		spacing: { ml10 },
	},
} = C;

const {
	BORDER: { b8 },
} = measures;

const ModuleItem: React.FC<{
	moduleItem: any;
	selectedDrawer: any;
	resumeAsset: any;
	onLockedAssetPress?: (date: string) => void;
	learningPathType: LearningPathType;
	learningPathId: string;
	learningPathName: string;
	openCurrentModule: boolean;
	elective?: string;
	electiveGroup?: string;
	track?: string;
	trackGroup?: string;
}> = ({
	moduleItem,
	selectedDrawer,
	onLockedAssetPress,
	resumeAsset,
	learningPathId,
	learningPathType,
	learningPathName,
	openCurrentModule,
	elective,
	electiveGroup,
	track,
	trackGroup,
}) => {
	const [extend, setExtendView] = useState<unknown>(null);

	const assetName = moduleItem?.aliasName || moduleItem?.name;

	const renderItem = (data: any) => {
		if (data?.item.asset) {
			return (
				<ModuleItemL3
					assessmentItem={data?.item}
					resumeAsset={resumeAsset}
					onLockedAssetPress={onLockedAssetPress}
					learningPathType={learningPathType}
					learningPathId={learningPathId}
					learningPathName={learningPathName}
					elective={elective}
					electiveGroup={electiveGroup}
					track={track}
					trackGroup={trackGroup}
				/>
			);
		} else if (data?.item?.activity) {
			return (
				<ModuleItemL2
					module4Data={data?.item}
					resumeAsset={resumeAsset}
					onLockedAssetPress={onLockedAssetPress}
					learningPathType={learningPathType}
					learningPathId={learningPathId}
					learningPathName={learningPathName}
					openCurrentModule={openCurrentModule}
					elective={elective}
					electiveGroup={electiveGroup}
					track={track}
					trackGroup={trackGroup}
					isProgramType={true}
				/>
			);
		}
	};

	useEffect(() => {
		if (extend) {
			getLevel3Api();
		}
	}, [extend]);

	const getLevel3Api = async () => {
		const variables = {
			where: {
				id: selectedDrawer?.selectedId,
				level1: selectedDrawer?.level1,
				level2: selectedDrawer?.level2,
				level3: extend,
				elective: elective,
				electiveGroup: electiveGroup,
				track: track,
				trackGroup: trackGroup,
			},
		};
		await getWeekModuleQuery({
			variables,
		});
	};
	const [getWeekModuleQuery, { data: level3Data, loading }] =
		useLazyQuery<IMilestoneType>(getMilestoneListQuery, {
			client,
			fetchPolicy: "no-cache",
		});
	const ItemSeparator = () => <View style={styles.separator} />;
	const renderLevel3Data = level3Data?.userProgramContainers || [];

	useEffect(() => {
		if (openCurrentModule) {
			setExtendView(
				moduleItem?.code ===
					resumeAsset?.userProgramNextAsset?.activity?.level3
					? moduleItem?.code
					: null,
			);
		}
	}, [moduleItem?.code]);

	return (
		<ScrollView style={styles.courseContainer}>
			<View style={styles.textContainer}>
				<TouchableOpacity
					onPress={() => {
						setExtendView(
							moduleItem?.code !== extend
								? moduleItem?.code
								: null,
						);
					}}
				>
					<View style={styles.rowCenter}>
						{moduleItem?.activity?.isLocked ? (
							!extend ? (
								<ModuleCardLockedIcon
									width={moderateScale(20)}
									height={moderateScale(20)}
								/>
							) : (
								<View style={styles.extendIcon} />
							)
						) : moduleItem?.activity?.status ===
						  IAssetStatusEnum.completed ? (
							!extend ? (
								<CheckMarkGreenCircleIcon
									width={moderateScale(20)}
									height={moderateScale(20)}
								/>
							) : (
								<View style={styles.extendIcon} />
							)
						) : moduleItem?.activity?.status ===
						  IAssetStatusEnum.inProgress ? (
							!extend ? (
								<CircleIcon
									width={moderateScale(20)}
									height={moderateScale(20)}
								/>
							) : (
								<View style={styles.extendIcon} />
							)
						) : !extend ? (
							<CircleIcon
								width={moderateScale(20)}
								height={moderateScale(20)}
							/>
						) : (
							<View style={styles.extendIcon} />
						)}

						<RNText
							title={`${moduleItem?.label} ${
								moduleItem.isOptional
									? strings.OPTIONAL_BULLET_TAG
									: ""
							}`}
							style={styles.sessionText}
							numberOfLines={2}
						/>
						{!extend ? (
							<AddIconLxp style={styles.alignEnd} />
						) : (
							<MinimizeIconLxp style={styles.alignEnd} />
						)}
					</View>

					<RNText title={assetName} style={styles.title} />
					<View style={ml10}>
						{/* <DueDateBanner
							date={moduleItem?.activity?.dueAt}
							extensionRequests={
								moduleItem?.activity?.extensionRequests
							}
							isOptional={moduleItem?.isOptional}
							disabled={moduleItem?.activity?.enableLock}
							availableFrom={moduleItem?.activity?.startsAt}
						/> */}
					</View>
					{/* TODO */}
					{/* {!extend && (
						<RNText title={"5/10 Completed"} style={styles.desc} />
					)} */}
				</TouchableOpacity>
				{renderLevel3Data?.length > 0 && extend ? (
					<FlatList
						data={renderLevel3Data}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						keyExtractor={(_item, index) => index.toString()}
						ItemSeparatorComponent={ItemSeparator}
						style={{
							marginHorizontal: verticalScale(10),
						}}
					/>
				) : loading ? (
					<SkeletonModuleItem />
				) : null}
			</View>
		</ScrollView>
	);
};

export default ModuleItem;

const styles = StyleSheet.create({
	alignEnd: { ...flex1, marginLeft: "auto" },
	courseContainer: {
		backgroundColor: colors.neutral.white,
		borderRadius: b8,
		elevation: 3,
		marginBottom: verticalScale(5),
		marginHorizontal: verticalScale(5), // Uncomment if you want horizontal margins
		shadowColor: primary.color3,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.84,
	},
	desc: {
		marginTop: verticalScale(3),
		...w400,
		color: colors.content.text.body_grey_07,
		...sm,
		lineHeight: moderateScale(20),
	},
	extendIcon: {
		height: moderateScale(5),
		width: moderateScale(5),
	},
	rowCenter: {
		...alignContentCenter,
		...alignCenter,
		...row,
	},
	separator: {
		marginBottom: verticalScale(10),
	},

	sessionText: {
		...w400,
		color: colors.neutral.grey_06,
		...med,
		lineHeight: moderateScale(19),
		marginLeft: horizontalScale(8),
	},
	textContainer: {
		paddingHorizontal: horizontalScale(4),
		paddingVertical: verticalScale(16),
	},
	title: {
		marginTop: verticalScale(5),
		...w400,
		color: colors.cta.text.default_secondary,
		...md,
		lineHeight: moderateScale(22),
		marginLeft: horizontalScale(10),
	},
});
