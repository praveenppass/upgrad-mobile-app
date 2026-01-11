// import { themes } from "@assets/themes";
// import { StyleSheet } from "react-native";

// const { primary } = themes;

// const bottomTabStyles = StyleSheet.create({
// 	barStyle: {
// 		elevation: 5,
// 		borderTopWidth: 0.1,
// 		borderTopColor: primary.color3,
// 		backgroundColor: primary.color2,
// 		position: "absolute",
// 		shadowOffset: { width: 0, height: 6 },
// 		shadowOpacity: 1,
// 		shadowRadius: 6,
// 	},
// });

// export default bottomTabStyles;
import { themes } from "@assets/themes";
import { StyleSheet } from "react-native";
 
const { primary } = themes;
 
const bottomTabStyles = StyleSheet.create({
	barStyle: {
		elevation: 5,
		borderTopWidth: 0.1,
		borderTopColor: primary.color3,
		backgroundColor: primary.color2,
		position: "absolute",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 1,
		shadowRadius: 6,
	},
	bottomTabStyle: {
		elevation: 5,
		borderTopWidth: 0.1,
		borderTopColor: primary.color3,
		backgroundColor: primary.color2,
		position: "absolute",
		justifyContent: 'center',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 1,
		shadowRadius: 6,
		// Set fixed height
		height: 60, // Adjust this value as needed
		// Alternatively, use padding for dynamic height
		// paddingVertical: 10,
		// borderWidth: 2, // Optional debugging line
		// borderColor: "red", // Optional debugging line
	},
});
 
export default bottomTabStyles;
