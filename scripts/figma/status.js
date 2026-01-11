#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const cursorConfigPath = path.join(projectRoot, ".cursor", "mcp_servers.json");

console.log("🎨 Figma MCP Status Check\n");

// Check if .cursor/mcp_servers.json exists
if (!fs.existsSync(cursorConfigPath)) {
	console.log("❌ Cursor MCP configuration not found");
	console.log("🚀 Run: npm run figma:setup");
	process.exit(1);
}

try {
	// Read and parse configuration
	const config = JSON.parse(fs.readFileSync(cursorConfigPath, "utf8"));

	// Check if Figma MCP server is configured
	if (!config.mcpServers || !config.mcpServers["Framelink Figma MCP"]) {
		console.log("❌ Figma MCP not configured in Cursor");
		console.log("🚀 Run: npm run figma:setup");
		process.exit(1);
	}

	const figmaServer = config.mcpServers["Framelink Figma MCP"];
	const metadata = config._figma_mcp_metadata || {};

	console.log("✅ Figma MCP Configuration Found");
	console.log(
		`   Status: ${figmaServer.enabled !== false ? "🟢 Enabled" : "🔴 Disabled"}`,
	);
	console.log(
		`   Setup Date: ${new Date(figmaServer.setupDate || metadata.setupDate).toLocaleDateString()}`,
	);
	console.log(`   Server: ${figmaServer.command} ${figmaServer.args[1]}`);
	console.log(`   Configuration: ${cursorConfigPath}`);

	// Check if token is present in args
	const tokenArg = figmaServer.args.find((arg) =>
		arg.startsWith("--figma-api-key="),
	);
	if (tokenArg) {
		const tokenPreview = tokenArg.substring(0, 25) + "...";
		console.log(`   Token: ${tokenPreview}`);
	} else {
		console.log("   Token: ❌ Not found");
	}

	console.log("\n🛠️  Management Commands:");
	console.log("   • npm run figma:disable - Disable integration");
	console.log("   • npm run figma:enable  - Enable integration");
	console.log("   • npm run figma:setup   - Reconfigure integration");

	console.log("\n📖 Usage:");
	console.log("   1. Copy Figma frame link");
	console.log('   2. Ask AI: "Implement this Figma frame [link]"');
} catch (error) {
	console.error("❌ Error reading Cursor MCP configuration:", error.message);
	console.log("🚀 Try running: npm run figma:setup");
	process.exit(1);
}
