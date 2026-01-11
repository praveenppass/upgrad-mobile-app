#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.log("🎨 Framelink Figma MCP Setup for Cursor\n");

// Define paths relative to project root
const projectRoot = process.cwd();
const cursorDir = path.join(projectRoot, ".cursor");
const cursorConfigPath = path.join(cursorDir, "mcp_servers.json");

// Check if Figma MCP is already configured
if (fs.existsSync(cursorConfigPath)) {
	try {
		const config = JSON.parse(fs.readFileSync(cursorConfigPath, "utf8"));
		if (config.mcpServers && config.mcpServers["Framelink Figma MCP"]) {
			console.log("⚠️  Figma MCP is already configured in Cursor");
			rl.question("Do you want to reconfigure it? (y/N): ", (answer) => {
				if (answer.toLowerCase() === "y") {
					setupFigmaMCP();
				} else {
					console.log("Setup cancelled.");
					rl.close();
				}
			});
			return;
		}
	} catch (e) {
		// Config file exists but is invalid, continue with setup
		console.log("⚠️  Found invalid MCP config, will recreate");
	}
}

setupFigmaMCP();

function setupFigmaMCP() {
	console.log("\n📋 First, get your Figma access token:");
	console.log("1. Go to Figma → Profile → Settings → Security tab");
	console.log('2. Scroll to "Personal access tokens"');
	console.log('3. Click "Generate new token"');
	console.log('4. Enable "File content" and "Dev resources" permissions');
	console.log("5. Copy the generated token\n");

	rl.question("Enter your Figma access token: ", (token) => {
		if (!token.trim()) {
			console.log("❌ Token cannot be empty");
			rl.close();
			return;
		}

		try {
			// Create or update Cursor MCP configuration directly
			setupCursorMCP(token.trim());

			console.log("\n🎉 Setup complete! Restart Cursor to apply changes.");
			console.log("\n📖 Usage:");
			console.log(
				"1. Copy a Figma frame/group link (Right-click → Copy/Paste as → Copy link)",
			);
			console.log(
				'2. In Cursor, ask: "Implement this Figma frame [paste link]"',
			);
			console.log(
				"3. The AI will automatically fetch and implement the design",
			);
			console.log("\n🛠️  Management Commands:");
			console.log("   • npm run figma:status  - Check integration status");
			console.log("   • npm run figma:disable - Disable integration");
			console.log("   • npm run figma:enable  - Enable integration");
		} catch (error) {
			console.error("❌ Error setting up Figma MCP:", error.message);
		}

		rl.close();
	});
}

function setupCursorMCP(figmaToken) {
	// Create .cursor directory if it doesn't exist
	if (!fs.existsSync(cursorDir)) {
		fs.mkdirSync(cursorDir);
		console.log("✅ Created .cursor directory");
	}

	let mcpConfig = {};

	// Read existing MCP config if it exists
	if (fs.existsSync(cursorConfigPath)) {
		try {
			mcpConfig = JSON.parse(fs.readFileSync(cursorConfigPath, "utf8"));
			console.log("📖 Found existing MCP configuration");
		} catch (error) {
			console.log("⚠️  Error reading existing MCP config, creating new one");
			mcpConfig = {};
		}
	}

	// Initialize mcpServers if it doesn't exist
	if (!mcpConfig.mcpServers) {
		mcpConfig.mcpServers = {};
	}

	// Add Framelink Figma MCP server with token directly embedded
	mcpConfig.mcpServers["Framelink Figma MCP"] = {
		command: "npx",
		args: [
			"-y",
			"figma-developer-mcp",
			`--figma-api-key=${figmaToken}`,
			"--stdio",
		],
		env: {
			NODE_ENV: "production",
		},
		enabled: true,
		setupDate: new Date().toISOString(),
	};

	// Add metadata for management scripts
	if (!mcpConfig._figma_mcp_metadata) {
		mcpConfig._figma_mcp_metadata = {
			version: "1.0.0",
			setupDate: new Date().toISOString(),
			managedBy: "lex-mobile-app/scripts/figma",
		};
	}

	try {
		fs.writeFileSync(cursorConfigPath, JSON.stringify(mcpConfig, null, 2));
		console.log("✅ Cursor MCP configuration updated");
		console.log(`📁 Configuration saved to: ${cursorConfigPath}`);
	} catch (error) {
		console.error("❌ Error updating Cursor MCP config:", error.message);
		throw error;
	}
}

// Handle process termination gracefully
process.on("SIGINT", () => {
	console.log("\n\n👋 Setup cancelled by user");
	rl.close();
	process.exit(0);
});
