import React, { useEffect, useState } from "react";
import {
	FlatList,
	LayoutAnimation,
	Platform,
	Pressable,
	StyleSheet,
	UIManager,
	View,
} from "react-native";

import { IAssetItem } from "@components/Courses/CourseDetails/Note/common/ModuleAndAssetInterface";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { fontFamily } from "@assets/fonts";
import {
	BookmarkComputerIcon,
	BookMarkedIcon,
	DownArrowIcon,
	UpArrowIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";

const {
	commonStyles: {
		text: { bold, sm, clrGray, md, regular, w600 },
	},
} = C;

interface IParentItem {
	name?: string;
	label?: string;
	totalNotes?: number;
}

interface accordtionProps {
	item: IParentItem;
	index: number;
	isNoteList?: boolean;
	notesAssetData: IAssetItem[];
	handleItemPress: () => void;
	handleNavigation: (item: IAssetItem) => void;
	removeBookmark?: (assetCode: string) => void;
}

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

const CollapsibleList = ({
	item,
	isNoteList = false,
	notesAssetData,
	handleItemPress,
	handleNavigation,
	removeBookmark,
}: accordtionProps) => {
	const BOOKMARK_ICON_DIMENSIONS = {
		height: verticalScale(16),
		width: horizontalScale(18),
	};

	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setIsOpen(!isOpen);
		handleItemPress();
	};

	useEffect(() => {
		if (!notesAssetData.length) {
			setIsOpen(false);
		}
	}, [notesAssetData]);
	return (
		<View style={styles.collapsibleContainer}>
			<Pressable onPress={toggleAccordion}>
				<View style={styles.headerContainer}>
					<RNText
						title={item?.label}
						style={styles.moduleNumberText}
					/>
					<View style={styles.headerTitleContainer}>
						<RNText
							title={item?.name}
							style={styles.headerTitleText}
						/>
						<View style={styles.arrowIconContainer}>
							{isOpen ? (
								<UpArrowIcon
									height={verticalScale(16)}
									width={horizontalScale(18)}
								/>
							) : (
								<DownArrowIcon
									height={verticalScale(15)}
									width={horizontalScale(18)}
								/>
							)}
						</View>
					</View>
				</View>
			</Pressable>

			<View
				style={[
					styles.contentContainer,
					isOpen ? styles.expandedContent : styles.collapsedContent,
				]}
			>
				<View>
					<FlatList
						data={notesAssetData}
						renderItem={({ item: noteItem, index: noteIndex }) => {
							const assetName =
								noteItem?.aliasName || noteItem?.asset?.name;
							return (
								<Pressable
									onPress={() => handleNavigation(noteItem)}
								>
									<View
										key={noteIndex}
										style={styles.noteItemContainer}
									>
										<View style={styles.rnTxt}>
											<BookmarkComputerIcon
												height={verticalScale(18)}
												width={horizontalScale(20)}
											/>
											<RNText
												title={assetName}
												style={styles.noteText}
											/>
											{isNoteList && (
												<RNText
													title={`\u2022 ${noteItem?.notes?.length} ${strings.NOTES}`}
													style={styles.countNoteTxt}
												/>
											)}
										</View>
										{!isNoteList && (
											<Pressable
												style={styles.bookmarkIcon}
												onPress={() =>
													removeBookmark?.(
														noteItem?.asset?.code ??
															"",
													)
												}
											>
												<BookMarkedIcon
													{...BOOKMARK_ICON_DIMENSIONS}
												/>
											</Pressable>
										)}
									</View>
								</Pressable>
							);
						}}
						keyExtractor={(_, idx) => idx.toString()}
					/>
				</View>
			</View>
		</View>
	);
};

export default CollapsibleList;

const styles = StyleSheet.create({
	arrowIconContainer: {
		alignSelf: "center",
		flex: 1,
		justifyContent: "center",
	},
	bookmarkIcon: { alignItems: "flex-end", flex: 2 },
	collapsedContent: {
		maxHeight: 0,
	},
	collapsibleContainer: {
		backgroundColor: colors.neutral.white,
		borderRadius: horizontalScale(8),
	},
	contentContainer: {
		backgroundColor: colors.neutral.white,
		overflow: "hidden",
	},
	countNoteTxt: {
		paddingHorizontal: horizontalScale(10),
		...sm,
		...bold,
		color: colors.neutral.black,
		lineHeight: verticalScale(20),
	},
	divider: {
		backgroundColor: colors.neutral.grey_02,
		height: verticalScale(2),
		marginTop: verticalScale(12),
	},
	expandedContent: {
		maxHeight: "100%",
	},
	headerContainer: {
		backgroundColor: colors.neutral.white,
		borderRadius: horizontalScale(8),
		paddingLeft: horizontalScale(20),
		paddingRight: horizontalScale(16),
		paddingVertical: verticalScale(12),
	},
	headerTitleContainer: { flexDirection: "row" },
	headerTitleText: {
		...md,
		...w600,
		color: colors.neutral.grey_08,
		flex: 12,
		fontFamily: fontFamily.Bold,
	},
	moduleNumberText: { ...md, ...clrGray, marginRight: horizontalScale(20) },
	noteItemContainer: {
		alignItems: "center",
		flexDirection: "row",
		paddingBottom: verticalScale(10),
		paddingHorizontal: horizontalScale(18),
	},
	noteText: {
		paddingLeft: verticalScale(10),
		...sm,
		...regular,
		color: colors.neutral.black,
		flexShrink: 1,
		lineHeight: verticalScale(20),
	},
	rnTxt: {
		alignItems: "center",
		flex: 9,
		flexDirection: "row",
		marginBottom: verticalScale(5),
	},
});
