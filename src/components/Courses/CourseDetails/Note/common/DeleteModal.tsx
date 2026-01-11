import React from "react";
import { Image, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";

interface IDeleteVariables {
	visible: boolean;
	onClose: (val: boolean) => void;
	handleModal: (val: boolean) => void;
	styles: any;
	deleteNote: () => void;
}

const DeleteModal = ({
	visible,
	onClose,
	styles,
	handleModal,
	deleteNote,
}: IDeleteVariables) => {
	return (
		<ConfirmationModal
			visible={visible}
			onClose={() => onClose(false)}
			bgColor={colors.state.warning_light_yellow}
		>
			<Image
				source={{ uri: IMAGE_URLS.WARNING }}
				style={styles.image}
				resizeMode="contain"
			/>
			<RNText
				title={strings.NOTE_DELETE_WARNING}
				style={styles.warningText}
			/>
			<RNText title={strings.RESTORE_WORNING} style={styles.warningTxt} />
			<View style={styles.btnContainer}>
				<CommonButton
					title={strings.NO}
					onPress={() => handleModal(false)}
					variant={IButtonVariant.Tertiary}
					style={styles.btnStyle}
				/>
				<CommonButton
					title={strings.YES}
					onPress={deleteNote}
					variant={IButtonVariant.Secondary}
					style={styles.btnStyle}
				/>
			</View>
		</ConfirmationModal>
	);
};

export default DeleteModal;
