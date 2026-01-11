#!/bin/bash

# CodePush Configuration File
# This file contains all the common OPTIONS used across CodePush scripts

# App Names OPTIONS
APP_OPTIONS=("upGrad-android-prod" "upGrad-android-stage" "upGrad-iOS-prod" "upGrad-iOS-stage")

# Environment (default to Production)
ENVIRONMENT="Production"

# Platform OPTIONS
PLATFORM_OPTIONS=("android" "ios")

# Boolean OPTIONS (for mandatory/disabled updates)
BOOLEAN_OPTIONS=("true" "false")

# Function to display the welcome banner
welcome_banner() {
    echo -e "\033[1;36m"
    echo "   ____          _      ____            _       "
    echo "  / ___|___   __| | ___|  _ \\ _   _ ___| |__    "
    echo " | |   / _ \\ / _\` |/ _ \\ |_) | | | / __| '_ \\   "
    echo " | |__| (_) | (_| |  __/  __/| |_| \\__ \\ | | |  "
    echo "  \\____\\___/ \\__,_|\\___|_|    \\__,_|___/_| |_|  "
    echo "                                                "
    echo "        🚀 CodePush OTA Release Utility v2.0"
    echo -e "\033[0m"
}

# Function to display the menu
display_menu() {
    clear
    welcome_banner  # Display banner at the top of each menu
    echo "$1"
    echo "============================================="
    for i in "${!OPTIONS[@]}"; do
        if [ "$i" -eq "$SELECTED" ]; then
            echo "👉 ${OPTIONS[$i]}"
        else
            echo "   ${OPTIONS[$i]}"
        fi
    done
    echo "============================================="
}

# Function to handle key presses
read_key() {
    read -rsn1 key
    case "$key" in
        $'\e') # Escape sequence
            read -rsn2 key
            case "$key" in
                '[A') # Up arrow
                    ((SELECTED--))
                    if [ "$SELECTED" -lt 0 ]; then
                        SELECTED=$((${#OPTIONS[@]} - 1))
                    fi
                    ;;
                '[B') # Down arrow
                    ((SELECTED++))
                    if [ "$SELECTED" -ge "${#OPTIONS[@]}" ]; then
                        SELECTED=0
                    fi
                    ;;
            esac
            ;;
        '') # Enter key
            break
            ;;
    esac
} 