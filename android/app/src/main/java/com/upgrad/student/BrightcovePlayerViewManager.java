package com.upgrad.student;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;


import android.app.Activity;
import android.content.Context;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.media.AudioManager;
import android.net.ConnectivityManager;
import android.net.TrafficStats;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.brightcove.player.C;
import com.brightcove.player.display.ExoPlayerVideoDisplayComponent;
import com.brightcove.player.display.VideoDisplayComponent;
import com.brightcove.player.edge.Catalog;
import com.brightcove.player.edge.VideoListener;
import com.brightcove.player.event.Event;
import com.brightcove.player.event.EventEmitter;
import com.brightcove.player.event.EventListener;
import com.brightcove.player.event.EventType;
import com.brightcove.player.mediacontroller.BrightcoveMediaController;
import com.brightcove.player.model.Video;
import com.brightcove.player.network.HttpRequestConfig;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.Format;
import com.google.android.exoplayer2.source.TrackGroup;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.MappingTrackSelector;
import com.google.android.exoplayer2.trackselection.MappingTrackSelector.MappedTrackInfo;
import android.view.LayoutInflater;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;


public class BrightcovePlayerViewManager extends SimpleViewManager<ReactBrightcovePlayerView> implements LifecycleEventListener {

    public static final String REACT_CLASS = "BrightcovePlayerNativeDRM";
    private static final String TAG = "BrightcovePlayerView";
    private BrightcoveMediaController mediaController;

    private SeekBar seekBar;
    public TextView tvCurrentTime, tvTotalTime, txt_cannot_skip,txt_error_message;
    private boolean isUserSeeking = false;
    public Timer seekBarTimer;
    public ImageButton fastForward,rewind,playPauseBtn,fullScreenBtn, btnCC,
            btn_unmute,btn_settings,btn_next,btn_previous,btn_multi_video,btn_retry;
    public Boolean isFullscreen = false;
    public View customControls;
    private List<String> availableCaptionLanguages = new ArrayList<>();
    DefaultTrackSelector trackSelector;
    private int previousSeekPosition = 0;
    private View blackOverlay,videoControls,errorOverlay;
    FrameLayout rootLayout;
    private boolean isMuted = false;
    private int videoQualitIndex = 4, videoSpeedIndex = 1,audioIndex = 0, subTitleIndex = 0;
    private List<String> videoPlaySpeeds = Arrays.asList("0.5x", "1.0x","1.25x", "1.5x", "2.0x");
    ProgressBar loader;
    private EventEmitter eventEmitter;
    private int triggeredPausePoint = 0;
    private  List<Integer>  triggeredPauseList = new ArrayList<>();

    private int currentSeekProgressTime = 0, lastSeekProgressTime = 0;
    private int triggeredCheckPoint = 0;
    private Activity activity;
    private ReactBrightcovePlayerView videoView;

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected ReactBrightcovePlayerView createViewInstance(@NonNull ThemedReactContext reactContext) {
    activity = reactContext.getCurrentActivity();
    boolean isInvalid = (activity == null)
        || activity.isFinishing()
        || (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1 && activity.isDestroyed());
    if (isInvalid) {
        Log.e(TAG, "Activity context is invalid (null, finishing, or destroyed). Cannot initialize Brightcove player.");
        throw new IllegalStateException("Valid Activity context is required for Brightcove player.");
    }

    videoView = new ReactBrightcovePlayerView(reactContext);
    reactContext.addLifecycleEventListener(this);
    BrightcoveDataModule.setPlayerView(videoView);
    videoView.finishInitialization();

    // Always fill width and height to avoid left/right space on load
    videoView.setLayoutParams(new ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.MATCH_PARENT
    ));
    videoView.requestLayout();
    videoView.invalidate();

    // Add border shadow for portrait mode directly to videoView
    if (reactContext.getResources().getConfiguration().orientation == android.content.res.Configuration.ORIENTATION_PORTRAIT) {
        float density = reactContext.getResources().getDisplayMetrics().density;
        int borderColor = Color.parseColor("#33000000"); // semi-transparent black
        int borderWidth = (int) (2 * density); // 2dp
        int shadowRadius = (int) (8 * density); // 8dp

        android.graphics.drawable.GradientDrawable borderDrawable = new android.graphics.drawable.GradientDrawable();
        borderDrawable.setColor(Color.TRANSPARENT);
        borderDrawable.setStroke(borderWidth, borderColor);
        borderDrawable.setCornerRadius(12 * density);
        videoView.setBackground(borderDrawable);

        // Set elevation for shadow (API 21+)
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            videoView.setElevation(shadowRadius);
        }
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        activity.getWindow().setStatusBarColor(Color.parseColor("#D3D3D3"));
    }

    ViewGroup.LayoutParams overlayParams = new ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.MATCH_PARENT
    );

    // Create VideoView dynamically
    blackOverlay = new View(reactContext);
    blackOverlay.setBackgroundColor(0xFF000000);
    blackOverlay.setAlpha(0.6f);
    blackOverlay.setVisibility(View.VISIBLE);

    // ❌ Error overlay
    errorOverlay = new FrameLayout(reactContext);
    errorOverlay.setLayoutParams(overlayParams);
    errorOverlay.setBackgroundColor(Color.BLACK);
    errorOverlay.setVisibility(View.VISIBLE);

    mediaController = new BrightcoveMediaController(videoView);
    mediaController.setShowControllerEnable(false);
    videoView.setMediaController(mediaController);

    LayoutInflater inflater = LayoutInflater.from(videoView.getContext());
    customControls = inflater.inflate(R.layout.custom_controls_partial, null);

    loader = customControls.findViewById(R.id.video_loader);
    seekBar = customControls.findViewById(R.id.seekBar);
    tvCurrentTime = customControls.findViewById(R.id.tv_current_time);
    tvTotalTime = customControls.findViewById(R.id.tv_total_time);
    playPauseBtn = customControls.findViewById(R.id.btn_play_pause);
    fullScreenBtn = customControls.findViewById(R.id.btn_fullscreen);
    btnCC = customControls.findViewById(R.id.btn_cc);

    fastForward = customControls.findViewById(R.id.btn_fast_forward);
    rewind = customControls.findViewById(R.id.btn_rewind);
    rootLayout = customControls.findViewById(R.id.root_layout);
    videoControls = customControls.findViewById(R.id.controls_container);
    btn_unmute = customControls.findViewById(R.id.btn_unmute);
    btn_settings = customControls.findViewById(R.id.btn_settings);
    txt_cannot_skip = customControls.findViewById(R.id.txt_cannot_skip);
    btn_next = customControls.findViewById(R.id.btn_next);
    btn_previous = customControls.findViewById(R.id.btn_previous);
    btn_multi_video = customControls.findViewById(R.id.btn_multi_video);
    txt_error_message = customControls.findViewById(R.id.txt_error_message);
    btn_retry = customControls.findViewById(R.id.btn_retry);

    txt_error_message.setVisibility(View.INVISIBLE);
    btn_retry.setVisibility(View.INVISIBLE);
    errorOverlay.setVisibility(View.INVISIBLE);

    txt_cannot_skip.setVisibility(View.INVISIBLE);
    btn_multi_video.setVisibility(View.GONE);

    btnCC.setVisibility(View.GONE);
    setControlVisibilityInVisible();
    setupControlListeners(videoView, reactContext);
    videoView.setupClosedCaptioningRendering();

    hideNextPreviousBtn();
    initEventListeners(videoView);
    videoView.addView(blackOverlay);
    videoView.addView(errorOverlay);
    videoView.addView(customControls);

    videoView.setOnFocusChangeListener(new ReactBrightcovePlayerView.OnFocusChangeListener() {
        @Override
        public void onFocusChanged(boolean hasFocus) {
            if(!hasFocus){
                videoView.pause();
                setPlayIcon();
            }
        }
    });

    return videoView;
    }

    @ReactProp(name = "accountId")
    public void setAccountId(ReactBrightcovePlayerView view, String accountId) {
        view.accountId = accountId;
    }

    @ReactProp(name = "isVideoInterrupted")
    public void setAccountId(ReactBrightcovePlayerView view, boolean isVideoInterrupted) {
        view.isVideoInterrupted = isVideoInterrupted;
        view.pause();
        setPlayIcon();
    }
    @ReactProp(name = "policyKey")
    public void setPolicyKey(ReactBrightcovePlayerView view, String policyKey) {
        view.policyKey = policyKey;
    }

    @ReactProp(name = "mute")
    public void setMute(ReactBrightcovePlayerView view, int mute) {
        view.mute = mute;
    }

    @ReactProp(name = "audioTrack")
    public void setAudioTrack(ReactBrightcovePlayerView view, String audioTrack) {
        view.audioTrack = audioTrack;
    }

    @ReactProp(name = "playSpeedRate")
    public void setPlaySpeedRate(ReactBrightcovePlayerView view, String playSpeedRate) {
        if ("1x".equals(playSpeedRate) || "2x".equals(playSpeedRate)) {
            view.playSpeedRate = playSpeedRate.replace("x", ".0x");
        } else {
            view.playSpeedRate = playSpeedRate;
        }
    }
    @ReactProp(name = "videoId")
    public void setVideoId(ReactBrightcovePlayerView view, String videoId) {
        view.videoId = videoId;
        view.clear();
        view.seekTo(0);
        setPreviousNextIcon(view);
    }

    @ReactProp(name = "seekTime")
    public void setSeekTime(ReactBrightcovePlayerView view, int seekTime) {
        view.seekTime = seekTime;
        currentSeekProgressTime = seekTime;
        int checkpointSeconds = seekTime / 1000;
        triggeredCheckPoint = checkpointSeconds / 30;
    }

    @ReactProp(name = "transcriptSeekTime")
    public void setTranscriptSeekTime(ReactBrightcovePlayerView view, int transcriptSeekTime) {
        view.transcriptSeekTime = transcriptSeekTime;
        currentSeekProgressTime = transcriptSeekTime;
        view.seekTo(transcriptSeekTime);
        lastSeekProgressTime = transcriptSeekTime;
        seekBar.setProgress(lastSeekProgressTime);
        tvCurrentTime.setText(formatTime(lastSeekProgressTime));
        setControlVisibilityVisible();
    }

    @ReactProp(name = "isVideoWatched")
    public void setVideoWatched(ReactBrightcovePlayerView view, boolean isVideoWatched) {
        view.isVideoWatched = isVideoWatched;
    }
    @ReactProp(name = "isFromLandscape")
    public void setIsFromLandscape(ReactBrightcovePlayerView view, boolean isFromLandscape) {
        view.isFromLandscape = isFromLandscape;
    }

    @ReactProp(name = "moveToPortrait")
    public void setMoveToPortrait(ReactBrightcovePlayerView view, boolean moveToPortrait) {
        view.moveToPortrait = moveToPortrait;
        if(moveToPortrait){
         restorePortrait((ThemedReactContext) view.getContext(),view);
        }
    }

    @ReactProp(name = "pauseVideoTimes")
    public void setPausedTimes(ReactBrightcovePlayerView view, @Nullable ReadableArray pausedTimesArray) {
        ArrayList<Integer> times = new ArrayList<>();
        for (int i = 0; i < pausedTimesArray.size(); i++) {
            times.add(pausedTimesArray.getInt(i));
        }
        if (!times.isEmpty()) {
            triggeredPausePoint = times.get(0);
        }
        view.setPausedTimes(times);
    }

    @ReactProp(name = "brightcoveVideoIds")
    public void setBrightcoveVideoIds(ReactBrightcovePlayerView view, ReadableArray videoIdsArray) {
        ArrayList<String> videoIds = new ArrayList<>();
        if (videoIdsArray != null) {
            for (int i = 0; i < videoIdsArray.size(); i++) {
                videoIds.add(videoIdsArray.getString(i));
            }
            view.setBrightcoveVideoIds(videoIds);
            view.videoId = videoIds.get(0);
        }
    }

    @ReactProp(name = "transcriptTimeList")
    public void setTranscriptTimeList(ReactBrightcovePlayerView view, ReadableArray transcriptTimeList) {
        ArrayList<String> transcripts = new ArrayList<>();
        if (transcriptTimeList != null) {
            for (int i = 0; i < transcriptTimeList.size(); i++) {
                transcripts.add(transcriptTimeList.getString(i));
            }
            view.setTranscriptTimeList(transcripts);
        }
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("onMultiVideo", MapBuilder.of("registrationName", "onMultiVideo"))
                .put("onPauseVideo", MapBuilder.of("registrationName", "onPauseVideo"))
                .put("handleVolumeChange", MapBuilder.of("registrationName", "handleVolumeChange"))
                .put("handleAudioTrackChange", MapBuilder.of("registrationName", "handleAudioTrackChange"))
                .put("handleSpeedRateChange", MapBuilder.of("registrationName", "handleSpeedRateChange"))
                .put("onVideoCompleted", MapBuilder.of("registrationName", "onVideoCompleted"))
                .put("onTranscriptHighlight", MapBuilder.of("registrationName", "onTranscriptHighlight"))
                .put("onVideoProgressChange",MapBuilder.of("registrationName","onVideoProgressChange"))
                .put("onMultiVideoChange",MapBuilder.of("registrationName","onMultiVideoChange"))
                .build();
    }

    @Override
    public void onAfterUpdateTransaction(@NonNull ReactBrightcovePlayerView view) {
        super.onAfterUpdateTransaction(view);
        int index = view.brightcoveVideoIds.indexOf(view.videoId);
        int lastIndex = view.brightcoveVideoIds.size() - 1;

        // Set previous button icon
        btn_previous.setImageResource(index <= 0 ?
                R.drawable.gray_previous_icon : R.drawable.white_previous_icon);

        // Set next button icon
        btn_next.setImageResource(index >= lastIndex ?
                R.drawable.gray_next_icon : R.drawable.white_next_icon);

        maybeLoadVideo(view);
    }

    private void maybeLoadVideo(ReactBrightcovePlayerView view) {
        if (view == null) {
            Log.w(TAG, "View is null, skipping video load.");
            return;
        }
        if (!view.hasAllProps()) {
            Log.w(TAG, "Not all props are set yet, skipping video load.");
            return;
        }
        if (view.videoId != null && view.videoId.equals(view.lastLoadedVideoId)) {
            Log.d(TAG, "Same videoId as before. Skipping load.");
            return;
        }
        view.lastLoadedVideoId = view.videoId;
        eventEmitter = view.getEventEmitter();
        Log.e(TAG, " releasing player maybeLoadVideo: "+view.videoId);
        if(eventEmitter == null){
            Log.w(TAG, "EventEmitter is null, skipping video load.");
            return;
        }
        if (view.accountId == null || view.policyKey == null) {
            Log.w(TAG, "AccountId or PolicyKey is null, skipping video load.");
            return;
        }
        Catalog catalog = new Catalog.Builder(eventEmitter, view.accountId)
                .setPolicy(view.policyKey)
                .build();

        HttpRequestConfig requestConfig = new HttpRequestConfig.Builder()
                .addQueryParameter("bcov_disable_analytics", "true")
                .addRequestHeader("BCOV-Policy",view.policyKey)
                .build();

        catalog.findVideoByID(view.videoId, requestConfig, new VideoListener() {
            @Override
            public void onVideo(Video video) {
                if (video == null) {
                    Log.e(TAG, "Loaded video is null.");
                    return;
                }
                view.post(() -> {
                    view.add(video);
                    view.requestLayout();
                    new Handler(Looper.getMainLooper()).postDelayed(() -> {
                        if (view.seekTime > 0) {
                            view.seekTo(view.seekTime);
                            if (tvCurrentTime != null) tvCurrentTime.setText(formatTime(view.seekTime));
                            if (seekBar != null) seekBar.setProgress(view.seekTime);
                        }
                        view.pause();
                        if (view.getVideoDisplay() instanceof ExoPlayerVideoDisplayComponent) {
                            view.videoDisplayComponent = (ExoPlayerVideoDisplayComponent) view.getVideoDisplay();
                            if (view.videoDisplayComponent != null) {
                                view.exoPlayer = (ExoPlayer) view.videoDisplayComponent.getExoPlayer();
                                if (view.exoPlayer != null) {
                                    view.exoPlayer.setVolume(view.mute);
                                }
                            }
                        }
                        if (btn_unmute != null) btn_unmute.setImageResource(view.mute == 0 ? R.drawable.mute_icon : R.drawable.un_mute_icon);

                        List<String> audioLanguages = getAvailableAudioLanguages(view);
                        setAudioLanguage(view.audioTrack);
                        audioIndex = audioLanguages.indexOf(view.audioTrack);

                        try {
                            float speed = Float.parseFloat(view.playSpeedRate.replace("x", "f"));
                            new BrightcovePlaybackSpeed(view, speed).applyPlaybackSpeed();
                            videoSpeedIndex = videoPlaySpeeds.indexOf(view.playSpeedRate);
                        } catch (Exception e) {
                            Log.e(TAG, "Error parsing playback speed", e);
                        }
                    }, 500);
                });
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "Catalog error: " + error);
            }
        });
    }

    private void setPreviousNextIcon(ReactBrightcovePlayerView videoView) {
        List<String> videoIds = videoView.getBrightCoveVideoIds();
        int currentIndex = videoIds.indexOf(videoView.videoId);
        if(currentIndex > 0){
            btn_previous.setImageResource(R.drawable.white_previous_icon);
        } else if (currentIndex == 0) {
            btn_previous.setImageResource(R.drawable.gray_previous_icon);
        }

    }

    private void setupControlListeners(ReactBrightcovePlayerView videoView, ThemedReactContext context) {

        if (videoView == null || context == null) return;

        seekBar.getProgressDrawable().setColorFilter(Color.WHITE,PorterDuff.Mode.SRC_IN);
        seekBar.getThumb().setColorFilter(Color.WHITE, PorterDuff.Mode.SRC_IN);

        rootLayout.setOnClickListener(v -> {
            boolean isOverlayVisible = blackOverlay.getVisibility() == View.VISIBLE;
            boolean isPlaying = videoView.isPlaying();
            if(txt_error_message.getVisibility() == View.VISIBLE || loader.getVisibility() == View.VISIBLE){
                return;
            }
            if (isPlaying) {
                if (!isOverlayVisible) {
                    blackOverlay.setVisibility(View.VISIBLE);
                    setControlVisibilityVisible();
                    new Handler(Looper.getMainLooper()).postDelayed(() -> {
                        if (videoView.isPlaying()) {
                            blackOverlay.setVisibility(View.INVISIBLE);
                            setControlVisibilityInVisible();
                        }
                    }, 3000);
                }
            } else {
                int newVisibility = isOverlayVisible ? View.INVISIBLE : View.VISIBLE;
                blackOverlay.setVisibility(newVisibility);
                videoControls.setVisibility(newVisibility);
            }
        });

        btn_retry.setOnClickListener(view -> {
            NetworkUtil util = new NetworkUtil(context);
            loader.setVisibility(View.VISIBLE);
            setControlVisibilityInVisible();
            blackOverlay.setVisibility(View.VISIBLE);
            errorOverlay.setVisibility(View.INVISIBLE);
            txt_error_message.setVisibility(View.INVISIBLE);
            btn_retry.setVisibility(View.INVISIBLE);
            util.checkNetworkStatus(new NetworkUtil.NetworkCallback() {
                @Override
                public void onResult(boolean isConnected, boolean isSlow) {
                    if (!isConnected) {
                        Log.d(TAG, "No network connection");
                        internetSlow();
                    } else if (isSlow) {
                        internetGood();
                        loadVideo(videoView);
                        loader.setVisibility(View.INVISIBLE);
                        Log.d(TAG, "Network is slow (<100kbps)");
                    } else {
                        internetGood();
                        Log.d(TAG, "Network is fast (≥500kbps)");
                    }
                }
            });
        });


        playPauseBtn.setOnClickListener(v -> {
            if (videoView.isPlaying()) {
                videoView.pause();
                setPlayIcon();
            } else {
                videoView.start();
                setPauseIcon();
            }
        });

        fullScreenBtn.setOnClickListener(v -> {
            if (isFullscreen) restorePortrait(context, videoView);
            else forceLandscape(context, videoView);
        });

        fastForward.setOnClickListener(v -> {
            if(videoView.isVideoWatched || videoView.isFromLandscape ){
                videoView.seekTo(Math.max(videoView.getCurrentPosition() + 10000, 0));
            }else{
                if(currentSeekProgressTime > videoView.getCurrentProgress() + 10000){
                    videoView.seekTo(Math.max(videoView.getCurrentPosition() + 10000, 0));
                }else{
                    txt_cannot_skip.setVisibility(View.VISIBLE);
                }
                new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        txt_cannot_skip.setVisibility(View.INVISIBLE);
                    }
                }, 3000);
            }
        });

        rewind.setOnClickListener(v -> videoView.seekTo(Math.max(videoView.getCurrentPosition() - 10000, 0)));


        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar bar, int progress, boolean fromUser) {
                videoView.videoProgress = progress;
                int totalDuration = videoView.getDuration(); // in ms

                if(!videoView.isVideoWatched){
                    if (totalDuration > 0 && currentSeekProgressTime >= (totalDuration - 20000)) {
                        videoView.sendEvent("onVideoCompleted", progress, "");
                    }
                }

                // update progress every 30 sec
                if (!videoView.isVideoWatched) {
                    int checkpointSeconds = progress / 1000;
                    int checkpointBlock = checkpointSeconds / 30;
                    if (checkpointBlock > triggeredCheckPoint) {
                        triggeredCheckPoint = checkpointBlock;
                        updateVideoProgress(videoView);
                    }
                }

                // transcript implementation
                List<String> transcriptList = videoView.getTranscriptTimeList();
                for (int i = 0; i < transcriptList.size(); i++) {
                    int transcriptTimeMs = parseTimeToMillis(transcriptList.get(i));
                    if (progress >= transcriptTimeMs) {
                        Log.d(TAG, "🎯 Highlighting transcript index: " + i + " at ms: " + transcriptTimeMs);
                        videoView.sendEvent("onTranscriptHighlight", i, "");
                    }
                }

                List<Integer> pausedTimes = videoView.getPausedTimes();
                if(!isUserSeeking && currentSeekProgressTime < progress){
                    currentSeekProgressTime = progress;
                }
                if (!pausedTimes.isEmpty()) {
                    for (int i = 0; i < pausedTimes.size(); i++) {
                        int pauseTimeMs = pausedTimes.get(i) * 1000;
                        if (progress >= pauseTimeMs && !triggeredPauseList.contains(pausedTimes.get(i))) {
                            videoView.pause();
                            triggeredPauseList.add(pausedTimes.get(i));
                            if (i + 1 < pausedTimes.size()) {
                                triggeredPausePoint = pausedTimes.get(i + 1);
                            }
                            playPauseBtn.setImageResource(android.R.drawable.ic_media_play);
                            videoView.sendEvent("onPauseVideo", progress, "");
                            return;
                        }
                        if (progress < pauseTimeMs && triggeredPauseList.contains(pausedTimes.get(i))) {
                            triggeredPauseList.remove(Integer.valueOf(pausedTimes.get(i)));
                            triggeredPausePoint = pausedTimes.get(i);
                            return;
                        }
                    }
                }
                if (fromUser) tvCurrentTime.setText(formatTime(progress));
            }

            @Override public void onStartTrackingTouch(SeekBar bar) {
                isUserSeeking = true;
                previousSeekPosition = bar.getProgress();

            }
            @Override public void onStopTrackingTouch(SeekBar bar) {
                isUserSeeking = false;
                lastSeekProgressTime = bar.getProgress();
                if(previousSeekPosition > bar.getProgress()){
                    videoView.seekTo(bar.getProgress());
                }else if(currentSeekProgressTime > bar.getProgress()){
                    videoView.seekTo(bar.getProgress());
                } else {
                    if(videoView.isVideoWatched || videoView.isFromLandscape){
                        videoView.seekTo(bar.getProgress());
                    }else{
                        txt_cannot_skip.setVisibility(View.VISIBLE);
                        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                txt_cannot_skip.setVisibility(View.INVISIBLE);
                            }
                        }, 3000);
                    }
                }
            }
        });


        btn_unmute.setOnClickListener(view -> {
            ExoPlayerVideoDisplayComponent videoDisplayComponent =
                    (ExoPlayerVideoDisplayComponent) videoView.getVideoDisplay();

            ExoPlayer player = (ExoPlayer) videoDisplayComponent.getExoPlayer();
            AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
            int maxVolume = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC);
            int currentVolume = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC);

            if (player != null) {
                isMuted = !isMuted;
                player.setVolume(isMuted ? 0f : 1f);
                if(isMuted){
                    videoView.sendEvent("handleVolumeChange",0,"");
                }else{
                    videoView.sendEvent("handleVolumeChange",currentVolume,"");
                }
                btn_unmute.setImageResource(isMuted ? R.drawable.mute_icon : R.drawable.un_mute_icon);
            }
        });

        btnCC.setOnClickListener(v -> {
            if (availableCaptionLanguages.isEmpty()) {
                Toast.makeText(v.getContext(), "No captions available", Toast.LENGTH_SHORT).show();
                return;
            }
            openSubtitleDialog(videoView);
        });


        btn_settings.setOnClickListener(view -> {
            CustomDialog dialog = new CustomDialog(videoView.getContext());
            int selectIndex = -1;
            List<String> settingsOptions = new ArrayList<>();
            List<String> audioLangs = getAvailableAudioLanguages(videoView);
            if (audioLangs != null && audioLangs.size() > 1) {
                 settingsOptions.add("Audio Language");
             }
            settingsOptions.add("Video Quality");
            settingsOptions.add("Playback Speed");

            dialog.showListDialog(
                    "Select Setting",
                    settingsOptions,
                    selectIndex,false,
                    (index, item) -> {
                        if ("Video Quality".equals(item)) {
                            showQualitySelectionDialog(videoView);
                        } else if ("Playback Speed".equals(item)) {
                            showPlaybackSpeedDialog(videoView);
                        }else if ("Audio Language".equals(item)){
                            openLanguageDialog(videoView);
                        }
                    }
            );
        });


        btn_next.setOnClickListener(view -> {
            List<String> videoIds = videoView.getBrightCoveVideoIds();
            int currentIndex = videoIds.indexOf(videoView.videoId);
            if (currentIndex < videoIds.size() - 1) {
                int nextIndex = currentIndex + 1;
                playVideoById(videoView, videoIds.get(nextIndex));
                btn_previous.setImageResource(R.drawable.white_previous_icon);
                if (nextIndex == videoIds.size() - 1) {
                    btn_next.setImageResource(R.drawable.gray_next_icon);
                } else {
                    btn_next.setImageResource(R.drawable.white_next_icon);
                }
            }
        });

        btn_previous.setOnClickListener(view -> {
            List<String> videoIds = videoView.getBrightCoveVideoIds();
            int currentIndex = videoIds.indexOf(videoView.videoId);

            if (currentIndex > 0) {
                int prevIndex = currentIndex - 1;
                playVideoById(videoView, videoIds.get(prevIndex));
                btn_next.setImageResource(R.drawable.white_next_icon);
                if (prevIndex == 0) {
                    btn_previous.setImageResource(R.drawable.gray_previous_icon);
                } else {
                    btn_previous.setImageResource(R.drawable.white_previous_icon);
                }
            }
        });


        btn_multi_video.setOnClickListener(view -> {
            videoView.sendEvent("onMultiVideo",0,"");
        });

    }

    private void loadVideo(ReactBrightcovePlayerView videoView) {
        ExoPlayerCacheManager.clearCache(videoView.getContext());
        Catalog catalog = new Catalog.Builder(videoView.getEventEmitter(), videoView.accountId)
                .setPolicy(videoView.policyKey)
                .build();

        catalog.findVideoByID(videoView.videoId, new VideoListener() {
            @Override
            public void onVideo(Video video) {
                videoView.clear();
                videoView.add(video);
                if(videoView.videoProgress == 0){
                    videoView.seekTo(videoView.seekTime);
                }else{
                    videoView.seekTo(videoView.videoProgress);
                }
                videoView.start();
            }
        });
    }

    private int parseTimeToMillis(String timeStr) {
        String[] parts = timeStr.split(":");
        if (parts.length != 3) return 0;

        int hours = Integer.parseInt(parts[0]);
        int minutes = Integer.parseInt(parts[1]);

        String[] secParts = parts[2].split("\\.");
        int seconds = Integer.parseInt(secParts[0]);
        int millis = secParts.length > 1 ? Integer.parseInt(secParts[1]) : 0;

        return (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + millis;
    }

    private void initEventListeners(ReactBrightcovePlayerView videoView) {

        videoView.getEventEmitter().on(EventType.DID_SET_VIDEO, event -> {
            Video video = null;
            if (event != null && event.properties != null) {
                Object v = event.properties.get(Event.VIDEO);
                if (v instanceof Video) {
                    video = (Video) v;
                }
            }
            if (video != null && seekBar != null && tvTotalTime != null) {
                int duration = video.getDuration();
                if (duration > 0) {
                    seekBar.setMax(duration);
                    tvTotalTime.setText(formatTime(duration));
                    startSeekBarUpdate(videoView);
                }
            }
        });

        videoView.getEventEmitter().on(EventType.CAPTIONS_LANGUAGES, event -> {
            List<String> languages = (List<String>) event.properties.get(Event.LANGUAGES);
            Log.d("SHWO THE SUBTITLE","CAPTIONS_LANGUAGES : "+languages);
            if (languages != null) {
                languages.add("Off");
                availableCaptionLanguages.clear();
                availableCaptionLanguages.addAll(languages);
            }
        });

        videoView.getEventEmitter().on(EventType.COMPLETED, event -> {
            try {
                runOnUiThread(() -> {
                    if (videoView != null && videoView.getCurrentVideo() != null) {
                        try {
                            videoView.pause();
                            setPlayIcon();
                            videoView.sendEvent("onVideoCompleted", 0, "");
                        } catch (Exception innerEx) {
                            Log.e("VideoComplete", "Exception while handling completion", innerEx);
                        }
                    } else {
                        Log.w("VideoComplete", "No video was loaded when COMPLETED event triggered.");
                    }
                });
            } catch (Exception e) {
                Log.e("VideoComplete", "Outer error on completion event", e);
            }
        });

        videoView.getEventEmitter().on(EventType.BUFFERING_STARTED, event -> {
            if (videoControls != null) setControlVisibilityInVisible();
            if (loader != null) loader.setVisibility(View.VISIBLE);

        });

        videoView.getEventEmitter().on(EventType.BUFFERING_COMPLETED, event -> {
            if (loader != null) loader.setVisibility(View.INVISIBLE);
            if (videoControls != null) setControlVisibilityVisible();
            if (videoView.isPlaying()) {
                videoView.start();
                setPauseIcon();
            }
        });

        videoView.getEventEmitter().on(EventType.ERROR, event -> {
                videoView.pause();
                internetSlow();
        });

        videoView.getEventEmitter().on(EventType.READY_TO_PLAY, event -> {
            VideoDisplayComponent comp = videoView.getVideoDisplay();
            if (comp instanceof ExoPlayerVideoDisplayComponent) {
                videoView.videoDisplayComponent = (ExoPlayerVideoDisplayComponent) comp;
                DefaultTrackSelector selector = videoView.videoDisplayComponent.getTrackSelector();
                getAvailableAudioLanguages(videoView);
                if (selector == null) {
                    Log.e("Tracks", "TrackSelector is null.");
                }
            }
        });


        EventListener subtitleListener = event -> {
            if (!availableCaptionLanguages.isEmpty()) {
                videoView.getClosedCaptioningController().selectCaptions(
                        subTitleIndex == availableCaptionLanguages.size() - 1 ? 0 : subTitleIndex + 1
                );
            }
        };
        videoView.getEventEmitter().on(EventType.READY_TO_PLAY, subtitleListener);

        videoView.getEventEmitter().on(EventType.DID_PAUSE, event -> {
            setPlayIcon();
            updateVideoProgress(videoView);
        });

    }

    private void updateVideoProgress(ReactBrightcovePlayerView videoView) {
        videoView.sendEvent("onVideoProgressChange", videoView.videoProgress, "");
    }


    private void internetSlow() {
        setPlayIcon();
        loader.setVisibility(View.INVISIBLE);
        setControlVisibilityInVisible();
        blackOverlay.setVisibility(View.INVISIBLE);
        errorOverlay.setVisibility(View.VISIBLE);
        txt_error_message.setVisibility(View.VISIBLE);
        btn_retry.setVisibility(View.VISIBLE);
    }

    private void internetGood() {
        setPlayIcon();
        setControlVisibilityVisible();
        blackOverlay.setVisibility(View.VISIBLE);
        errorOverlay.setVisibility(View.INVISIBLE);
        txt_error_message.setVisibility(View.INVISIBLE);
        btn_retry.setVisibility(View.INVISIBLE);
    }

    private void hideNextPreviousBtn(){
        btn_next.setVisibility(View.GONE);
        btn_previous.setVisibility(View.GONE);
        btn_multi_video.setVisibility(View.GONE);
    }
    private void unHideNextPreviousBtn(){
        btn_next.setVisibility(View.VISIBLE);
        btn_previous.setVisibility(View.VISIBLE);
        btn_multi_video.setVisibility(View.VISIBLE);

    }

    private void setPauseIcon() {
        playPauseBtn.setImageResource(android.R.drawable.ic_media_pause);
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                blackOverlay.setVisibility(View.INVISIBLE);
                setControlVisibilityInVisible();
            }
        }, 4000);
    }

    private void setPlayIcon() {
        playPauseBtn.setImageResource(android.R.drawable.ic_media_play);
    }

    private void setControlVisibilityVisible() {
        videoControls.setVisibility(View.VISIBLE);
    }

    private void setControlVisibilityInVisible() {
        videoControls.setVisibility(View.INVISIBLE);
    }


    private void playVideoById(ReactBrightcovePlayerView videoView, String brightcoveId) {
        videoView.clear();
        videoView.seekTo(0);
        videoView.videoId = brightcoveId;
        videoView.sendEvent("onMultiVideoChange", 0, brightcoveId);

        maybeLoadVideo(videoView);
    }

    private void showQualitySelectionDialog(ReactBrightcovePlayerView videoView) {
        List<String> qualities = Arrays.asList("270p", "360p", "540p", "576p","720p", "Auto");
        CustomDialog dialog = new CustomDialog(videoView.getContext());
        dialog.showListDialog("Video Quality", qualities, videoQualitIndex,true, (index, quality) -> {
            new VideoQualityManager(videoView).setVideoQuality(quality);
            videoQualitIndex = index;
            Toast.makeText(videoView.getContext(), "Quality set to: " + quality, Toast.LENGTH_SHORT).show();
        });
    }

    private void showPlaybackSpeedDialog(ReactBrightcovePlayerView videoView) {
        CustomDialog dialog = new CustomDialog(videoView.getContext());
        dialog.showListDialog("Playback Speed", videoPlaySpeeds, videoSpeedIndex,true, (index, speedLabel) -> {
            float speed = Float.parseFloat(speedLabel.replace("x", "f"));
            new BrightcovePlaybackSpeed(videoView, speed).applyPlaybackSpeed();
            videoSpeedIndex = index;
            videoView.sendEvent("handleSpeedRateChange",0,speedLabel);
            Toast.makeText(videoView.getContext(), "Speed set to: " + speedLabel, Toast.LENGTH_SHORT).show();
        });
    }

    private void openLanguageDialog(ReactBrightcovePlayerView videoView){

        List<String> audioLanguages = getAvailableAudioLanguages(videoView);
        CustomDialog dialog = new CustomDialog(videoView.getContext());
        dialog.showListDialog(
                "Audio Languages",
                audioLanguages,
                audioIndex,true,
                (index, language) -> {
                    setAudioLanguage(language);
                    audioIndex = index;
                    videoView.sendEvent("handleAudioTrackChange",0,language);
                    Toast.makeText(videoView.getContext(), "Audio set to: " + language, Toast.LENGTH_SHORT).show();
                }
        );

    }


    private void openSubtitleDialog(ReactBrightcovePlayerView videoView){
        if (availableCaptionLanguages == null || availableCaptionLanguages.isEmpty()) {
            Toast.makeText(videoView.getContext(), "No subtitle languages available", Toast.LENGTH_SHORT).show();
            return;
        }
        CustomDialog customDialog = new CustomDialog(videoView.getContext());
        customDialog.showListDialog(
                "Select Subtitle Language",
                availableCaptionLanguages,
                subTitleIndex,true,
                (index, language) -> {
                    subTitleIndex = index;
                    Video currentVideo = videoView.getCurrentVideo();
                    if (currentVideo != null && videoView.getClosedCaptioningController() != null) {
                        if ("Off".equals(availableCaptionLanguages.get(index))) {
                            videoView.getClosedCaptioningController().selectCaptions(0);
                            Toast.makeText(videoView.getContext(), "Captions disable ", Toast.LENGTH_SHORT).show();
                        } else {
                            videoView.getClosedCaptioningController().selectCaptions(index + 1);
                            Toast.makeText(videoView.getContext(), "Captions set to: " + availableCaptionLanguages.get(index), Toast.LENGTH_SHORT).show();
                        }
                    } else {
                        Toast.makeText(videoView.getContext(), "No video or caption controller available", Toast.LENGTH_SHORT).show();
                    }
                }
        );
    }

    private void startSeekBarUpdate(ReactBrightcovePlayerView videoView) {
        if (seekBarTimer != null) seekBarTimer.cancel();

        seekBarTimer = new Timer();
        seekBarTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                if (!isUserSeeking && videoView.isPlaying()) {
                    runOnUiThread(() -> {
                        int current = videoView.getCurrentPosition();
                        seekBar.setProgress(current);
                        tvCurrentTime.setText(formatTime(current));
                    });
                }
            }
        }, 0, 1000);
    }

    private String formatTime(int milliseconds) {
        int totalSeconds = milliseconds / 1000;
        int hours = totalSeconds / 3600;
        int minutes = (totalSeconds % 3600) / 60;
        int seconds = totalSeconds % 60;
        Log.d("show the duration value","time of the screen"+minutes +":"+seconds);
        if (hours > 0) {
            return String.format("%02d:%02d:%02d", hours, minutes, seconds);
        } else {
            return String.format("%02d:%02d:%02d", 00,minutes, seconds);
        }
    }

    private void resetPlayerBeforeLoad(ReactBrightcovePlayerView view) {
        try {
            view.pause();
            view.clear();

            if (view.exoPlayer != null) {
                view.exoPlayer.stop();
                view.exoPlayer.clearMediaItems();
                view.exoPlayer.release();
                view.exoPlayer = null;
            }

            clearExoPlayerCache(view.getContext());
        } catch (Exception e) {
            Log.e(TAG, "Failed to reset player before loading video", e);
        }
    }

    private void clearExoPlayerCache(Context context) {
        try {
            File cacheDir = new File(context.getCacheDir(), "media_cache");
            if (cacheDir.exists()) {
                deleteRecursive(cacheDir);
                Log.i(TAG, "ExoPlayer cache cleared");
            }
        } catch (Exception e) {
            Log.e(TAG, "Error clearing ExoPlayer cache", e);
        }
    }

    private void deleteRecursive(File fileOrDirectory) {
        if (fileOrDirectory.isDirectory()) {
            for (File child : fileOrDirectory.listFiles()) {
                deleteRecursive(child);
            }
        }
        fileOrDirectory.delete();
    }

    private void decreaseImageSize() {
        fastForward.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
        rewind.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
        playPauseBtn.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
    }

    private void increaseImageSize() {
        rewind.setScaleType(ImageView.ScaleType.FIT_XY);
        fastForward.setScaleType(ImageView.ScaleType.FIT_XY);
        playPauseBtn.setScaleType(ImageView.ScaleType.FIT_XY);
    }

    private void forceLandscape(ThemedReactContext reactContext, ReactBrightcovePlayerView videoView) {
        activity = reactContext.getCurrentActivity();
        if (activity == null) return;

        isFullscreen = true;

        boolean wasPlaying = videoView.isPlaying();
        int resumePosition = videoView.getCurrentPosition();

        increaseImageSize();
        if (videoView.brightcoveVideoIds.isEmpty() || videoView.brightcoveVideoIds.size() == 1) {
            hideNextPreviousBtn();
        } else {
            unHideNextPreviousBtn();
        }

        txt_cannot_skip.setTextSize(18);
        setControlVisibilityVisible();

        if (availableCaptionLanguages.isEmpty()) {
            btnCC.setVisibility(View.GONE);
        } else {
            btnCC.setVisibility(View.VISIBLE);
        }

        videoView.setClosedCaptioningEnabled(true);
        videoView.post(() -> {
            videoView.seekTo(resumePosition);
            if (!wasPlaying) {
                videoView.start();
                videoView.pause();
            }

            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            hideSystemUI(activity);

            new Handler(Looper.getMainLooper()).post(() -> {
                ViewGroup rootView = activity.findViewById(android.R.id.content);
                ViewGroup originalParent = (ViewGroup) videoView.getParent();

                // Save the original parent & index so we can restore later
                if (originalParent != null) {
                    videoView.originalParent = originalParent;
                    videoView.originalIndex = originalParent.indexOfChild(videoView);
                    originalParent.removeView(videoView);
                }

                FrameLayout container = new FrameLayout(activity);
                container.setId(View.generateViewId());
                container.setBackgroundColor(0xFF000000);
                
                container.setLayoutParams(new FrameLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                ));

                // Ensure videoView has no parent before adding
                ViewGroup parent = (ViewGroup) videoView.getParent();
                if (parent != null) {
                    parent.removeView(videoView);
                }

                videoView.setLayoutParams(new FrameLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                ));

                container.addView(videoView);
                rootView.addView(container);
                videoView.setTag(R.id.fullscreen_container_id, container);

                videoView.post(() -> {
                    videoView.seekTo(resumePosition);
                    if (videoView.isFromLandscape) {
                        if (wasPlaying) {
                            videoView.start();
                            setPauseIcon();
                        } else {
                            videoView.pause();
                            setPlayIcon();
                        }
                    } else {
                        videoView.start();
                        setPauseIcon();
                    }
                    if (subTitleIndex == (availableCaptionLanguages.size() - 1)) {
                        if (videoView.getCurrentVideo() != null) {
                            videoView.getClosedCaptioningController().selectCaptions(0);
                        }
                    }
                });
            });
        });
    }

    private void restorePortrait(ThemedReactContext reactContext, ReactBrightcovePlayerView videoView) {
        activity = reactContext.getCurrentActivity();
        if (activity == null) return;

        isFullscreen = false;
        decreaseImageSize();
        txt_cannot_skip.setTextSize(14);
        btnCC.setVisibility(View.GONE);
        hideNextPreviousBtn();
        setControlVisibilityVisible();

        activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        showSystemUI(activity);

        int resumePosition = videoView.getCurrentPosition();
        boolean wasPlaying = videoView.isPlaying();

        new Handler(Looper.getMainLooper()).post(() -> {
            ViewGroup rootView = activity.findViewById(android.R.id.content);
            ViewGroup fullscreenContainer = (ViewGroup) videoView.getTag(R.id.fullscreen_container_id);

            if (fullscreenContainer != null) {
                fullscreenContainer.removeView(videoView);
                rootView.removeView(fullscreenContainer);
                videoView.setTag(R.id.fullscreen_container_id, null);
            }

            ViewGroup currentParent = (ViewGroup) videoView.getParent();
            if (currentParent != null) {
                currentParent.removeView(videoView);
            }

            if (videoView.originalParent != null) {
                // Always reset layout to full width + full height
                ViewGroup.LayoutParams params = new ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                );
                
                videoView.setLayoutParams(params);

                int safeIndex = Math.min(videoView.originalIndex, videoView.originalParent.getChildCount());
                videoView.originalParent.addView(videoView, safeIndex);
                videoView.originalParent.requestLayout();
                videoView.originalParent.invalidate();

                videoView.originalParent = null;
                videoView.originalIndex = -1;
            }

            // ✅ Re-apply MATCH_PARENT after parent layout pass
            videoView.post(() -> {
                ViewGroup.LayoutParams lp = videoView.getLayoutParams();
                lp.width = ViewGroup.LayoutParams.MATCH_PARENT;
                lp.height = ViewGroup.LayoutParams.MATCH_PARENT;
                videoView.setLayoutParams(lp);
                videoView.requestLayout();

                boolean pipelineBroken = false;
                VideoDisplayComponent displayComponent = videoView.getVideoDisplay();
                if (displayComponent instanceof ExoPlayerVideoDisplayComponent) {
                    ExoPlayer exoPlayer = ((ExoPlayerVideoDisplayComponent) displayComponent).getExoPlayer();
                    pipelineBroken = (exoPlayer == null ||
                            videoView.getCurrentVideo() == null ||
                            videoView.getDuration() <= 0);
                } else {
                    pipelineBroken = true;
                }

                if (pipelineBroken) {
                    String brightcoveId = videoView.videoId;
                    String policyKey = videoView.policyKey;

                    BrightcoveVideoLoader.loadVideoById(videoView, brightcoveId, policyKey, () -> {
                        videoView.seekTo(resumePosition);
                        if (wasPlaying) {
                            new Handler(Looper.getMainLooper()).postDelayed(() -> {
                                videoView.start();
                                setPauseIcon();
                            }, 900);
                        } else {
                            videoView.pause();
                            setPlayIcon();
                        }
                    });
                } else {
                    videoView.seekTo(resumePosition);
                    if (wasPlaying) {
                        new Handler(Looper.getMainLooper()).postDelayed(() -> {
                            videoView.start();
                            setPauseIcon();
                        }, 900);
                    } else {
                        videoView.pause();
                        setPlayIcon();
                    }
                    videoView.setVisibility(View.VISIBLE);
                }
            });
        });
    }

    private void showSystemUI(Activity activity) {
        if (activity == null || activity.getWindow() == null) return;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController insetsController = activity.getWindow().getInsetsController();
            if (insetsController != null) {
                insetsController.show(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
            }
        } else {
            View decorView = activity.getWindow().getDecorView();
            decorView.setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            );
        }
    }


    private void hideSystemUI(Activity activity) {
        if (activity == null || activity.getWindow() == null) return;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            // Android 11+ (API 30+)
            WindowInsetsController insetsController = activity.getWindow().getInsetsController();
            if (insetsController != null) {
                insetsController.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
                insetsController.setSystemBarsBehavior(
                        WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                );
            }
        } else {
            // Below Android 11
            View decorView = activity.getWindow().getDecorView();
            decorView.setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                            | View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            );
        }
    }



    private List<String> getAvailableAudioLanguages(ReactBrightcovePlayerView videoView) {
        List<String> audioLanguages = new ArrayList<>();

        if (videoView.exoPlayer == null) return audioLanguages;

        trackSelector = videoView.videoDisplayComponent.getTrackSelector();
        MappedTrackInfo trackInfo = trackSelector.getCurrentMappedTrackInfo();

        if (trackInfo == null) return audioLanguages;

        TrackGroupArray audioGroups = trackInfo.getTrackGroups(C.TRACK_TYPE_AUDIO);

        for (int i = 0; i < audioGroups.length; i++) {
            TrackGroup group = audioGroups.get(i);
            for (int j = 0; j < group.length; j++) {
                Format format = group.getFormat(j);
                String lang = format.language;
                if (lang != null && !audioLanguages.contains(lang)) {
                    audioLanguages.add(lang);
                }
            }
        }
        return audioLanguages;
    }


    public void setAudioLanguage(String languageCode) {
        if (mediaController == null || trackSelector == null) return;

        MappingTrackSelector.MappedTrackInfo mappedTrackInfo = trackSelector.getCurrentMappedTrackInfo();
        if (mappedTrackInfo == null) return;

        for (int rendererIndex = 0; rendererIndex < mappedTrackInfo.getRendererCount(); rendererIndex++) {
            if (mappedTrackInfo.getRendererType(rendererIndex) == C.TRACK_TYPE_AUDIO) {
                TrackGroupArray trackGroups = mappedTrackInfo.getTrackGroups(rendererIndex);
                DefaultTrackSelector.Parameters.Builder parametersBuilder = trackSelector.buildUponParameters();

                boolean foundMatch = false;

                for (int groupIndex = 0; groupIndex < trackGroups.length; groupIndex++) {
                    TrackGroup group = trackGroups.get(groupIndex);

                    for (int trackIndex = 0; trackIndex < group.length; trackIndex++) {
                        Format format = group.getFormat(trackIndex);

                        if (format.language != null && format.language.equals(languageCode)) {
                            if (mappedTrackInfo.getTrackSupport(rendererIndex, groupIndex, trackIndex)
                                    == MappedTrackInfo.RENDERER_SUPPORT_UNSUPPORTED_TRACKS) {
                                continue;
                            }

                            parametersBuilder.setRendererDisabled(rendererIndex, false);
                            parametersBuilder.setSelectionOverride(rendererIndex, trackGroups,
                                    new DefaultTrackSelector.SelectionOverride(groupIndex, trackIndex));
                            foundMatch = true;
                            break;
                        }
                    }

                    if (foundMatch) break;
                }

                if (!foundMatch) {
                    parametersBuilder.clearSelectionOverrides(rendererIndex);
                }

                trackSelector.setParameters(parametersBuilder);
                return;
            }
        }
    }


    @Override
    public void onHostResume() {
        Log.d("LIFE CYCLE","RESUME ===");
    }

    @Override
    public void onHostPause() {
        Log.d("LIFE CYCLE","PAUSE ====");
        setPlayIcon();
    }

    @Override
    public void onHostDestroy() {
        Log.d("LIFE CYCLE","DESTROY");
    }

    @Override
    public void onDropViewInstance(@NonNull ReactBrightcovePlayerView view) {
        super.onDropViewInstance(view);
        Log.d("LIFE CYCLE", "ON DROP VIEW INSTANCE ");
        cleanup(view);
    }

    public void cleanup(ReactBrightcovePlayerView view) {
        if (this.eventEmitter != null) {
            this.eventEmitter.off();
            this.eventEmitter = null;
        }
        resetPlayerBeforeLoad(view);
    }

}
