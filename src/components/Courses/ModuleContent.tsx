import React, { memo } from "react";
import { C } from "@assets/constants";
import { View, StyleSheet, type StyleProp, type TextStyle } from "react-native";
import RNText from "@components/Reusable/RNText";
import {
	AssetCardLockedIcon,
	BulletIcon,
	CheckMarkGreenCircleIcon,
	CircleIcon,
} from "@assets/icons";
import { horizontalScale, moderateScale } from "@utils/functions";
import DueDateBanner from "@components/Penalty/DueDateBanner";
import { ExtensionRequest } from "@interface/milestonetype.interface";
import Extension from "@components/Penalty/Extension";
import { colors } from "@assets/colors";
import { strings } from "@assets/strings";

const {
	themes: { bg },
	commonStyles: {
		spacing: { pt6, mh10, mr4, p6, pl6, mr6, p16, pb8, pt8, mr10 },
		align: { flex1, rowBetween, row, alignCenter },
		text: { reg, txtStart, bold, med, clrGray, md, clrBlack, clrDisabled },
	},
} = C;

interface IModuleContentType {
	moduleName?: string;
	moduleNumber?: string;
	leftComponent?: JSX.Element;
	rightComponent?: JSX.Element;
	isCompleted?: boolean;
	unLocked?: boolean | null;
	moduleNameStyle?: StyleProp<TextStyle>;
	bodyStyles?: StyleProp<TextStyle>;
	isLocked?: boolean | null;
	dueDatePenalty?: string;
	deadlineReferredFrom?: string;
	extensionRequests?: ExtensionRequest[] | null;
	availableFrom?: string;
	isOptional?: boolean;
	level2?: string | number | null;
	level3?: string | number | null;
	level4?: string | number | null;
	moduleCode?: string | number | null;
	modal?: boolean;
	pullDownToRefresh?: any;
	assetCompleted?: number;
	totalAssets?: number;
	segment?: boolean;
}

function ModuleContent({
	moduleName,
	moduleNumber,
	leftComponent,
	rightComponent,
	moduleNameStyle,
	isCompleted,
	bodyStyles,
	extensionRequests,
	dueDatePenalty,
	deadlineReferredFrom,
	isLocked,
	isOptional,
	availableFrom,
	level4,
	modal,
	level3,
	level2,
	moduleCode,
	pullDownToRefresh,
	assetCompleted,
	totalAssets,
	segment,
}: IModuleContentType) {
	return (
		<View
			style={[
				style.headerRootView,
				bodyStyles,
				{
					backgroundColor: segment ? "#DCF0E4" : "white",
					marginHorizontal: segment ? 12 : 0,
					marginBottom: segment ? 12 : 0,
				},
			]}
		>
			{rightComponent && rightComponent}
			<View style={[flex1, { marginLeft: 10 }]}>
				<View style={[rowBetween]}>
					<View style={[row, alignCenter]}>
						<View style={style.iconView}>
							{isLocked ? (
								<AssetCardLockedIcon
									width={moderateScale(20)}
									height={moderateScale(20)}
									color={colors.content.text["body_grey_07"]}
								/>
							) : isCompleted ? (
								<CheckMarkGreenCircleIcon
									width={moderateScale(20)}
									height={moderateScale(20)}
								/>
							) : (
								<CircleIcon
									width={moderateScale(20)}
									height={moderateScale(20)}
									color={colors.content.text["body_grey_07"]}
								/>
							)}
						</View>

						{moduleNumber ? (
							<>
								<View
									style={{
										flex: 1,
										flexDirection: "row",
										alignSelf: "center",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<RNText
										title={moduleNumber}
										numberOfLines={2}
										style={[
											style.moduleNumberText,
											isLocked &&
												style.moduleNumberTextDisabled,
											{
												flex: 1,
											},
										]}
									>
										{isOptional ? (
											<View
												style={[
													{
														flexDirection: "row",
														alignSelf: "center",
														justifyContent:
															"center",
														alignItems: "center",
														marginLeft: 10,
													},
												]}
											>
												<BulletIcon
													style={style.labelStyle}
												/>
												<RNText
													title={strings.OPTIONAL_TXT}
													style={[
														style.moduleNumberText,
														isLocked &&
															style.moduleNumberTextDisabled,
													]}
												/>
											</View>
										) : null}
									</RNText>
									{leftComponent && leftComponent}
								</View>
							</>
						) : (
							<RNText
								title={moduleName ?? ""}
								numberOfLines={1}
								style={[style.moduleNameText, moduleNameStyle]}
							/>
						)}
					</View>
					{/* {leftComponent && leftComponent} */}
				</View>

				<View style={style.dueView}>
					<DueDateBanner
						date={dueDatePenalty}
						deadlineReferredFrom={deadlineReferredFrom}
						title={moduleName}
						extensionRequests={extensionRequests}
						isOptional={isOptional}
						disabled={isLocked}
						availableFrom={availableFrom}
						level4={level4}
						level2={level2}
						level3={level3}
						moduleCode={moduleCode}
					/>
				</View>
				{moduleNumber && moduleName ? (
					<RNText
						title={moduleName}
						numberOfLines={1}
						style={[style.moduleNameText, moduleNameStyle]}
					/>
				) : null}
				{/* {!segment ? <View style={{ marginTop: 10 }} >
					<RNText title={`${assetCompleted ?? 0}/${totalAssets ?? 0} Completed`} style={{ color: "#666666", ...med }} />
				</View> : null} */}
				{/* {!availableFrom && !modal && dueDatePenalty ? (
					<Extension
						date={dueDatePenalty}
						disabled={isLocked}
						deadlineReferredFrom={deadlineReferredFrom}
						extensionRequests={extensionRequests}
						availableFrom={availableFrom}
						title={moduleName}
						level4={level4}
						level3={level3}
						level2={level2}
						moduleCode={moduleCode}
						pullDownToRefresh={pullDownToRefresh}
					/>
				) : null} */}
			</View>
		</View>
	);
}

const style = StyleSheet.create({
	headerRootView: {
		...rowBetween,
		...p6,
		borderRadius: 8,
	},
	labelStyle: {
		...md,
		...txtStart,
		color: "#999999",
		marginHorizontal: 10,
	},
	dueView: {
		...mr10,
		...pt8,
	},
	moduleNumberText: {
		...md,
		...clrGray,
	},
	moduleNumberTextDisabled: {
		...clrDisabled,
	},
	moduleNameText: {
		...reg,
		...clrBlack,
		...bold,
		lineHeight: 26,
	},
	iconView: {
		...mr4,
	},
});

export default memo(ModuleContent);
