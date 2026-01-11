import React, { memo } from "react";
import { View } from "react-native";

interface ISpacer {
	width: number;
}

const Spacer = ({ width }: ISpacer) => <View style={{ width }} />;

export default memo(Spacer);
