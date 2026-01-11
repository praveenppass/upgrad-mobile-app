//
//  BrightcovePlayerManager.h
//  lexMobileApp
//
//  Created by Firoj  on 30/04/25.
//

#import <React/RCTViewManager.h>

@interface BrightcovePlayerManager : RCTViewManager

@property (nonatomic, copy) NSString *accountId;
@property (nonatomic, copy) NSString *policyKey;
@property (nonatomic, copy) NSString *videoId;
@property (nonatomic, assign) BOOL isVideoWatched;
@property (nonatomic, assign) NSInteger seekTime;
@property (nonatomic, assign) NSInteger transcriptSeekTime;

@property (nonatomic, assign) NSArray *brightcoveVideoIds;
@property (nonatomic, assign) NSArray *pauseVideoTimes;
@property (nonatomic, assign) NSArray *transcriptTimeList;

@property (nonatomic, assign) BOOL isFullScreen;
@property (nonatomic, assign) BOOL isFromLandscape;

@property (nonatomic, assign) NSInteger mute;
@property (nonatomic, copy) NSString *audioTrack;
@property (nonatomic, copy) NSString *playSpeedRate;

@property (nonatomic, copy) RCTDirectEventBlock onPauseVideo;
@property (nonatomic, copy) RCTDirectEventBlock onMultiVideo;
@property (nonatomic, copy) RCTDirectEventBlock handleVolumeChange;
@property (nonatomic, copy) RCTDirectEventBlock handleAudioTrackChange;
@property (nonatomic, copy) RCTDirectEventBlock handleSpeedRateChange;
@property (nonatomic, copy) RCTDirectEventBlock onVideoCompleted;
@property (nonatomic, copy) RCTDirectEventBlock onNavigateToPreviousScreen;

@property (nonatomic, copy) RCTDirectEventBlock onTranscriptHighlight;

@property (nonatomic, copy) RCTDirectEventBlock onVideoProgressChange;

@property (nonatomic, copy) RCTDirectEventBlock onIOSFullscreenChange;
@property (nonatomic, copy) RCTDirectEventBlock onMultiVideoChange;



@end
