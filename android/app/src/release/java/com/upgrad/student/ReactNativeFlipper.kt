package com.upgrad.student

import android.content.Context
import com.facebook.react.ReactInstanceManager

/**
 * No-op implementation of ReactNativeFlipper for release builds.
 * Prevents Flipper initialization in release builds while maintaining compatibility.
 */
object ReactNativeFlipper {
    /**
     * Empty implementation to prevent Flipper initialization in release builds.
     */
    @JvmStatic
    fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
        // Do nothing as we don't want to initialize Flipper on Release.
    }
} 