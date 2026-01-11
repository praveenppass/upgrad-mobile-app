import React, { useState } from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import {
	Filter,
	IFilterState,
} from "@components/Reusable/Filter/filter.interface";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { CloseIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const { neutral } = colors;

interface IFilterChip {
	title: string;
	onPress: () => void;
}

const FilterChip = ({ title, onPress }: IFilterChip) => {
	return (
		<Pressable style={styles.chip} onPress={onPress}>
			<RNText style={styles.chipText} numberOfLines={1}>
				{title}
			</RNText>
			<CloseIcon color={neutral.black} />
		</Pressable>
	);
};

interface IFilterChips<T extends string> {
	filterState: IFilterState<T>;
	setFilterState: (fs: IFilterState<T>) => void;
	filters: Filter<T>[];
	style?: StyleProp<ViewStyle>;
}

interface IFilterChipData {
	filterType: string;
	type: string;
	title: string;
}

const FilterChips = <T extends string>({
	filterState,
	setFilterState,
	filters,
	style,
}: IFilterChips<T>) => {
	const [viewMore, setViewMore] = useState<boolean>(false);

	const getOptionType = (type: string, value: string) => {
		const filter = filters.find((f) => f.type === type);
		if (!filter) return "";

		const option = filter.options.find((o) => o.type === value);
		return option ? option.title : "";
	};

	const chipData: IFilterChipData[] = Object.entries<string[]>(
		filterState,
	).flatMap(([filterType, typeFilters]) =>
		typeFilters.map((tf) => ({
			filterType,
			type: tf,
			title: getOptionType(filterType, tf) || "",
		})),
	);

	const VIEW_MORE_LIMIT = 3;

	const hasMoreChips = chipData.length > VIEW_MORE_LIMIT;
	const clippedChipData = viewMore
		? chipData
		: chipData.slice(0, VIEW_MORE_LIMIT);

	const hasChips = !chipData.length;

	if (hasChips) return <></>;

	return (
		<View style={[styles.container, style]}>
			{clippedChipData.map(({ filterType, type, title }) => (
				<FilterChip
					key={type}
					onPress={() => {
						setFilterState({
							...filterState,
							[filterType]: filterState[filterType as T].filter(
								(f) => f !== type,
							),
						});
					}}
					title={title}
				/>
			))}
			{hasMoreChips ? (
				<Pressable
					onPress={() => setViewMore(!viewMore)}
					style={styles.viewMore}
				>
					<RNText style={styles.viewMoreText}>
						{viewMore ? strings.VIEW_LESS : strings.VIEW_MORE}
					</RNText>
				</Pressable>
			) : (
				<></>
			)}
		</View>
	);
};

export default FilterChips;

const styles = StyleSheet.create({
	chip: {
		alignItems: "center",
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(4),
		flexDirection: "row",
		gap: horizontalScale(4),
		marginVertical: verticalScale(3),
		maxWidth: horizontalScale(150),
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(8),
	},
	chipText: {
		color: neutral.black,
		flexShrink: 1,
	},
	container: {
		columnGap: horizontalScale(5),
		flexDirection: "row",
		flexWrap: "wrap",
	},
	viewMore: {
		justifyContent: "center",
	},
	viewMoreText: {
		color: neutral.black,
		textDecorationLine: "underline",
	},
});
