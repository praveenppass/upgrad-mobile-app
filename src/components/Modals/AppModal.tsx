import React from "react";
import { C } from "@assets/constants";
import measures from "@utils/measures";
import ModalHeader from "@components/Reusable/ModalHeader";
import { IApModalParams, IModalName } from "@interface/app.interface";
import { ModalComponentWithOptions, ModalProps } from "react-native-modalfy";
import {
	View,
	SafeAreaView,
	StyleSheet,
} from "react-native";

const {
	themes: { primary },
} = C;

const {
	BORDER: { b16 },
	SCREEN_WIDTH,
	SCREEN_HEIGHT
} = measures;

type IAppModalViewType = ModalProps<IModalName.AppModalView>;

const AppModalView: ModalComponentWithOptions<IAppModalViewType> = (props) => {
	const { height, title, children, isHeaderShadow } = props.modal
		?.params as IApModalParams;
	return (
		<SafeAreaView>
			<View
				style={[
					styles.modalView,
					{
						width: SCREEN_WIDTH * 0.9,
						maxHeight: height ?? SCREEN_HEIGHT * 0.8,
					},
				]}
			>
				<ModalHeader
					title={title ?? ""}
					isShadow={isHeaderShadow ?? false}
				/>
				{children}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	modalView: {
		zIndex: -1,
		borderRadius: b16,
		backgroundColor: primary.color2,
	},
});

export default AppModalView;
