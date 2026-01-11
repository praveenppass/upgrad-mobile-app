import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { ModuleItemL3 } from "@components/Courses/CourseDetails/common/ModuleItemL3";
import RNText from "@components/Reusable/RNText";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import {
	AddIconLxp,
	AssetCardLockedIcon,
	BulletIcon,
	CheckMarkGreenCircleIcon,
	CircleIcon,
	MinimizeIconLxp,
} from "@assets/icons";
import { strings } from "@assets/strings";

const {
	commonStyles: {
		text: { w400, md, sm, txtStart, clrGray, clrDisabled },
		align: {
			row,
			selfCenter,
			alignContentCenter,
			alignCenter,
			justifyCenter,
			flex1,
		},
		spacing: { ml8 },
	},
} = C;

const {
	BORDER: { b8 },
} = measures;

const ModuleItemL2: React.FC<{
	module4Data: any;
	resumeAsset: any;
	onLockedAssetPress?: (date: string) => void;
	learningPathType: LearningPathType;
	learningPathId: string;
	learningPathName: string;
	openCurrentModule?: boolean;
	elective?: string;
	electiveGroup?: string;
	track?: string;
	trackGroup?: string;
	isProgramType?: boolean;
}> = ({
	module4Data,
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
	isProgramType,
}) => {
	const ItemSeparator = () => <View style={styles.separator} />;
	const [extend, setExtendView] = useState<boolean>(false);

	useEffect(() => {
		if (openCurrentModule) {
			setExtendView(
				module4Data?.code ===
					resumeAsset?.userProgramNextAsset?.activity?.level4
					? module4Data?.code
					: null,
			);
		}
	}, [module4Data?.code]);

	const renderItem = (data: any) => {
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
	};
	return (
		<>
			<View
				style={
					isProgramType ? styles.courseContainer : styles.container
				}
			>
				<View
					style={[
						isProgramType
							? styles.textContainer
							: styles.courseTxtContainer,
						isProgramType && {
							backgroundColor: extend
								? colors.state.success_light_green
								: colors.neutral.grey_02,
						},
					]}
				>
					<TouchableOpacity
						onPress={() => {
							setExtendView(
								module4Data?.code !== extend
									? module4Data?.code
									: null,
							);
						}}
					>
						<View style={styles.rowCenter}>
							{module4Data.activity.enableLock ? (
								<AssetCardLockedIcon
									width={moderateScale(20)}
									height={moderateScale(20)}
								/>
							) : module4Data?.activity?.status ===
							  IAssetStatusEnum.completed ? (
								<CheckMarkGreenCircleIcon
									width={moderateScale(20)}
									height={moderateScale(20)}
								/>
							) : module4Data?.activity?.status ===
							  IAssetStatusEnum.inProgress ? (
								<CircleIcon
									width={moderateScale(20)}
									height={moderateScale(20)}
								/>
							) : (
								<CircleIcon
									width={moderateScale(20)}
									height={moderateScale(20)}
								/>
							)}
							<View
								style={{
									...row,
									...ml8,
									...selfCenter,
									...justifyCenter,
									...flex1,
								}}
							>
								<RNText
									title={module4Data?.label}
									numberOfLines={2}
									style={[
										styles.label,
										styles.moduleNumberText,
										module4Data.activity.enableLock &&
											styles.moduleNumberTextDisabled,
									]}
								>
									{module4Data.isOptional ? (
										<View
											style={{
												...row,
												...selfCenter,
												...justifyCenter,
											}}
										>
											<BulletIcon
												style={styles.labelStyle}
											/>
											<RNText
												title={strings.OPTIONAL_TXT}
												style={[
													styles.label,
													styles.moduleNumberText,
													module4Data.activity
														.enableLock &&
														styles.moduleNumberTextDisabled,
												]}
											/>
										</View>
									) : null}
								</RNText>
							</View>

							{!extend ? (
								<AddIconLxp style={styles.alignEnd} />
							) : (
								<MinimizeIconLxp style={styles.alignEnd} />
							)}
						</View>
						<RNText
							title={module4Data?.name}
							style={styles.title}
						/>
						{/* <View style={ml8}>
							<DueDateBanner
								date={module4Data?.activity?.dueAt}
								extensionRequests={
									module4Data?.activity?.extensionRequests
								}
								isOptional={module4Data?.isOptional}
								disabled={module4Data?.activity?.enableLock}
								availableFrom={module4Data?.activity?.startsAt}
								assetStatus={module4Data?.activity?.status}
							/>
						</View> */}
					</TouchableOpacity>
				</View>
				{!isProgramType ? (
					<>
						{module4Data?.code === extend &&
						module4Data?.children?.length > 0 ? (
							<FlatList
								data={module4Data?.children}
								renderItem={renderItem}
								showsVerticalScrollIndicator={false}
								keyExtractor={(_item, index) =>
									index.toString()
								}
								ItemSeparatorComponent={ItemSeparator}
								style={styles.listStyle}
							/>
						) : null}
					</>
				) : null}
			</View>
			{/* the reason behind to use two time with same ui to show differently for course case and program case */}
			{isProgramType ? (
				<>
					{module4Data?.code === extend &&
					module4Data?.children?.length > 0 ? (
						<FlatList
							data={module4Data?.children}
							renderItem={renderItem}
							showsVerticalScrollIndicator={false}
							keyExtractor={(_item, index) => index.toString()}
							ItemSeparatorComponent={ItemSeparator}
							style={styles.listStyle}
						/>
					) : null}
				</>
			) : null}
		</>
	);
};

export { ModuleItemL2 };

const styles = StyleSheet.create({
	alignEnd: { ...flex1 },
	container: {
		backgroundColor: colors.neutral.white,
		borderRadius: b8,
		elevation: 3,
		marginBottom: verticalScale(5),
		marginHorizontal: verticalScale(5), // Uncomment if you want horizontal margins
		shadowColor: colors.neutral.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.84,
	},
	courseContainer: {
		backgroundColor: colors.bg.fill.bg_disable,
		borderRadius: b8,
		elevation: 4,
	},
	courseTxtContainer: {
		paddingHorizontal: horizontalScale(4),
		paddingVertical: verticalScale(8),
	},
	desc: {
		marginTop: verticalScale(3),
		...w400,
		color: colors.content.text.body_grey_07,
		...sm,
		lineHeight: moderateScale(20),
	},
	label: {
		...flex1,
	},
	labelStyle: {
		...md,
		...selfCenter,
		...txtStart,
		color: colors.neutral.grey_06,
		marginHorizontal: horizontalScale(8),
	},
	listStyle: {
		marginTop: verticalScale(10),
	},
	moduleNumberText: {
		...sm,
		...clrGray,
	},
	moduleNumberTextDisabled: {
		...clrDisabled,
	},
	rowCenter: {
		...alignContentCenter,
		...alignCenter,
		...row,
	},
	separator: {
		marginBottom: verticalScale(8),
	},
	sessionText: {
		...w400,
		color: colors.neutral.grey_06,
		...sm,
		lineHeight: moderateScale(20),
		marginLeft: verticalScale(8),
	},
	textContainer: {
		borderRadius: b8,
		paddingHorizontal: horizontalScale(4),
		paddingVertical: verticalScale(10),
	},
	title: {
		marginLeft: verticalScale(6),
		marginVertical: verticalScale(10),
		...w400,
		color: colors.cta.text.default_secondary,
		...md,
		lineHeight: moderateScale(22),
	},
});
