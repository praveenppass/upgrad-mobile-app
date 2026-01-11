package com.upgrad.student;

import android.content.Context;

import com.brightcove.player.display.ExoPlayerVideoDisplayComponent;
import com.brightcove.player.display.VideoDisplayComponent;
import com.brightcove.player.view.BrightcoveExoPlayerVideoView;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.exoplayer2.ExoPlayer;

import android.util.Log;
import android.view.TextureView;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.Nullable;

import java.util.ArrayList;

public class ReactBrightcovePlayerView extends BrightcoveExoPlayerVideoView {
    public String accountId;
    public String policyKey;
    public String videoId, lastLoadedVideoId;
    public int seekTime = 0, transcriptSeekTime = 0;
    private ArrayList<Integer> pauseVideoTimes = new ArrayList<>();

    public ViewGroup originalParent = null, originalLayoutParams= null;
    public int originalIndex = -1;
    public ArrayList<String> brightcoveVideoIds = new ArrayList<>();
    public ArrayList<String> transcriptTimeList = new ArrayList<>();
    public boolean isFromLandscape = false,moveToPortrait = false,isVideoWatched = false , isVideoInterrupted=false;

    public int mute = 0, videoProgress = 0;
    public String audioTrack = "en",playSpeedRate = "1.0x";

    public ExoPlayerVideoDisplayComponent videoDisplayComponent;
    public ExoPlayer exoPlayer;
    private OnFocusChangeListener onFocusChangeListener;

    public ReactBrightcovePlayerView(Context context) {
        super(context);
        post(this::attachStableTextureView);

    }
    private void attachStableTextureView() {
        try {
            VideoDisplayComponent component = getVideoDisplay();
            if (component instanceof ExoPlayerVideoDisplayComponent) {
                videoDisplayComponent = (ExoPlayerVideoDisplayComponent) component;
                exoPlayer = videoDisplayComponent.getExoPlayer();

                if (exoPlayer != null) {
                    TextureView textureView = new TextureView(getContext());
                    textureView.setLayoutParams(new FrameLayout.LayoutParams(
                            LayoutParams.MATCH_PARENT,
                            LayoutParams.MATCH_PARENT
                    ));

                    this.removeAllViews();
                    this.addView(textureView, 0);

                    exoPlayer.setVideoTextureView(textureView);
                }
            }
        } catch (Exception e) {
            Log.e("ReactBrightcoveView", "Failed to set TextureView", e);
        }
    }


    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
    }

    public boolean hasAllProps() {
        return accountId != null && policyKey != null && videoId != null;
    }

    public void setPausedTimes(ArrayList<Integer> times) {
        this.pauseVideoTimes = times;
    }

    public ArrayList<Integer> getPausedTimes() {
        return pauseVideoTimes;
    }

    public void setBrightcoveVideoIds(ArrayList<String> videoIds){
        this.brightcoveVideoIds = videoIds;
    }

    public void setTranscriptTimeList(ArrayList<String> transcripts){
        this.transcriptTimeList = transcripts;
    }

    public ArrayList<String> getTranscriptTimeList(){
        return transcriptTimeList;
    }

    public int getCurrentProgress() {
        return videoProgress;
    }

    public ArrayList<String> getBrightCoveVideoIds(){ return brightcoveVideoIds;}

    @Override
    public void onWindowFocusChanged(boolean hasWindowFocus) {
        super.onWindowFocusChanged(hasWindowFocus);
        onFocusChangeListener.onFocusChanged(hasWindowFocus);
    }

    public void setOnFocusChangeListener(OnFocusChangeListener listener) {
        this.onFocusChangeListener = listener;
    }
    public interface OnFocusChangeListener {
        void onFocusChanged(boolean hasFocus);
    }

    public void sendEvent(String eventName, @Nullable Integer eventValue, @Nullable String eventMessage) {
        ReactContext reactContext = (ReactContext) getContext();
        WritableMap event = new WritableNativeMap();

        switch (eventName) {
            case "onPauseVideo":
                putIntIfNotNull(event, "pauseVideoTime", eventValue);
                break;
            case "handleVolumeChange":
                putIntIfNotNull(event, "mute", eventValue);
                break;
            case "handleAudioTrackChange":
                putStringIfNotNull(event, "audioTrack", eventMessage);
                break;
            case "handleSpeedRateChange":
                putStringIfNotNull(event, "playSpeedRate", eventMessage);
                break;
            case "onTranscriptHighlight":
                putIntIfNotNull(event,"highLightIndex",eventValue);
                break;
            case "onVideoProgressChange":
                putIntIfNotNull(event,"progress",eventValue);
                break;
            case "onMultiVideoChange":
                putStringIfNotNull(event,"selectedBrightCoveId",eventMessage);
                break;
            default:
                putIntIfNotNull(event, eventName, eventValue);
                break;
        }
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                eventName,
                event
        );
    }

    private void putIntIfNotNull(WritableMap map, String key, @Nullable Integer value) {
        if (value != null) {
            map.putInt(key, value);
        }
    }

    private void putStringIfNotNull(WritableMap map, String key, @Nullable String value) {
        if (value != null) {
            map.putString(key, value);
        }
    }

}
