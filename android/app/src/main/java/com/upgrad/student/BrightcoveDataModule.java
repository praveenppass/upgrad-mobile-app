package com.upgrad.student;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class BrightcoveDataModule extends ReactContextBaseJavaModule {

    private static ReactBrightcovePlayerView brightcovePlayerView;

    public BrightcoveDataModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public static void setPlayerView(ReactBrightcovePlayerView view) {
        brightcovePlayerView = view;
    }

    @Override
    public String getName() {
        return "BrightcoveDataModule";
    }

    @ReactMethod
    public void getVideoProgress(Promise promise) {
        if (brightcovePlayerView != null) {
            try {
                int progress = brightcovePlayerView.getCurrentProgress();
                promise.resolve(progress);
            } catch (Exception e) {
                promise.reject("ERROR", "Error getting video progress: " + e.getMessage());
            }
        } else {
            promise.reject("NO_VIEW", "BrightcovePlayerView is null");
        }
    }

}
