import { StyleSheet } from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { commonStyles } from "@assets/styles";

const {
	colors: { neutral },
} = C;

const { md, lg } = commonStyles.text;

export const quizStyles = StyleSheet.create({
	activeItem: {
		backgroundColor: "#d3d3d3",
	},
	assessmentIcon: {
		zIndex: 1,
	},
	// attemptText: {
	// 	fontSize: 16,
	// 	fontWeight: "400",
	// },
	backgroundIcon: {
		height: "100%",
		position: "relative",
		top: 60,
		width: "100%",
	},
	boxContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
		width: "70%",
	},
	container: {
		alignItems: "center",
		flexDirection: "row",
		gap: 5,
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	containerBoxes: {
		alignItems: "center",
		gap: verticalScale(20),
		justifyContent: "flex-end",
		width: "100%",
	},
	correctOption: {
		backgroundColor: colors.state.success_light_green,
		borderColor: colors.state.success_green,
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 10,
		padding: 15,
	},
	feedbackText: {
		flexWrap: "wrap",
		marginLeft: 4,
		width: "85%",
	},
	feedbackView: {
		backgroundColor: "white",
		borderRadius: verticalScale(10),
		elevation: 2,
		height: "auto",
		marginBottom: "7%",
		marginHorizontal: "5%",
		paddingVertical: 8,
		width: "90%",
	},
	finishButtonStyle: {
		backgroundColor: neutral.white,
		borderColor: neutral.black,
		borderWidth: 1,
	},
	flex: { flex: 1 },
	highlightCorrectOption: {
		borderColor: colors.state.success_green,
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 10,
		padding: 15,
	},
	hint: {
		alignItems: "flex-end",
		alignSelf: "flex-start",
		flexGrow: 1,
	},
	iconContainer: {
		alignItems: "center",
		height: "10%",
		justifyContent: "center",
		position: "relative",
		top: 5,
		width: "100%",
	},
	iconTextContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: 5,
		marginHorizontal: "4%",
		width: "80%",
	},
	infoBox: {
		alignItems: "center",
		borderColor: "black",
		borderRadius: 5,
		borderWidth: 1,
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		marginHorizontal: horizontalScale(10),
		padding: 5,
	},
	// infoBoxText1: {
	// 	color: neutral.black,
	// 	fontSize: 16,
	// 	fontWeight: "bold",
	// },
	// infoBoxText2: {
	// 	color: neutral.grey_07,
	// 	fontSize: 16,
	// 	fontWeight: "bold",
	// },
	label: {
		color: neutral.grey_07,
		fontWeight: "bold",
	},
	labelWrapper: {
		backgroundColor: neutral.grey_03,
		left: 16,
		paddingHorizontal: 8,
		paddingVertical: 4,
		position: "absolute",
		top: -12,
	},
	leftContainer: {
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
		gap: 5,
		justifyContent: "flex-start",
	},
	modalButtonText1: {
		color: neutral.white,
		fontWeight: "bold",
	},
	modalButtonText2: {
		color: neutral.black,
		flexGrow: 1,
		fontWeight: "bold",
	},
	modalContent: {
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		height: "50%",
		justifyContent: "space-between",
		padding: 20,
		width: "100%",
	},
	modalFullWidthButton: {
		alignItems: "center",
		backgroundColor: neutral.black,
		borderRadius: 5,
		padding: 15,
		width: "100%",
	},
	modalImage: {
		height: 120,
		marginBottom: 20,
		width: "100%",
	},

	modalOverlay: {
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		flex: 1,
		justifyContent: "flex-end",
	},
	// modalText: {
	// 	fontSize: 18,
	// 	marginBottom: 20,
	// 	textAlign: "center",
	// },
	msqquestionView: {
		alignItems: "flex-start",
		display: "flex",
		flexDirection: "row",
		// gap: 10,
		// justifyContent: "space-between",
		justifyContent: "flex-end",
		width: "100%",
	},
	nextButton: {
		alignItems: "center",
		backgroundColor: "#007bff",
		borderRadius: 10,
		marginTop: 20,
		padding: 15,
	},
	// nextButtonText: {
	// 	color: "#fff",
	// 	fontSize: 18,
	// },
	option: {
		backgroundColor: "#f0f0f0",
		borderRadius: 10,
		marginVertical: 10,
		padding: 15,
	},
	optionButton: {
		backgroundColor: "#f0f0f0",
		borderColor: "#ddd",
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 10,
		padding: verticalScale(12),
	},
	optionText: {
		...md,
		maxWidth: "90%",
	},
	progressBarStyle: {
		backgroundColor: neutral.white,
	},
	// question: {
	// 	fontSize: 20,
	// 	fontWeight: "bold",
	// 	marginBottom: 20,
	// },
	questionContainer: {
		flex: 1,
		padding: 20,
	},
	questionHeading: {
		flexGrow: 20,
		justifyContent: "flex-start",
		rowGap: 1,
	},
	questionHeadingmsq: {
		// backgroundColor: "red",
		// flexGrow: 20,
		// justifyContent: "flex-start",
		// rowGap: 1,
		width: "85%",
		marginBottom: verticalScale(10),
	},
	questionLevelTimer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(5),
		marginHorizontal: "6%",
	},
	// questionMargin: { marginBottom: verticalScale(10) },
	// questionText: {
	// 	color: neutral.black,
	// 	fontSize: 16,
	// 	fontWeight: "bold",
	// 	minWidth: "85%",
	// 	paddingBottom: verticalScale(15),
	// 	paddingTop: verticalScale(10),
	// },
	questionView: {
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		marginVertical: verticalScale(15),
	},
	questionViewmsq: {
		alignItems: "center",
		borderColor: "green",
		borderWidth: 2,
		display: "flex",
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		marginVertical: verticalScale(15),
	},

	questioncontainer: {
		borderColor: neutral.grey_03,
		borderRadius: horizontalScale(10),
		borderWidth: 2,
		margin: 20,
		padding: 20,
	},
	reportText: {
		color: "#607290",
		textDecorationLine: "underline",
	},
	reportView: {
		alignItems: "flex-end",
		height: 40,
		justifyContent: "center",
		marginHorizontal: horizontalScale(15),
		padding: verticalScale(5),
		width: "90%",
	},
	reviewText: {
		color: neutral.grey_07,
		...md,
		fontWeight: "300",
		marginTop: 10,
		textAlign: "center",
	},
	safeAreaView: {
		backgroundColor: neutral.white,
		flex: 1,
	},
	scrollContainer: {
		flex: 1,
		marginBottom: verticalScale(55),
		width: "100%",
	},
	submitButton: {
		alignItems: "center",
		backgroundColor: "#007bff",
		borderRadius: 8,
		marginTop: 20,
		padding: 15,
	},
	// submitButtonText: {
	// 	color: "#fff",
	// 	fontSize: 16,
	// },
	// submitText: {
	// 	color: "#fff",
	// 	fontSize: 16,
	// 	fontWeight: "bold",
	// 	textAlign: "center",
	// },
	testStyle: {
		marginTop: verticalScale(60),
		maxWidth: "80%",
	},
	textFeedback: {
		flex: 1,
		marginHorizontal: "4%",
		marginTop: 4,
	},
	// timeLeftText: {
	// 	color: "#0A192B",
	// 	fontSize: 16,
	// 	fontWeight: "300",
	// 	marginBottom: 20,
	// 	textAlign: "center",
	// },
	title: {
		color: neutral.black,
		flexGrow: 1,
		...lg,
		fontWeight: "bold",
	},
	// unattemptedText: {
	// 	color: neutral.black,
	// 	fontSize: 20,
	// 	fontWeight: "600",
	// 	marginBottom: 10,
	// 	textAlign: "center",
	// },
	questionsSkeleton: {
		height: verticalScale(100),
		marginBottom: verticalScale(20),
		width: horizontalScale(330),
	},
	optionsSkeleton: {
		height: verticalScale(50),
		width: horizontalScale(330),
	},
	skeletonContainerView: {
		backgroundColor: neutral.grey_02,
		height: verticalScale(370),
		marginHorizontal: horizontalScale(10),
		marginVertical: verticalScale(30),
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(10),
		width: horizontalScale(350),
	},
	wrongOption: {
		backgroundColor: colors.state.error_light_red,
		borderColor: colors.state.error_red,
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 10,
		padding: 15,
	},
});
