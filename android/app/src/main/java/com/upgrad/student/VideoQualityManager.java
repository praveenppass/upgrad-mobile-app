package com.upgrad.student;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.brightcove.player.C;
import com.brightcove.player.display.ExoPlayerVideoDisplayComponent;
import com.brightcove.player.view.BrightcoveExoPlayerVideoView;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.Format;
import com.google.android.exoplayer2.source.TrackGroup;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.MappingTrackSelector;

public class VideoQualityManager {

    private static final String TAG = "VideoQualityManager";
    private final BrightcoveExoPlayerVideoView videoView;

    public VideoQualityManager(BrightcoveExoPlayerVideoView videoView) {
        this.videoView = videoView;
    }

    public void setVideoQuality(String qualityLabel) {
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            try {
                ExoPlayerVideoDisplayComponent videoDisplayComponent =
                        (ExoPlayerVideoDisplayComponent) videoView.getVideoDisplay();

                if (videoDisplayComponent == null) {
                    Log.w(TAG, "VideoDisplayComponent is null");
                    return;
                }

                ExoPlayer player = (ExoPlayer) videoDisplayComponent.getExoPlayer();
                if (player == null) {
                    Log.w(TAG, "ExoPlayer is null");
                    return;
                }

                DefaultTrackSelector trackSelector = (DefaultTrackSelector) player.getTrackSelector();
                if (trackSelector == null) {
                    Log.w(TAG, "TrackSelector is null");
                    return;
                }

                MappingTrackSelector.MappedTrackInfo mappedTrackInfo = trackSelector.getCurrentMappedTrackInfo();
                if (mappedTrackInfo == null) {
                    Log.w(TAG, "MappedTrackInfo is null");
                    return;
                }

                boolean qualitySet = false;

                for (int rendererIndex = 0; rendererIndex < mappedTrackInfo.getRendererCount(); rendererIndex++) {
                    if (player.getRendererType(rendererIndex) != C.TRACK_TYPE_VIDEO) continue;

                    TrackGroupArray trackGroups = mappedTrackInfo.getTrackGroups(rendererIndex);
                    if (trackGroups.length == 0) continue;

                    DefaultTrackSelector.Parameters.Builder parametersBuilder = trackSelector.buildUponParameters();

                    for (int groupIndex = 0; groupIndex < trackGroups.length; groupIndex++) {
                        TrackGroup group = trackGroups.get(groupIndex);

                        for (int trackIndex = 0; trackIndex < group.length; trackIndex++) {
                            Format format = group.getFormat(trackIndex);
                            int height = format.height;

                            boolean match = false;
                            switch (qualityLabel.toLowerCase()) {
                                case "360p":
                                    match = height >= 340 && height <= 380;
                                    break;
                                case "480p":
                                    match = height >= 470 && height <= 490;
                                    break;
                                case "720p":
                                    match = height >= 700 && height <= 740;
                                    break;
                                case "1080p":
                                    match = height >= 1070 && height <= 1100;
                                    break;
                                case "auto":
                                    break;
                            }

                            if (match) {
                                parametersBuilder.setSelectionOverride(
                                        rendererIndex,
                                        trackGroups,
                                        new DefaultTrackSelector.SelectionOverride(groupIndex, trackIndex)
                                );
                                trackSelector.setParameters(parametersBuilder);
                                qualitySet = true;
                                break;
                            }
                        }
                        if (qualitySet) break;
                    }

                    if (!qualitySet && "auto".equalsIgnoreCase(qualityLabel)) {
                        trackSelector.setParameters(
                                trackSelector.buildUponParameters()
                                        .clearSelectionOverrides(rendererIndex)
                        );
                    } else if (!qualitySet) {
                        trackSelector.setParameters(
                                trackSelector.buildUponParameters()
                                        .clearSelectionOverrides(rendererIndex)
                        );
                    }
                    break;
                }
            } catch (Exception e) {
                Log.e(TAG, "Error applying video quality: " + e.getMessage(), e);
            }
        }, 1000); // Delay to ensure player and track info are available
    }
}
