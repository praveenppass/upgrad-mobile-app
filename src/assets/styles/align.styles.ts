import { StyleSheet } from "react-native";

const align = StyleSheet.create({
	absolute: {
		position: "absolute",
	},
	alignCenter: {
		alignItems: "center",
	},
	alignContentCenter: { alignContent: "center" },
	alignEnd: {
		alignItems: "flex-end",
	},
	column: {
		flexDirection: "column",
	},
	container: {
		alignSelf: "center",
		flex: 1,
		justifyContent: "center",
	},
	fWrap: {
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	fWrapped: { flexWrap: "wrap" },
	flex0: {
		flex: 0,
	},
	flex1: {
		flex: 1,
	},
	flex2: {
		flex: 2,
	},
	flex8: {
		flex: 8,
	},
	flexStart: {
		alignItems: "flex-start",
	},
	flexWrap: { flexWrap: "wrap" },
	itemStart: {
		alignItems: "flex-start",
		justifyContent: "center",
	},
	itemsCenter: {
		alignItems: "center",
		justifyContent: "center",
	},
	itemsEnd: {
		alignItems: "flex-end",
		justifyContent: "center",
	},
	justFlexStart: { justifyContent: "flex-start" },
	justStrt: { justifyContent: "flex-start" },
	justifyBetween: {
		justifyContent: "space-between",
	},
	justifyCenter: {
		justifyContent: "center",
	},
	justifyEnd: { justifyContent: "flex-end" },
	main: {
		flex: 1,
		paddingBottom: 0,
	},
	overFlowHidden: {
		overflow: "hidden",
	},
	relative: {
		position: "relative",
	},
	row: {
		flexDirection: "row",
	},
	rowAround: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
	},
	rowBetween: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rowBtw: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rowCenter: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	rowCntr: {
		alignItems: "center",
		flexDirection: "row",
	},
	rowEnd: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	rowEvenly: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	rowReverse: {
		flexDirection: "row-reverse",
	},
	rowStart: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	selfCenter: {
		alignSelf: "center",
	},
	selfEnd: {
		alignSelf: "flex-end",
	},
	selfStart: {
		alignSelf: "flex-start",
	},
	spaceAround: {
		justifyContent: "space-around",
	},
});

export default align;
