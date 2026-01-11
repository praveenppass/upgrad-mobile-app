import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import RNText from "../RNText";
import { C } from "@assets/constants";
import { radioBtnAccountStyles as styles } from "./RadioButtonStyles";

interface IRadioOption {
	label: string;
	value: string;
}

interface IRadioButtonProps {
	options: IRadioOption[];
	selectedValue: string | null;
	onValueChange: (value: string) => void;
}

const {
	themes: { text, primary },
	commonStyles: {
		spacing: { ml2 },
	},
} = C;

const RadioButton: React.FC<IRadioButtonProps> = ({
	options,
	selectedValue,
	onValueChange,
}) => {
	return (
		<View style={ml2}>
			{options.map((option) => (
				<TouchableOpacity
					key={option.value}
					style={styles.optionContainer}
					onPress={() => onValueChange(option.value)}
				>
					<View
						style={[
							styles.radioButton,
							{
								backgroundColor:
									selectedValue === option.value
										? text.drkOrange
										: primary.color2,
								borderColor:
									selectedValue === option.value
										? text.drkOrange
										: text.steelBlue,
							},
						]}
					/>
					<RNText title={option.label} style={styles.optionText} />
				</TouchableOpacity>
			))}
		</View>
	);
};

export default memo(RadioButton);
