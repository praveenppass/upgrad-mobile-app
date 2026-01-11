import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import PersonalInfo from "@components/MyProfile/MyAccount/common/PersonalInfo";
import { ProfessionalInfo } from "@components/MyProfile/MyAccount/common/ProfessionalInfo";
import ProfileCertificate from "@components/MyProfile/MyAccount/common/ProfileCertificate";
import TopSectionSkeleton from "@components/MyProfile/MyAccount/TopSectionSkeleton";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import {
	ICertificate,
	INaviagtionType,
	IPersonalInformation,
	IProfessionalInformation,
	IProfileComponentType,
	IProfileDetailsCard,
} from "@interface/myAccount.interface";

import { colors } from "@assets/colors";
import {
	EditIconProfile,
	NothingAddedYeticon,
	PlusIconAccount,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, highlight } = colors;
const { BORDER } = measures;

const {
	text: { semiBold, medium, md, reg },
} = commonStyles;

const ProfileDetailsCard = ({
	profileDataItem,
	Icon,
	title,
	loading,
	SkeletonComp,
	skeletonCount,
	type,
	showCount,
	navigationType,
	onPressViewNavigate,
	onPressAddEditNavigate,
}: IProfileDetailsCard) => {
	const isEditOrAdd = navigationType === INaviagtionType.ADD_EDIT;

	const renderDataByType = (
		item: ICertificate | IProfessionalInformation | IPersonalInformation,
	) => {
		switch (type) {
			case IProfileComponentType.CERTIFICATE:
				return <ProfileCertificate {...(item as ICertificate)} />;
			case IProfileComponentType.PERSONAL_INFO:
				return <PersonalInfo {...(item as IPersonalInformation)} />;
			case IProfileComponentType.PROFESSIONAL_INFO:
				return (
					<ProfessionalInfo {...(item as IProfessionalInformation)} />
				);
		}
	};

	const isProfileComponentProfessional =
		type === IProfileComponentType.PROFESSIONAL_INFO;

	const totalProfileItems = profileDataItem?.length;
	const isProfileDataEmpty = totalProfileItems === 0;
	const itemCountCheck = totalProfileItems !== 0 && totalProfileItems > 3;

	const renderProfileIcon = (
		componentType: IProfileComponentType,
		totalProfileItemsCount: number,
	) => {
		if (componentType === IProfileComponentType.CERTIFICATE) {
			return null;
		}
		return totalProfileItemsCount !== 0 ? (
			<EditIconProfile />
		) : (
			<PlusIconAccount />
		);
	};

	return (
		<View
			style={[
				styles.cardContainer,
				loading && styles.cardContainerSkeleton,
			]}
		>
			{loading ? (
				<TopSectionSkeleton />
			) : (
				<View style={styles.topSection}>
					<View style={styles.iconContainer}>
						<Icon />
					</View>
					<RNText style={styles.heading}>
						{`${title} `}
						{type === IProfileComponentType.PROFESSIONAL_INFO &&
							showCount &&
							`(${totalProfileItems})`}
					</RNText>
					<Pressable
						style={styles.navigationPadding}
						onPress={
							isProfileDataEmpty
								? onPressAddEditNavigate
								: onPressViewNavigate
						}
					>
						{renderProfileIcon(type, totalProfileItems)}
					</Pressable>
				</View>
			)}

			{isProfileDataEmpty && !loading ? (
				<View style={styles.nothingAddedYetView}>
					<NothingAddedYeticon />
					<RNText style={styles.nothingAddedYetText}>
						{strings.NOTHING_ADDED_YET}
					</RNText>
				</View>
			) : (
				<></>
			)}

			{loading ? (
				<FlatList
					data={Array.from({ length: skeletonCount })}
					keyExtractor={(_item, index) => index.toString()}
					renderItem={() => <SkeletonComp />}
				/>
			) : (
				<FlatList
					data={profileDataItem}
					keyExtractor={(_item, index) => index.toString()}
					renderItem={({ item }) => renderDataByType(item)}
					ItemSeparatorComponent={() =>
						isProfileComponentProfessional ? (
							<View style={styles.separator} />
						) : (
							<></>
						)
					}
				/>
			)}
			{!isEditOrAdd && itemCountCheck ? (
				<Pressable
					style={styles.viewMoreView}
					onPress={onPressViewNavigate}
				>
					<RNText style={styles.viewMore}>{strings.VIEW_MORE}</RNText>
				</Pressable>
			) : (
				<></>
			)}
		</View>
	);
};

export default ProfileDetailsCard;

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: neutral.white,
		borderRadius: BORDER.b10,
		flex: 1,
		marginBottom: verticalScale(15),
	},
	cardContainerSkeleton: {
		paddingVertical: verticalScale(12),
	},
	heading: {
		color: neutral.black,
		flex: 1,
		...reg,
		...semiBold,
		marginLeft: horizontalScale(10),
	},
	iconContainer: {
		alignItems: "center",
		backgroundColor: highlight.bg_blue,
		borderRadius: verticalScale(12),
		height: verticalScale(24),
		justifyContent: "center",
		width: verticalScale(24),
	},
	navigationPadding: {
		padding: horizontalScale(10),
	},
	nothingAddedYetText: {
		lineHeight: verticalScale(21),
		...medium,
		...md,
		color: neutral.black,
	},
	nothingAddedYetView: {
		alignItems: "center",
		flex: 1,
		gap: verticalScale(7),
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(12),
	},
	separator: {
		backgroundColor: neutral.grey_04,
		height: 1,
	},
	topSection: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(16),
		paddingTop: verticalScale(16),
	},
	viewMore: {
		...semiBold,
		...md,
		color: neutral.black,
		lineHeight: verticalScale(21),
		textDecorationLine: "underline",
	},
	viewMoreView: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: verticalScale(10),
	},
});
