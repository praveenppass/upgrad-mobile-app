import React, { memo } from "react";
import { Pressable, ScrollView, View } from "react-native";

import styles from "@screens/Tabs/MyProfile/MyAccount/myAccount.styles";
import useMyAccountController from "@screens/Tabs/MyProfile/MyAccount/useMyAccountController";

import ProfileDetailsCard from "@components/MyProfile/MyAccount/common/ProfileDetailsCard";
import { ProfileDetailsSkeleton } from "@components/MyProfile/MyAccount/ProfileDetailsSkeleton";
import UploadProfilePicModal from "@components/MyProfile/MyAccount/UploadProfilePicModal";
import UploadResumeModal from "@components/MyProfile/MyAccount/UploadResumeModal";
import ProgressBar from "@components/Reusable/ProgressBar";
import RNText from "@components/Reusable/RNText";
import SafeImage from "@components/Reusable/SafeImage";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { colors } from "@assets/colors";
import { ProfilePicEditIcon, ResumeUploadIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const BodyComponent = () => {
	const {
		modalVisible,
		loading,
		onToggleModal,
		profileModalVisible,
		toggleProfileModal,
		percentage,
		profileData,
		userInfo,
		profilePicModalData,
		onRemoveImage,
		chooseImage,
		resumeData,
		handleResumeUpload,
		onRemoveResume,
		onDownloadResume,
		uploadResumeFilename,
		uploadResumePercent,
		isResumeUploading,
		isuploadLimitReached,
		resumeDownloadingId,
		resumeRemovingFileName,
		uploadProfilePicLoading,
	} = useMyAccountController();

	const profileInitialsFallback = (
		<View style={styles.initials}>
			<RNText style={styles.initialsText}>{userInfo.initials}</RNText>
		</View>
	);

	return (
		<ScrollView
			style={styles.scrollView}
			contentContainerStyle={styles.scrollViewPadding}
		>
			{loading ? (
				<ProfileDetailsSkeleton />
			) : (
				<View style={styles.containerView}>
					<View style={styles.profileDetails}>
						<Pressable
							onPress={toggleProfileModal}
							style={styles.iconContainerImage}
						>
							<SafeImage
								source={{
									uri: userInfo?.profilePic || "",
								}}
								imageStyle={styles.profilePic}
								fallbackComponent={profileInitialsFallback}
							/>

							<View style={styles.profileEditIcon}>
								<ProfilePicEditIcon />
							</View>
						</Pressable>
						<View style={styles.detailsView}>
							<RNText numberOfLines={1} style={styles.name}>
								{userInfo?.name}
							</RNText>
							{/* Progress bar commented : Hakuna Matata */}
							<ProgressBar
								progress={
									percentage ? +percentage?.toFixed(0) : 0
								}
								leftTextTitle={userInfo?.email || ""}
								leftTextStyle={styles.email}
								// rightTextTitle={`${percentage?.toFixed(0)}%`}
								// rightTextStyle={styles.email}
								showProgress={false}
							/>
						</View>
					</View>

					<Pressable
						style={styles.uploadResume}
						onPress={onToggleModal}
					>
						<ResumeUploadIcon color={colors.neutral.black} />
						<RNText style={styles.resumeUploadText}>
							{strings.UPLOAD_RESUME}
						</RNText>
					</Pressable>
				</View>
			)}

			{profileData.map((profileDataItem, idx) => (
				<ProfileDetailsCard
					profileDataItem={profileDataItem.data}
					type={profileDataItem.type}
					navigationType={profileDataItem.navigationType}
					Icon={profileDataItem.Icon}
					title={profileDataItem.title}
					key={idx}
					loading={loading}
					showCount={profileDataItem.showCount}
					skeletonCount={profileDataItem.skeletonCount}
					SkeletonComp={profileDataItem.SkeletonComp}
					onPressViewNavigate={profileDataItem.onPressViewNavigate}
					onPressAddEditNavigate={
						profileDataItem.onPressAddEditNavigate
					}
				/>
			))}

			<UploadResumeModal
				data={resumeData ?? []}
				isuploadLimitReached={isuploadLimitReached}
				uploadFileName={uploadResumeFilename}
				uploadPercent={uploadResumePercent}
				isUploading={isResumeUploading}
				visible={modalVisible}
				onClose={onToggleModal}
				onRemoveResume={onRemoveResume}
				onDownloadResume={onDownloadResume}
				handleResumeUpload={handleResumeUpload}
				resumeDownloadingId={resumeDownloadingId}
				resumeRemovingFileName={resumeRemovingFileName}
			/>
			<UploadProfilePicModal
				onRemoveImage={onRemoveImage}
				chooseImage={chooseImage}
				initials={profilePicModalData?.initials}
				profilePic={profilePicModalData?.profilePic ?? null}
				visible={profileModalVisible}
				onClose={toggleProfileModal}
				loading={uploadProfilePicLoading}
			/>
		</ScrollView>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const MyAccount = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		title={strings.MY_ACCOUNT}
		backgroundColor={colors.neutral.grey_02}
		removeBottomInset
	/>
);

export default MyAccount;
