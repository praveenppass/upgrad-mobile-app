import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import LogoutModal from "@screens/Tabs/MyProfile/LogoutModal";
import useMyProfileScreenController from "@screens/Tabs/MyProfile/MyProfileScreen/useMyProfileScreenController";

import ProfileHeader from "@components/MyProfile/common/ProfileHeader";
import ProfileScreenButtonList from "@components/MyProfile/common/ProfileScreenButtonList";
import DeleteAccountModal from "@components/MyProfile/DeleteAccountModal";
import ProfileScreenSkeleton from "@components/MyProfile/ProfileScreenSkeleton";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

const BodyComponent = () => {
	const {
		completionPercentage,
		userDetails,
		loading,
		handleLogout,
		handleDeleteAccount,
		isDeleteAccountModalVisible,
		toggleDeleteAccountModal,
		saProfile,
		isLogoutModalVisible,
		toggleLogoutModal,
		saToken,
		abroadDashboardUrl,
	} = useMyProfileScreenController();

	return (
		<View style={style.container}>
			{loading ? (
				<ProfileScreenSkeleton />
			) : (
				<>
					<ProfileHeader
						profileProgress={completionPercentage}
						userDetails={userDetails}
					/>
					<ProfileScreenButtonList
						onLogout={toggleLogoutModal}
						onDeleteAccount={toggleDeleteAccountModal}
						saProfile={saProfile}
						saToken={saToken}
						abroadDashboardUrl={abroadDashboardUrl}
					/>
				</>
			)}

			<DeleteAccountModal
				isModalVisible={isDeleteAccountModalVisible}
				onCloseModal={toggleDeleteAccountModal}
				handleDeleteAccount={handleDeleteAccount}
			/>
			<LogoutModal
				visible={isLogoutModalVisible}
				onCancel={toggleLogoutModal}
				onLogout={handleLogout}
			/>
		</View>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const MyProfileScreen = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		backgroundColor={neutral.grey_02}
	/>
);

export default memo(MyProfileScreen);

const style = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(20),
	},
});
