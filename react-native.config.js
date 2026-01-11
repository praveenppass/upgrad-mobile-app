module.exports = {
	project: {
		ios: {},
		android: {},
	},
	assets: ["src/assets/fonts"],
	dependencies: {
		"react-native-vector-icons": {
			platforms: {
				ios: null,
			},
		},

		...Object.fromEntries(
			[
				"react-native-flipper",
				"react-native-mmkv-flipper-plugin",
				"redux-flipper",
			].map((pkg) => [pkg, { platforms: { ios: null } }]),
		),
	},
};
