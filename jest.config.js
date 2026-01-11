module.exports = {
	preset: "react-native",
	testMatch: ["**/src/**/*.test.(js|jsx|ts|tsx)"],
	transformIgnorePatterns: [
		"node_modules/(?!(react-native|@react-native|@react-native-firebase)/)",
	],
};
