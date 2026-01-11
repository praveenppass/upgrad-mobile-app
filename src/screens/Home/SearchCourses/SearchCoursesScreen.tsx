import React, { memo, useCallback } from "react";
import {
	FlatList,
	KeyboardAvoidingView,
	TouchableOpacity,
	View,
} from "react-native";

import styles from "@screens/Home/SearchCourses/searchCoursesStyles";
import useSearchCoursesController from "@screens/Home/SearchCourses/useSearchCoursesController";

import CourseCard from "@components/Home/HomeCourseCard";
import RNText from "@components/Reusable/RNText";
import SearchTextInput from "@components/Reusable/TextInput/SearchTextInput";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { horizontalScale } from "@utils/functions";

import { IHomeCourseCard } from "@interface/components/home/homeCourseCard";

import { colors } from "@assets/colors";
import { DismissIcon, EmptycardLxp } from "@assets/icons";
import { strings } from "@assets/strings";

const { neutral } = colors;

interface ISearchHistoryItem {
	item: string;
	onPress: (item: string) => void;
	onRemove: (item: string) => void;
}

interface IRenderCourseItem {
	item: IHomeCourseCard;
}

interface IRenderSearchHistoryItem {
	item: string;
}

const SearchHistoryItem = ({ item, onPress, onRemove }: ISearchHistoryItem) => (
	<View style={styles.container}>
		<RNText style={styles.searchText} onPress={() => onPress(item)}>
			{item}
		</RNText>
		<TouchableOpacity style={styles.right} onPress={() => onRemove(item)}>
			<DismissIcon
				height={horizontalScale(18)}
				width={horizontalScale(18)}
				color={colors.neutral.grey_06}
			/>
		</TouchableOpacity>
	</View>
);
const MemoizedSearchHistoryItem = memo(SearchHistoryItem);

const EmptyCoursesView = () => (
	<View style={styles.centerContainer}>
		<View style={styles.box}>
			<EmptycardLxp />
		</View>
	</View>
);
const MemoizedEmptyCoursesView = memo(EmptyCoursesView);

const CourseCardComponent = ({ item }: { item: IHomeCourseCard }) => (
	<CourseCard
		title={item.title}
		duration={item.duration}
		progress={item.progress}
		imageUrl={item.imageUrl}
		id={item.id}
		variant={item.variant}
		universityPartnerName={item.universityPartnerName || ""}
		specializationsCount={item.specializationsCount || 0}
		toggleSpecialization={item.toggleSpecialization || (() => undefined)}
		isSpecializationScreen={item.isSpecializationScreen || false}
	/>
);
const MemoizedCourseCard = memo(CourseCardComponent);

const ItemSeparator = () => <View style={styles.separator} />;
const MemoizedItemSeparator = memo(ItemSeparator);

const BodyComponent = () => {
	const {
		onClear,
		onSubmitHandler,
		removeSearchQuery,
		searchHistory,
		loading,
		searchQuery,
		showClearBtn,
		showSearchHistory,
		filteredCourses,
		setSearchQuery,
		resultsText,
		searchHistoryKeyExtractor,
		courseKeyExtractor,
	} = useSearchCoursesController();

	const renderSearchHistoryItem = useCallback(
		({ item }: IRenderSearchHistoryItem) => (
			<MemoizedSearchHistoryItem
				item={item}
				onPress={setSearchQuery}
				onRemove={removeSearchQuery}
			/>
		),
		[setSearchQuery, removeSearchQuery],
	);

	const renderCourseItem = useCallback(
		({ item }: IRenderCourseItem) => <MemoizedCourseCard item={item} />,
		[],
	);

	return (
		<View style={[styles.flexContainer, styles.lightBgGrey]}>
			<KeyboardAvoidingView style={styles.flexContainer}>
				<View style={styles.searchInputContainer}>
					<SearchTextInput
						value={searchQuery}
						onInputHandler={setSearchQuery}
						placeholder={strings.SEARCH}
						inputContainerStyle={styles.inputContainer}
						placeholderTextColor={neutral.grey_05}
						autoFocus
						selectTextOnFocus={showSearchHistory}
						onBlur={onSubmitHandler}
						showClearBtn={showClearBtn}
						onClear={onClear}
					/>
				</View>
				{showSearchHistory ? (
					<FlatList
						data={searchHistory}
						style={styles.searchHistoryListStyle}
						renderItem={renderSearchHistoryItem}
						keyExtractor={searchHistoryKeyExtractor}
						ItemSeparatorComponent={MemoizedItemSeparator}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<View style={styles.flexContainer}>
						{resultsText && (
							<RNText
								title={resultsText}
								style={styles.searchTextStyle}
							/>
						)}

						<FlatList
							data={filteredCourses}
							renderItem={renderCourseItem}
							ListFooterComponentStyle={
								loading ? null : styles.footerComponentStyle
							}
							showsVerticalScrollIndicator={false}
							ListEmptyComponent={MemoizedEmptyCoursesView}
							keyExtractor={courseKeyExtractor}
							contentContainerStyle={
								styles.courseListContentStyle
							}
						/>
					</View>
				)}
			</KeyboardAvoidingView>
		</View>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const SearchCoursesScreen = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		showProfile
		backgroundColor={colors.neutral.grey_02}
	/>
);

export default memo(SearchCoursesScreen);
