#!/bin/bash

# Source shared config (defines APP_OPTIONS, ENVIRONMENT_OPTIONS, PLATFORM_OPTIONS, ANDROID_VERSION, IOS_VERSION)
source "$(dirname "$0")/codepush-config.sh"

# Banner function is now defined in shared config (codepush-config.sh)

# App Selection
OPTIONS=("${APP_OPTIONS[@]}")
SELECTED=0
while true; do
    display_menu "📱 Select an app:"
    read_key
done
APPNAME=${OPTIONS[$SELECTED]}

# Use ENVIRONMENT from config
# Access Check
echo "🔍 Checking access permissions for $APPNAME..."
if code-push-standalone deployment list "$APPNAME" > /dev/null 2>&1; then
    echo "✅ You have access to deploy on $APPNAME."
else
    echo -e "\033[1;31m❌ ERROR: You do not have access to deploy on $APPNAME!\033[0m"
    exit 1
fi

# Platform Selection
OPTIONS=("${PLATFORM_OPTIONS[@]}")
SELECTED=0
while true; do
    display_menu "📡 Select a platform:"
    read_key
done
PLATFORM=${OPTIONS[$SELECTED]}

# Target Version Selection
if [[ "$PLATFORM" == "android" ]]; then
    VERSION_OPTIONS=("Auto-detect from gradle.properties" "Custom Version")
elif [[ "$PLATFORM" == "ios" ]]; then
    VERSION_OPTIONS=("Auto-detect from Info.plist" "Custom Version")
else
    echo -e "\033[1;31m❌ ERROR: Unknown platform '$PLATFORM'\033[0m"
    exit 1
fi

OPTIONS=("${VERSION_OPTIONS[@]}")
SELECTED=0
while true; do
    display_menu "🎯 Select target binary version:"
    read_key
done
VERSION_CHOICE=${OPTIONS[$SELECTED]}

# Determine final target version
if [[ "$VERSION_CHOICE" == "Custom Version" ]]; then
    clear
    welcome_banner
    echo "✍️ Enter custom target binary version (semver format, e.g., 0.3.26):"
    read TARGET_VERSION
elif [[ "$VERSION_CHOICE" == "Auto-detect from gradle.properties" ]]; then
    GRADLE_PROPS_PATH="./android/gradle.properties"
    TARGET_VERSION=$(grep VERSION_NAME "$GRADLE_PROPS_PATH" | cut -d '=' -f2 | tr -d '[:space:]')
    echo "🔍 Auto-detected Android version: $TARGET_VERSION"
elif [[ "$VERSION_CHOICE" == "Auto-detect from Info.plist" ]]; then
    INFO_PLIST_PATH="./ios/lexMobileApp/Info.plist"
    TARGET_VERSION=$(/usr/libexec/PlistBuddy -c "Print CFBundleShortVersionString" "$INFO_PLIST_PATH")
    # If it's a variable, get the actual value
    if [[ "$TARGET_VERSION" == "\$(MARKETING_VERSION)" ]]; then
        TARGET_VERSION=$(grep -r "MARKETING_VERSION" ios/lexMobileApp.xcodeproj/project.pbxproj | head -1 | cut -d'=' -f2 | tr -d '; ')
    fi
    echo "🔍 Auto-detected iOS version: $TARGET_VERSION"
fi

# Validate semver format
if [[ ! "$TARGET_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] && [[ "$TARGET_VERSION" != "*" ]]; then
    echo -e "\033[1;31m❌ ERROR: Invalid semver format '$TARGET_VERSION'. Use format like '0.3.26' or '*'\033[0m"
    exit 1
fi

# Prompt for OTA description
clear
welcome_banner
echo "✍️ Enter release OTA description:"
read DESCRIPTION

# Deployment summary
clear
welcome_banner
echo -e "\033[1;33m=============================================\033[0m"
echo -e "\033[1;32m  🚀 CODE PUSH DEPLOYMENT SUMMARY            \033[0m"
echo -e "\033[1;33m=============================================\033[0m"
echo "📱 App: $APPNAME"
echo "🌍 Environment: $ENVIRONMENT"
echo "📡 Platform: $PLATFORM"
echo "🎯 Target Binary Version: $TARGET_VERSION"
echo "✍️ Description: $DESCRIPTION"
echo -e "\033[1;33m=============================================\033[0m"

echo "⚡ Deploying OTA..."
sleep 1

# Change to project root directory (parent of patches folder)
cd "$(dirname "$0")/.."

# Execute CodePush Release using release-react (without problematic bundleName parameter)
if code-push-standalone release-react "$APPNAME" "$PLATFORM" \
  --deploymentName "$ENVIRONMENT" \
  --description "$DESCRIPTION" \
  --targetBinaryVersion "$TARGET_VERSION" \
  --disabled; then

  echo ""
  echo -e "\033[1;32m✅ Deployment completed successfully!\033[0m"
  echo "🚀 To release this update to all users, run:"
  echo -e "\033[1;36m  npm run code_push-standalone:patch\033[0m"

else
  echo ""
  echo -e "\033[1;31m❌ Deployment failed! Check bundle name, binary version, or file permissions.\033[0m"
  exit 1
fi
