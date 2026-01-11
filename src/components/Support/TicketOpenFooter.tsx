import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AttachmentChip from "@components/Chips/AttachmentChip";
import CustomTextInput from "@components/Reusable/TextInput/CustomTextInput";

import { horizontalScale } from "@utils/functions";
import measures from "@utils/measures";

import { IAttachment } from "@interface/helpSupport.interface";

import { C } from "@assets/constants";
import { AttachIcon, SendIcon } from "@assets/icons";

const {
	strings,
	themes: { text, bg, border },
	commonStyles: {
		align: { rowBetween, itemsCenter, absolute, fWrap },
		spacing: { g6, p10, pt14, pl10, pr20, mb4 },
	},
} = C;

const {
	BORDER: { b90 },
} = measures;

interface ITicketOpenFooterProps {
	loader: boolean;
	onSend: () => void;
	inputValue: string;
	onMediaHandler: () => void;
	selectedAttachment: IAttachment[];
	onInputChange: (val: string) => void;
	onRemoveItem: (item: number) => void;
	onSubmit: () => void;
}

const TicketOpenFooter = ({
	onSend,
	loader,
	inputValue,
	onRemoveItem,
	onInputChange,
	onMediaHandler,
	onSubmit,
	selectedAttachment,
}: ITicketOpenFooterProps) => {
	const { bottom } = useSafeAreaInsets();
	const isDisabled = inputValue === "" ?? loader;
	const sendBtnStyle = StyleSheet.compose(
		styles.sendBtn,
		isDisabled && styles.disabledBtn,
	);
	const footerStyle = StyleSheet.compose(styles.openFooterCard, {
		paddingBottom: Platform.OS === "ios" ? bottom : bottom + 10,
	});

	return (
		<View style={footerStyle}>
			{selectedAttachment?.length > 0 && (
				<View style={styles.attachView}>
					{selectedAttachment?.map((attach, index) => {
						const onRemove = () => onRemoveItem(index);
						return (
							<AttachmentChip
								key={attach?.key}
								onRemoveTap={onRemove}
								title={attach?.name as string}
							/>
						);
					})}
				</View>
			)}

			<View style={styles.innerView}>
				<CustomTextInput
					value={inputValue}
					borderColor={border.color1}
					viewStyle={styles.viewStyle}
					onChangeText={onInputChange}
					inputStyle={styles.inputStyle}
					placeholder={strings.ENTER_MESSAGE}
					placeholderTextColor={bg.disabled}
					rightIcon={
						<TouchableOpacity
							onPress={onMediaHandler}
							style={styles.rightIconStyle}
						>
							<AttachIcon
								color={text.steelBlue}
								width={24}
								height={24}
							/>
						</TouchableOpacity>
					}
					onSubmitEditing={onSubmit}
				/>

				<TouchableOpacity
					onPress={onSend}
					style={sendBtnStyle}
					disabled={isDisabled}
				>
					<SendIcon />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TicketOpenFooter;

const styles = StyleSheet.create({
	attachView: {
		...g6,
		...mb4,
		...fWrap,
	},
	disabledBtn: {
		backgroundColor: bg.disabled,
	},
	innerView: {
		...g6,
		...rowBetween,
	},
	inputStyle: {
		borderRadius: b90,
		height: "100%",
		...(Platform.OS !== "ios" && pt14),
	},
	openFooterCard: {
		...g6,
		...p10,
		boxShadow: "0px -4px 0px rgba(0, 0, 0, 0.05)",
		width: "100%",
	},
	rightIconStyle: {
		right: 8,
		zIndex: 100,
		...absolute,
		...itemsCenter,
		borderBottomEndRadius: b90,
		borderTopEndRadius: b90,
		height: "100%",
		width: horizontalScale(40),
	},
	sendBtn: {
		...itemsCenter,
		backgroundColor: text.dark,
		borderRadius: b90,
		height: horizontalScale(40),
		width: horizontalScale(40),
	},
	viewStyle: {
		flex: 9,
		...pl10,
		...pr20,
		borderRadius: b90,
		height: horizontalScale(50),
	},
});
