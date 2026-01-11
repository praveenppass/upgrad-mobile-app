import { C } from "@assets/constants";
import measures from "@utils/measures";
import { DismissIcon, SearchLxp } from "@assets/icons";
import React, { forwardRef, memo, type Ref } from "react";
import { moderateScale, verticalScale } from "@utils/functions";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { SearchInputProps } from "@interface/SearchInputProps";
import { colors } from "@assets/colors";

const {
	themes: { text, primary },
	commonStyles: {
		spacing: { g6, p10, m4 },
		align: { rowStart, selfCenter, flex1 },
		text: { md },
	},
} = C;

const { BORDER } = measures;

const SearchTextInput = forwardRef(
	(
		{
			value,
			editable,
			onSubmit,
			placeholder,
			keyboardType,
			returnKeyType,
			textInputStyle,
			autoCapitalize,
			autoFocus,
			onBlur,
			onInputHandler,
			selectTextOnFocus,
			inputContainerStyle,
			placeholderTextColor,
			showClearBtn,
			onClear,
		}: SearchInputProps,
		ref: Ref<TextInput>,
	) => {
		return (
			<View
				style={[
					rowStart,
					styles.inputContainer,
					selfCenter,
					p10,
					g6,
					inputContainerStyle,
				]}
			>
				<SearchLxp />
				<TextInput
					ref={ref}
					value={value}
					maxLength={50}
					autoFocus={autoFocus}
					autoCorrect={true}
					editable={editable}
					allowFontScaling={false}
					placeholder={placeholder}
					onBlur={onBlur}
					onSubmitEditing={onSubmit}
					keyboardType={keyboardType}
					onChangeText={onInputHandler}
					returnKeyType={returnKeyType}
					autoCapitalize={autoCapitalize}
					placeholderTextColor={placeholderTextColor || text.darkBlue}
					selectTextOnFocus={selectTextOnFocus}
					style={[flex1, textInputStyle, styles.input]}
					onClear={onClear}
				/>
				{showClearBtn ? (
					<TouchableOpacity onPress={onClear}>
						<DismissIcon
							width={moderateScale(18)}
							height={moderateScale(18)}
							color={colors.neutral.grey_06}
						/>
					</TouchableOpacity>
				) : null}
			</View>
		);
	},
);

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		paddingTop: 0,
		borderWidth: 1,
		paddingBottom: 0,
		borderRadius: BORDER.b2,
		height: verticalScale(55),
		borderColor: primary.color2,
		backgroundColor: primary.color2,
	},
	input: {
		height: "100%",
		color: text.darkBlue,
		...md,
	},
});

export default memo(SearchTextInput);
