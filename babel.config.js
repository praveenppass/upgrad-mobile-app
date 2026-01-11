/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require("child_process");

let commitId = "";
try {
	commitId = execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) {
	console.warn(
		"⚠️  Could not get git commit hash, using fallback:",
		e.message,
	);
}

module.exports = {
	compact: false, // or set to true to force compacting
	presets: ["module:@react-native/babel-preset"],
	plugins: [
		"react-native-reanimated/plugin",
		[
			"module-resolver",
			{
				root: ["./"],
				alias: {
					"@hoc": "./src/hoc",
					"@hooks": "./src/hooks",
					"@utils": "./src/utils",
					"@redux": "./src/redux",
					"@routes": "./src/routes",
					"@navigation": "./src/navigation",
					"@config": "./src/config",
					"@assets": "./src/assets",
					"@screens": "./src/screens",
					"@graphql": "./src/graphql",
					"@services": "./src/services",
					"@interface": "./src/interface",
					"@components": "./src/components",
					"@constants": "./src/constants",
					"@strings": "./src/strings",
					"@data": "./src/data",
					"@contexts": "./src/contexts",
				},
			},
		],
		["transform-define", { __COMMIT_ID__: commitId }],
	],
	env: { production: { plugins: ["react-native-paper/babel"] } },
};
