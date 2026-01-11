#!/bin/bash
 
# Source the common configuration
source "$(dirname "$0")/codepush-config.sh"

# Using shared display_menu function from codepush-config.sh

# Using shared welcome banner from codepush-config.sh
 
# Select App Name
OPTIONS=("${APP_OPTIONS[@]}")
SELECTED=0
while true; do
    display_menu "📱  Select an App:"
    read_key
done
APPNAME=${OPTIONS[$SELECTED]}

# Use ENVIRONMENT from config
# Check access to the selected app
echo ""
echo "🔍 Checking access permissions for $APPNAME in $ENVIRONMENT..."
if code-push-standalone deployment list "$APPNAME" > /dev/null 2>&1; then
    echo "✅ You have access to deploy on $APPNAME."
else
    echo "❌ ERROR: You do not have access to deploy on $APPNAME!"
    exit 1
fi

# Select Mandatory Update (true/false)
OPTIONS=("${BOOLEAN_OPTIONS[@]}")
SELECTED=0
while true; do
    display_menu "🔄  Is this a Mandatory Update?"
    read_key
done
MANDATORY=${OPTIONS[$SELECTED]}
 
# Select Disabled Update (true/false)
OPTIONS=("${BOOLEAN_OPTIONS[@]}")
SELECTED=0
while true; do
    display_menu "🚫  Is this a Disabled Update?"
    read_key
done
DISABLED=${OPTIONS[$SELECTED]}
 
# Fetch last 5 deployments
clear
welcome_banner
echo "📡  Fetching last 5 deployments for **$APPNAME** in **$ENVIRONMENT**..."
echo "===================================================================================================================================================================================="
FULL_HISTORY=$(code-push-standalone deployment history "$APPNAME" "$ENVIRONMENT")
HEADER=$(echo "$FULL_HISTORY" | head -n 2)
LAST_5_ENTRIES=$(echo "$FULL_HISTORY" | awk 'NR>2 && !/^├|─|│ Deployment Key/' | tail -n 5)
echo ""
echo "$HEADER"
echo "-----------------------------------------------------------------------------------------------------------"
echo "$LAST_5_ENTRIES"
echo "-----------------------------------------------------------------------------------------------------------"
 
# Enter Label manually
echo ""
read -p "✍️  Enter Label (e.g., v**): " LABEL
 
# Run the CodePush patch command
echo ""
echo "⚡  Patching deployment..."
echo "===================================================================================================================================================================================="
code-push-standalone patch "$APPNAME" "$ENVIRONMENT" -l "$LABEL" --mandatory "$MANDATORY" --disabled "$DISABLED"
 
# Fetch and display the updated history
echo ""
echo "📡  Fetching updated deployment history..."
UPDATED_HISTORY=$(code-push-standalone deployment history "$APPNAME" "$ENVIRONMENT")
UPDATED_HEADER=$(echo "$UPDATED_HISTORY" | head -n 2)
UPDATED_LAST_5_ENTRIES=$(echo "$UPDATED_HISTORY" | awk 'NR>2 && !/^├|─|│ Deployment Key/' | tail -n 5)
echo "===================================================================================================================================================================================="
echo ""
echo "$UPDATED_HEADER"
echo "-----------------------------------------------------------------------------------------------------------"
echo "$UPDATED_LAST_5_ENTRIES"
echo "-----------------------------------------------------------------------------------------------------------"
 
echo ""
echo "✅  Deployment patched successfully! 🚀"
echo ""
