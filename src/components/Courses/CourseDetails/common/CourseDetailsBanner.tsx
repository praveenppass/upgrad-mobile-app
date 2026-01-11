import React, { memo, useState } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { data } from "tests/components/asset/common/ReportAnIssueModal/index.data";

import Accordion from "@components/Courses/Accordion";
import DropdownAccordion from "@components/IconComponents/DropdownAccordion";
import ProgressBar from "@components/Reusable/ProgressBar";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { WhiteInfoIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const {
	themes: { bg, primary },
	commonStyles: {
		spacing: { pbm10, mb10, mt10, mr4, pl18, ph18, pr18, pt12, mr10 },
		align: { row, itemsCenter },
		text: {
			bold,
			clrWhite,
			w600,
			md,
			sm,
			reg,
			txtCenter,
			clrDisabled,
			w400,
			lineHeight22,
			xxSm,
		},
	},
	colors: { neutral },
} = C;

const {
	BORDER: { b8 },
} = measures;

interface ICourseBannerType {
	courseName?: string;
	courseDescription: string;
	progress: number;
	containerStyles?: StyleProp<ViewStyle>;
	footerComponent?: JSX.Element;
	accordionOnPress?: () => void;
	isSpecialization: boolean;
}

const CourseDetailsBanner = ({
	courseName,
	courseDescription,
	progress,
	containerStyles,
	footerComponent,
	accordionOnPress,
	isSpecialization,
}: ICourseBannerType) => {
	const [open, setOpen] = useState(false);

	return (
		<Accordion
			onChange={(isOpen) => {
				setOpen(isOpen);
			}}
			onPress={accordionOnPress}
			parentContainerStyles={[
				style.parentContainerStyles,
				containerStyles,
			]}
			customHeaderComponent={
				<View style={style.header}>
					{isSpecialization ? (
						<View style={style.specialisationView}>
							<RNText
								title={strings.SPECIALIZATION}
								style={style.specialisationTxt}
							/>
						</View>
					) : null}

					{courseName ? (
						<View style={row}>
							<RNText
								numberOfLines={open ? 20 : 2}
								title={courseName + " "}
								style={style.courseName}
							>
								<DropdownAccordion isOpen={open} />
							</RNText>
						</View>
					) : null}
				</View>
			}
			footerComponent={<View style={style.courseContainerView} />}
		>
			<>
				<View style={style.footerComponent}>
					<ProgressBar
						progress={progress}
						leftTextTitle={`${progress?.toFixed(0)}%`}
						leftTextStyle={{ ...clrWhite, ...md }}
					/>
				</View>
				<View style={style.courseDescriptionView}>
					<RNText
						title={courseDescription}
						style={style.courseDescription}
					/>
					{footerComponent}
				</View>
			</>
		</Accordion>
	);
};

const style = StyleSheet.create({
	banner: {
		backgroundColor: bg.grey,
		borderColor: primary.color2,
		borderRadius: b8,
		borderWidth: 1,
		height: verticalScale(35),
		width: horizontalScale(100),
		...itemsCenter,
	},
	courseContainerView: {
		...pr18,
		...pl18,
		...pbm10,
		...pt12,
	},
	courseDescription: {
		...clrWhite,
		...sm,
		...w400,
		lineHeight: 22,
	},
	courseDescriptionView: {
		...pr18,
		...pl18,
	},

	courseName: {
		...reg,
		...w600,
		...clrWhite,
		lineHeight: 26,
	},
	dueView: {
		...mt10,
		...mr10,
	},
	footerComponent: {
		...pr18,
		...pl18,
		...pbm10,
	},
	header: {
		...ph18,
	},
	iconView: {
		...mr4,
	},
	lockedWeekText: {
		...clrDisabled,
		...md,
		...w400,
		...lineHeight22,
	},
	parentContainerStyles: {
		backgroundColor: neutral.black,
	},
	specialisationTxt: { color: colors.neutral.grey_08, ...xxSm },
	specialisationView: {
		alignItems: "center",
		backgroundColor: colors.neutral.grey_04,
		borderRadius: horizontalScale(20),
		gap: horizontalScale(5),
		height: verticalScale(16),
		justifyContent: "center",
		width: horizontalScale(70),
	},
	txtStyle: { ...clrWhite, ...txtCenter, ...bold, ...reg },

	weekView: { justifyContent: "flex-start" },
});

export default memo(CourseDetailsBanner);
