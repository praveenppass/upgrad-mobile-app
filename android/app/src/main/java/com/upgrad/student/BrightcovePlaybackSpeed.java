package com.upgrad.student;

import android.util.Log;

import com.brightcove.player.display.ExoPlayerVideoDisplayComponent;
import com.brightcove.player.event.EventType;
import com.brightcove.player.view.BrightcoveExoPlayerVideoView;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.PlaybackParameters;

public class BrightcovePlaybackSpeed {

    private final BrightcoveExoPlayerVideoView videoView;
    private final float speed;

    public BrightcovePlaybackSpeed(BrightcoveExoPlayerVideoView videoView, float speed) {
        this.videoView = videoView;
        this.speed = speed;
    }

    public void applyPlaybackSpeed() {
        if (videoView == null) {
            Log.w("BrightcovePlaybackSpeed", "videoView is null");
            return;
        }
        if (!(videoView.getVideoDisplay() instanceof ExoPlayerVideoDisplayComponent)) {
            Log.w("BrightcovePlaybackSpeed", "VideoDisplayComponent is not ExoPlayerVideoDisplayComponent");
            return;
        }
        ExoPlayerVideoDisplayComponent videoDisplayComponent =
                (ExoPlayerVideoDisplayComponent) videoView.getVideoDisplay();
        if (videoDisplayComponent == null) {
            Log.w("BrightcovePlaybackSpeed", "VideoDisplayComponent is null");
            return;
        }
        ExoPlayer player = (ExoPlayer) videoDisplayComponent.getExoPlayer();
        if (player == null) {
            Log.w("BrightcovePlaybackSpeed", "ExoPlayer is null");
            return;
        }
        try {
            player.setPlaybackParameters(new PlaybackParameters(speed));
        } catch (Exception e) {
            Log.e("BrightcovePlaybackSpeed", "Error setting playback speed", e);
        }
    }
}
