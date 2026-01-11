package com.upgrad.student;

import android.util.Log;

import com.brightcove.player.model.Video;
import com.brightcove.player.edge.Catalog;
import com.brightcove.player.edge.VideoListener;
import com.brightcove.player.view.BrightcoveExoPlayerVideoView;

public class BrightcoveVideoLoader {

    public static void loadVideoById(BrightcoveExoPlayerVideoView videoView, String videoId, String policyKey, Runnable onLoaded) {
        if (videoView == null) {
            Log.e("BrightcoveVideoLoader", "videoView is null");
            return;
        }
        if (videoId == null || policyKey == null) {
            Log.e("BrightcoveVideoLoader", "Missing videoId or policyKey");
            return;
        }
        if (videoView.getEventEmitter() == null) {
            Log.e("BrightcoveVideoLoader", "EventEmitter is null");
            return;
        }
        Catalog catalog = new Catalog(videoView.getEventEmitter(),videoId, policyKey);
        catalog.findVideoByID(videoId, new VideoListener() {
            @Override
            public void onVideo(Video video) {
                if (video == null) {
                    Log.e("BrightcoveVideoLoader", "Loaded video is null");
                    return;
                }
                videoView.clear();
                videoView.add(video);
                if (onLoaded != null) onLoaded.run();
            }

            @Override
            public void onError(String error) {
                Log.e("BrightcoveVideoLoader", "Video load failed: " + error);
            }
        });
    }
}
