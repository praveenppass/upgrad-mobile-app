import React from "react";
import { Pressable, View } from "react-native";

import { IExtensionModalButtons } from "@components/moduleExtension/common/index.interface";
import styles from "@components/moduleExtension/common/index.style";
import RNText from "@components/Reusable/RNText";

import { strings } from "@assets/strings";

const ExtensionModalButtons = ({
	acceptHandler,
	rejectHandler,
}: IExtensionModalButtons) => {
	return (
		<View style={styles.buttonContainer}>
			<Pressable style={styles.btn} onPress={rejectHandler}>
				<RNText
					title={strings.NO}
					style={[styles.btnText, styles.rejectBtnText]}
				/>
			</Pressable>
			<Pressable
				style={[styles.btn, styles.acceptBtn]}
				onPress={acceptHandler}
			>
				<RNText
					title={strings.YES}
					style={[styles.btnText, styles.acceptBtnText]}
				/>
			</Pressable>
		</View>
	);
};

export default ExtensionModalButtons;
