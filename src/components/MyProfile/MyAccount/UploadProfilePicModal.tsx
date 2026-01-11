import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";
import SafeImage from "@components/Reusable/SafeImage";

import { horizontalScale, verticalScale } from "@utils/functions";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { colors } from "@assets/colors";
import {
	EditIconProfileModal,
	RemoveIconProfileModal,
	ViewIconProfileModal,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { regular, medium, md, large, lg } = commonStyles.text;

interface IUploadProfilePicModal {
	initials: string;
	profilePic: string | null;
	onClose: () => void;
	visible: boolean;
	onRemoveImage: () => void;
	chooseImage: () => void;
	loading: boolean;
}

interface IProfile {
	loading: boolean;
	profilePic: string | null;
	initials: string;
}

const Profile = ({ loading, profilePic, initials }: IProfile) => {
	if (loading) return <Loading />;

	const profileInitialsFallback = (
		<RNText style={styles.nameInitials}>{initials}</RNText>
	);

	return (
		<SafeImage
			source={{ uri: profilePic || "" }}
			imageStyle={styles.image}
			fallbackComponent={profileInitialsFallback}
		/>
	);
};

const MemoizedProfile = React.memo(Profile);

const UploadProfilePicModal: React.FC<IUploadProfilePicModal> = ({
	profilePic,
	initials,
	onClose,
	visible,
	onRemoveImage,
	chooseImage,
	loading,
}) => {
	const { navigate } = useNavigation<RootHomeStackList>();

	const handleImageView = () => {
		if (!profilePic) return;

		onClose();
		navigate("ImageViewScreen", {
			file: {
				fileUrl: profilePic,
				contentType: "image/jpeg",
			},
		});
	};

	const changeUploadText = profilePic
		? strings.CHANGE_PROFILE_PICTURE
		: strings.UPLOAD_PROFILE_PICTURE;

	return (
		<ActionModal
			isOpen={visible}
			closeModal={onClose}
			onBackPress={onClose}
			style={styles.modalStyle}
		>
			<View style={styles.containerView}>
				<View style={styles.slider} />

				<View style={styles.imageView}>
					<MemoizedProfile
						loading={loading}
						profilePic={profilePic}
						initials={initials}
					/>
				</View>
			</View>

			<Pressable style={styles.itemContainer} onPress={chooseImage}>
				<View style={styles.iconContainer}>
					<EditIconProfileModal />
				</View>
				<RNText style={styles.text} title={changeUploadText} />
			</Pressable>
			{profilePic ? (
				<>
					<View style={styles.separator} />
					<Pressable
						style={styles.itemContainer}
						onPress={handleImageView}
					>
						<View style={styles.iconContainer}>
							<ViewIconProfileModal />
						</View>
						<RNText
							style={styles.text}
							title={strings.VIEW_PROFILE_PICTURE}
						/>
					</Pressable>
					<View style={styles.separator} />

					<Pressable
						style={styles.itemContainer}
						onPress={onRemoveImage}
					>
						<View style={styles.iconContainer}>
							<RemoveIconProfileModal />
						</View>
						<RNText
							style={styles.text}
							title={strings.REMOVE_PROFILE_PICTURE}
						/>
					</Pressable>
				</>
			) : (
				<></>
			)}
		</ActionModal>
	);
};

export default UploadProfilePicModal;

const styles = StyleSheet.create({
	containerView: {
		alignItems: "center",
		justifyContent: "center",
	},
	iconContainer: {
		alignItems: "center",
		width: verticalScale(18),
	},
	image: {
		borderRadius: verticalScale(100),
		height: horizontalScale(78),
		resizeMode: "cover",
		width: horizontalScale(78),
	},
	imageInside: {
		height: "80%",
		resizeMode: "contain",
		width: "100%",
	},
	imageView: {
		alignItems: "center",
		backgroundColor: neutral.grey_05,
		borderRadius: verticalScale(100),
		height: horizontalScale(78),
		justifyContent: "center",
		width: horizontalScale(78),
	},
	itemContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(12),
		height: verticalScale(48),
		paddingHorizontal: horizontalScale(15),
	},
	modalStyle: {
		paddingHorizontal: 0,
		paddingTop: verticalScale(8),
	},
	nameInitials: {
		color: neutral.grey_07,
		height: verticalScale(51),
		lineHeight: verticalScale(51),
		width: horizontalScale(21),
		...regular,
		...large,
	},
	separator: {
		borderBottomWidth: verticalScale(1),
		borderColor: neutral.grey_05,
	},
	slider: {
		alignSelf: "center",
		backgroundColor: neutral.grey_04,
		borderRadius: verticalScale(100),
		height: verticalScale(4),
		marginBottom: verticalScale(20),
		width: horizontalScale(64),
	},
	text: {
		...medium,
		...md,
		color: neutral.grey_08,
		flex: 1,
	},
});
