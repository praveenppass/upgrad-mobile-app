import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import {
	getActiveBorderRadius,
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { SuccessIconLxp, UnFinishedIconLxp } from "@assets/icons";

const {
	themes: { primary },
	commonStyles: {
		text: { w400, sm, w700 },
	},
} = C;

const {
	BORDER: { b6, b8 },
} = measures;

const ICON_DIMENSION = {
	width: horizontalScale(12),
	height: horizontalScale(12),
};

interface Activity {
	label: string;
	activity: {
		status: string;
	};
}

interface CourseSelectorProps {
	data: any;
	courseRender: any;
	onSelect: (value: number) => void;
	indices?: number[];
}

const CourseSelector: React.FC<CourseSelectorProps> = ({
	data,
	courseRender,
	onSelect,
	indices,
}) => {
	const flatListRef = useRef<FlatList>(null);

	const handleSelect = (index: number) => {
		   setTimeout(() => {
			   if (
				   flatListRef.current &&
				   typeof index === 'number' &&
				   index >= 0 &&
				   data &&
				   index < data.length
			   ) {
				   flatListRef.current.scrollToIndex({
					   index,
					   animated: false,
					   viewPosition: 0.5,
				   });
			   }
		   }, 1000);
	};

	useEffect(() => {
		if (!data?.length) return;
		const index = courseRender?.activeIndex;
		handleSelect(index);
	}, [courseRender?.activeIndex, data]);

	const renderItem = ({ item, index }: { item: Activity; index: number }) => {
		const isActive = courseRender?.activeIndex === index;
		const dotCheck = ["completed"].includes(item?.activity?.status);

		return (
			<TouchableOpacity
				onPress={() => {
					onSelect(index);
				}}
			>
				<View
					style={[
						styles.item,
						isActive
							? // eslint-disable-next-line react-native/no-inline-styles
								{
									...styles.selectContainer,
									marginLeft: index === 0 ? 8 : 0,
								}
							: getActiveBorderRadius(index, data && data.length),
					]}
				>
					<RNText
						title={`C${
							indices?.[index] != null
								? indices[index] + 1
								: index + 1
						}`}
						style={[styles.itemText, isActive ? w700 : w400]}
					/>
					{!indices?.length &&
						(dotCheck ? (
							<SuccessIconLxp
								{...ICON_DIMENSION}
								style={styles.iconStyle}
							/>
						) : (
							<UnFinishedIconLxp
								{...ICON_DIMENSION}
								style={styles.iconStyle}
							/>
						))}
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.viewContainer}>
			<View style={styles.cardContainer}>
				<FlatList
					ref={flatListRef}
					data={data}
					renderItem={renderItem}
					keyExtractor={(item, index) => `${item.label}-${index}`}
					onScrollToIndexFailed={() => {
						return;
					}}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.flatListContent}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		borderRadius: b6,
		marginHorizontal: horizontalScale(0),
		paddingHorizontal: horizontalScale(4),
		width: "100%",
	},
	flatListContent: {
		paddingBottom: verticalScale(10),
		paddingTop: verticalScale(10),
	},
	iconStyle: {
		height: moderateScale(10),
		marginHorizontal: verticalScale(9),
		marginVertical: verticalScale(9),
		width: moderateScale(10),
	},
	item: {
		alignItems: "center",
		backgroundColor: primary.color2,
		height: verticalScale(68),
		justifyContent: "center",
		marginLeft: -horizontalScale(1),
		paddingHorizontal: horizontalScale(6),
		width: horizontalScale(38),
	},
	itemText: {
		color: colors.content.text.default_black,
		...sm,
		marginVertical: verticalScale(4),
	},
	selectContainer: {
		backgroundColor: primary.color2,
		borderColor: colors.highlight.text_green,
		borderRadius: b8,
		borderWidth: 1,
		elevation: 5,
		marginRight: horizontalScale(4),
		overflow: "hidden",
		shadowColor: primary.color3,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		transform: [{ scale: 1.1 }],
	},
	viewContainer: {
		borderRadius: horizontalScale(6),
		marginHorizontal: verticalScale(14),
	},
});

export default CourseSelector;
