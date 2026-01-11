# 🎨 Figma MCP Integration - Quick Reference

## 🚀 One-Line Setup

```bash
npm run figma:setup
```

That's it! The setup script (`scripts/figma/setup.js`) will guide you through the entire process and configure Cursor directly.

## 📋 What You Need

1. **Figma Account** with access to designs
2. **Figma Access Token** (script will guide you)
3. **Cursor IDE** (with MCP support)

## 🔗 Getting Your Figma Token

1. Open Figma → Click profile icon → **Settings**
2. Go to **Security** tab
3. Scroll to **Personal access tokens**
4. Click **Generate new token**
5. Name it (e.g., "Cursor MCP Integration")
6. Enable these permissions:
    - ✅ **File content**
    - ✅ **Dev resources**
7. Click **Generate token**
8. Copy the token (you'll paste it in the setup script)

## 💻 Using the Integration

### Step 1: Copy Figma Link

- Right-click any Figma frame or group
- Select **Copy/Paste as** → **Copy link to selection**

### Step 2: Ask AI to Implement

In Cursor, prompt the AI with:

```
"Implement this Figma frame: [paste your link here]"
```

### Step 3: Get Your Component

The AI will:

- Fetch design data from Figma
- Generate React Native component
- Include proper styling
- Match your design specifications

## 🛠️ Management Commands

| Command                | Purpose                         | Script Location           |
| ---------------------- | ------------------------------- | ------------------------- |
| `npm run figma:status` | Check if integration is working | `scripts/figma/status.js` |

### Direct Script Usage

```bash
# You can also run scripts directly
node scripts/figma/setup.js
node scripts/figma/status.js
```

## 🔧 How It Works

The setup script:

1. Prompts for your Figma access token
2. Directly configures `.cursor/mcp_servers.json` with your token
3. No separate configuration files needed
4. Token is securely embedded in Cursor's MCP configuration

**Simple file structure:**

```
├── .cursor/
│   └── mcp_servers.json    # Cursor MCP config with Figma token
└── scripts/figma/          # Management scripts
```

## 🚨 Troubleshooting

### "Token not found" error

- Check that `.figma.mcp` file exists
- Verify token is correctly formatted (no extra spaces)
- Run `npm run figma:status` to check configuration

### "MCP server not responding"

- Restart Cursor completely
- Check that `.cursor/mcp_servers.json` exists
- Verify your internet connection

### "Permission denied" on Figma designs

- Ensure you have access to the Figma file
- Check that your token has "File content" permission
- Try with a file you own

## 💡 Pro Tips

- **Work with sections**: Copy individual frames/groups for better results
- **Provide context**: Tell the AI what type of component you want (screen, button, card)
- **Specify platform**: Mention "React Native" for mobile-optimized code
- **Iterate**: Ask for refinements after initial generation

## 🔒 Security Notes

- `.figma.mcp` is automatically added to `.gitignore`
- Your token stays on your local machine
- Each team member needs their own token
- Tokens can be revoked anytime in Figma settings

## 📞 Need Help?

1. Check this guide first
2. Run `npm run figma:status` to diagnose issues
3. Try the manual setup steps
4. Check [Framelink documentation](https://www.framelink.ai/docs/quickstart)

---

**Happy designing! 🎨✨**
