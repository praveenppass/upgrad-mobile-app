#!/bin/bash
 
# Source the common configuration
source "$(dirname "$0")/codepush-config.sh"

# Override read_key function for this script (different behavior)
read_key() {
    read -rsn1 key
    case "$key" in
        $'\e') # Escape sequence
            read -rsn2 key
            case "$key" in
                '[A') # Up arrow
                    ((SELECTED--))
                    if [ "$SELECTED" -lt 0 ]; then
                        SELECTED=0  # Prevent going below the first option
                    fi
                    ;;
                '[B') # Down arrow
                    ((SELECTED++))
                    if [ "$SELECTED" -ge "${#OPTIONS[@]}" ]; then
                        SELECTED=$((${#OPTIONS[@]} - 1))  # Prevent going beyond the last option
                    fi
                    ;;
            esac
            ;;
        '') # Enter key
            break
            ;;
    esac
}
 
# Select App Name
OPTIONS=("${APP_OPTIONS[@]}")
SELECTED=0
while true; do
    display_menu "📱 Select an app:"
    read_key
done
APPNAME=${OPTIONS[$SELECTED]}

# Use ENVIRONMENT from config
# Display fetching message
clear
welcome_banner
echo "============================================="
echo "Fetching deployments history for $APPNAME in $ENVIRONMENT..."
echo "============================================="
 
# Fetch full history
FULL_HISTORY=$(code-push-standalone deployment history "$APPNAME" "$ENVIRONMENT")
 
# Display the fetched history
echo "$FULL_HISTORY"
 
# Final message
echo "============================================="
echo "✅ Fetching completed successfully!"
echo "============================================="