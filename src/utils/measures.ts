import { Dimensions } from "react-native";

const BORDER = {
	b0: 0,
	b05: 0.5,
	b1: 1,
	b2: 2,
	b4: 4,
	b6: 6,
	b7: 7,
	b8: 8,
	b10: 10,
	b11: 11,
	b12: 12,
	b13: 13,
	b14: 14,
	b15: 15,
	b16: 16,
	b17: 17,
	b18: 18,
	b20: 20,
	b31: 31,
	b36: 36,
	b90: 90,
};

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const measures = {
	BORDER,
	SCREEN_WIDTH,
	SCREEN_HEIGHT,
};

export default measures;
