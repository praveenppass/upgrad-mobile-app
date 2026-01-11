import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { LinkIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { sm, regular } = commonStyles.text;

interface IURLSubmissionSectionProps {
	visible: boolean;
	url: string | null;
	onUrlChange: (value: string) => void;
	onSave: () => void;
	disabled?: boolean;
	uploadTaskEnterUrl?: string | null;
}

const URLSubmissionSection: React.FC<IURLSubmissionSectionProps> = ({
	visible,
	url,
	onUrlChange,
	onSave,
	disabled = false,
	uploadTaskEnterUrl,
}) => {
	if (!visible) return null;

	return (
		<>
			<View style={styles.urlInputContainer}>
				<LinkIcon color={neutral.grey_07} />
				<RNText style={styles.urlTitle}>{strings.ADD_URL}</RNText>
			</View>
			<View style={styles.main}>
				<TextInput
					style={styles.textInput}
					value={url || ""}
					onChangeText={onUrlChange}
					placeholder={strings.ENTER_URL}
					placeholderTextColor={neutral.grey_06}
					editable={!disabled}
				/>

				<View style={styles.flex}>
					<CommonButton
						title={strings.SAVE}
						style={styles.btn}
						onPress={onSave}
						variant={IButtonVariant.Primary}
						isDisabled={!uploadTaskEnterUrl || disabled}
					/>
				</View>
			</View>
		</>
	);
};

export default URLSubmissionSection;

const styles = StyleSheet.create({
	btn: {
		borderBottomLeftRadius: 0,
		borderTopLeftRadius: 0,
		marginVertical: 0,
	},
	flex: {
		flex: 1,
	},
	main: {
		flexDirection: "row",
		marginHorizontal: horizontalScale(4),
		marginVertical: verticalScale(10),
	},
	textInput: {
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 0,
		borderColor: neutral.grey_05,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 0,
		borderWidth: 1,
		padding: horizontalScale(10),
		...sm,
		color: neutral.black,
		...regular,
		backgroundColor: neutral.white,
		flex: 2,
	},
	urlInputContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(10),
		marginTop: verticalScale(20),
		width: "100%",
	},
	urlTitle: {
		color: neutral.grey_07,
		...sm,
		fontWeight: "600",
		lineHeight: verticalScale(14),
		textAlign: "center",
	},
});
