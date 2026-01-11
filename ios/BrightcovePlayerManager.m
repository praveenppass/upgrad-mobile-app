//#import <Foundation/Foundation.h>
#import "BrightcovePlayerManager.h"
#import <React/RCTViewManager.h>
#import "BrightcovePlayerView.h"
#import <React/RCTUIManager.h>
#import <React/RCTBridgeModule.h>

@implementation BrightcovePlayerManager

RCT_EXPORT_MODULE(BrightcovePlayerNativeDRM)


- (UIView *)view {
  return [[BrightcovePlayerView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(accountId, NSString)
RCT_EXPORT_VIEW_PROPERTY(policyKey, NSString)
RCT_EXPORT_VIEW_PROPERTY(videoId, NSString)
RCT_EXPORT_VIEW_PROPERTY(isVideoWatched, BOOL)
RCT_EXPORT_VIEW_PROPERTY(seekTime, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(transcriptSeekTime, NSInteger)

RCT_EXPORT_VIEW_PROPERTY(brightcoveVideoIds, NSArray)
RCT_EXPORT_VIEW_PROPERTY(pauseVideoTimes, NSArray)
RCT_EXPORT_VIEW_PROPERTY(transcriptTimeList, NSArray)

RCT_EXPORT_VIEW_PROPERTY(isFullScreen, BOOL)
RCT_EXPORT_VIEW_PROPERTY(isFromLandscape, BOOL)

RCT_EXPORT_VIEW_PROPERTY(mute, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(audioTrack, NSString)
RCT_EXPORT_VIEW_PROPERTY(playSpeedRate, NSString)

RCT_EXPORT_VIEW_PROPERTY(onPauseVideo, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMultiVideo, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(handleVolumeChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(handleAudioTrackChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(handleSpeedRateChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onVideoCompleted, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigateToPreviousScreen, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onTranscriptHighlight, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onVideoProgressChange, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onIOSFullscreenChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMultiVideoChange, RCTDirectEventBlock)

@end
