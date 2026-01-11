#import "BrightcovePlayerView.h"
@import AVKit;
@import AVFoundation;
@import BrightcovePlayerSDK;

#import <BrightcovePlayerSDK/BrightcovePlayerSDK.h>
#import "UIViewParentViewController.h"
#import "LandscapeAVPlayerViewController.h"
#import "BrightcoveVideoService.h"

@interface BrightcovePlayerView () <AVAssetResourceLoaderDelegate, UIGestureRecognizerDelegate>


@property (nonatomic, strong) AVPlayerViewController *playerViewController;
@property (nonatomic, strong) NSData *certificateData;
@property (nonatomic, strong) NSString *certificateURL;
@property (nonatomic, copy) NSString *licenseServerURL;
@property (nonatomic, strong) NSURL *videoURL;
@property (nonatomic, strong) UIImageView *thumbnailImageView;

@property (nonatomic) CMTime lastKnownTime;
@property (nonatomic, assign) BOOL allowForwardSeek;
@property (nonatomic, strong) id timeObserverToken;
@property (nonatomic, strong) UIActivityIndicatorView *loadingSpinner;

@property (nonatomic, strong) UIButton *fullscreenButton;
@property (nonatomic, strong) UIButton *playButton;
@property (nonatomic, assign) NSInteger pendingSeekTime;

@property (nonatomic, assign) Float64 pusedVideoTime;
@property (nonatomic, assign) NSInteger videoPlayIndex;
@property (nonatomic, strong) LandscapeAVPlayerViewController *landscapeVC;

@property (nonatomic, strong) NSTimer *audioTrackTimer;
@property (nonatomic, strong) NSString *lastAudioTrack;

@property (nonatomic, strong) UIButton *nextButton;
@property (nonatomic, strong) UIButton *previousButton;
@property (nonatomic, strong) UIButton *multiIconButton;

@property (nonatomic, strong) NSArray *_VideoIds;
@property (nonatomic, strong) NSArray *_pauseVideoTimesList;


@property (nonatomic, strong) NSArray *_transcriptTimeList;
@property (nonatomic, strong) NSMutableSet<NSNumber *> *triggeredTranscriptTimes;

@property (nonatomic, strong) UIView *customControlsOverlay;
@property (nonatomic, assign) BOOL controlsVisible;
@property (nonatomic, strong) UIView *playerView;
@property (nonatomic, strong) NSTimer *toggleControlerTimer;

@property (nonatomic, assign) Float64 currentSeekProgressTime;
@property (nonatomic, assign) BOOL completionEventSent;
@property (nonatomic, strong) NSString *lastLoadedVideoId;
@property (nonatomic, assign) NSInteger *triggeredCheckpoint;

@end

@implementation BrightcovePlayerView

// Replace with actual values
@synthesize videoId = _videoId;
@synthesize accountId = _accountId;
@synthesize policyKey = _policyKey;
@synthesize isVideoWatched = _isVideoWatched;
@synthesize seekTime = _seekTime;
@synthesize transcriptSeekTime = _transcriptSeekTime;
@synthesize brightcoveVideoIds = _brightcoveVideoIds;
@synthesize pauseVideoTimes = _pauseVideoTimes;
@synthesize isFullScreen = _isFullScreen;
@synthesize isFromLandscape = _isFromLandscape;
@synthesize mute = _mute;
@synthesize audioTrack = _audioTrack;
@synthesize playSpeedRate = _playSpeedRate;
@synthesize transcriptTimeList = _transcriptTimes;

static BrightcovePlayerView *_sharedInstance = nil;

+ (instancetype)sharedInstance {
    return _sharedInstance;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if ((self = [super initWithFrame:frame])) {
//        [self fetchBrightcoveVideo];
      if (self) {
           _sharedInstance = self;
       }
      
      self.controlsVisible = YES;
      UITapGestureRecognizer *tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(toggleControls)];
         tapGesture.delegate = self;
       [self addGestureRecognizer:tapGesture];
      
    
      
    }
    return self;
}


- (void)setVideoId:(NSString *)videoId {
  _videoId = videoId;
  [self tryFetch];
}

- (void)setAccountId:(NSString *)accountId {
  _accountId = accountId;
  [self tryFetch];
}

- (void)setPolicyKey:(NSString *)policyKey {
  _policyKey = policyKey;
  [self tryFetch];
}

- (void)setIsVideoWatched:(BOOL)isVideoWatched{
  _isVideoWatched = isVideoWatched;
//   [self tryFetch];
}

- (void)setIsFullScreen:(BOOL)isFullScreen {
  _isFullScreen = isFullScreen;
  [self tryFetch];
}

- (void)setIsFromLandscape:(BOOL)isFromLandscape {
  _isFromLandscape = isFromLandscape;
  [self tryFetch];
}

- (void)setSeekTime:(NSInteger)seekTime {
  _seekTime = seekTime;
  self.currentSeekProgressTime = seekTime;
  if (self.player.currentItem.status == AVPlayerItemStatusReadyToPlay) {
        CMTime targetTime = CMTimeMakeWithSeconds(seekTime, NSEC_PER_SEC);
        [self.player seekToTime:targetTime toleranceBefore:kCMTimeZero toleranceAfter:kCMTimeZero];
        NSLog(@"✅ Seeked to time: %ld seconds", (long)seekTime);
    } else {
        [self.player.currentItem addObserver:self forKeyPath:@"status"
                                     options:NSKeyValueObservingOptionNew
                                     context:nil];
        self.pendingSeekTime = seekTime;
    }
  
  //
  self.triggeredCheckpoint = seekTime / 30;
}

- (void)setTranscriptSeekTime:(NSInteger)transcriptSeekTime {
  _transcriptSeekTime = transcriptSeekTime;
  self.currentSeekProgressTime = transcriptSeekTime;
  [self seekToSeconds: transcriptSeekTime];
}

- (void)setTranscriptTimeList:(NSArray *)transcriptTimeList {
    _transcriptTimes = transcriptTimeList;
    self._transcriptTimeList = transcriptTimeList;
}

-(void) setMute:(NSInteger)mute{
  _mute = mute;
}

- (void)setPlaySpeedRate:(NSString *)playSpeedRate {
  _playSpeedRate = playSpeedRate;
}

- (void)setBrightcoveVideoIds:(NSArray *)brightcoveVideoIds {
    _brightcoveVideoIds = brightcoveVideoIds;
    self._VideoIds = brightcoveVideoIds;

    if (brightcoveVideoIds.count > 0) {
        NSString *firstVideoId = brightcoveVideoIds[0];
        _videoId = firstVideoId;
        self.videoPlayIndex = 0;
        [self tryFetch];

    }
}

- (void)setPauseVideoTimes:(NSArray *)pauseVideoTimes {
    _pauseVideoTimes = pauseVideoTimes;
    self._pauseVideoTimesList = pauseVideoTimes;
}

- (void)tryFetch {
  if (_accountId && _videoId && _policyKey) {
    [self fetchBrightcoveVideo:_videoId];
  }
}

- (void)setAudioTrack:(NSString *)audioTrack {
  _audioTrack = audioTrack;
}


// transcript seek
- (void)seekToSeconds:(Float64)milliseconds {
    if (!self.player || self.player.status != AVPlayerStatusReadyToPlay) {
        NSLog(@"❌ Player not ready");
        return;
    }

    Float64 seconds = milliseconds / 1000.0;
    CMTime seekTime = CMTimeMakeWithSeconds(seconds, NSEC_PER_SEC);
    [self.player seekToTime:seekTime
            toleranceBefore:kCMTimeZero
             toleranceAfter:kCMTimeZero
          completionHandler:^(BOOL finished) {
              if (finished) {
                  NSLog(@"✅ Seeked to %.2f seconds", seconds);
              }
          }];
}


#pragma mark - Fetch Video
- (void)fetchBrightcoveVideo:(NSString *)videoId  {
  [self resetPlayer];
  BrightcoveVideoService *service = [BrightcoveVideoService sharedService];
  service.accountId = _accountId;
  service.policyKey = _policyKey;

  if(self.brightcoveVideoIds.count > 1){
    self.videoPlayIndex = [self.brightcoveVideoIds indexOfObject:videoId];
  }
  
  [service fetchVideoWithId:videoId completion:^(BrightcoveVideoInfo * _Nullable info, NSError * _Nullable error) {
      if (error) {
          [self showNoVideoAvailableMessageInView:self];
          NSLog(@"❌ Error: during fetch video %@", error.localizedDescription);
          return;
      }

      self.videoURL = info.videoURL;
      NSLog(@"🎬 Video URL: %@", info.videoURL);
      if (info.licenseURL && info.certificateURL) {
          self.licenseServerURL = info.licenseURL.absoluteString;
          self.certificateURL = info.certificateURL.absoluteString;
          [self fetchFairPlayCertificate:self.certificateURL];
      } else {
          dispatch_async(dispatch_get_main_queue(), ^{
            self.player = [AVPlayer playerWithURL:self.videoURL];
            [self setupPlayerViewController];
          });
      }
  }];
}


#pragma mark - Fetch FairPlay Certificate

- (void)fetchFairPlayCertificate:(NSString *)urlString {
    NSURL *certURL = [NSURL URLWithString:urlString];
    NSURLSessionDataTask *certTask = [[NSURLSession sharedSession] dataTaskWithURL:certURL
                                                                 completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error || !data) {
            NSLog(@"Failed to download FairPlay certificate: %@", error.localizedDescription);
            return;
        }

        if (![response.MIMEType isEqualToString:@"application/octet-stream"]) {
            NSLog(@"❌ Unexpected content type: %@", response.MIMEType);\
            return;
        }

        NSString *base64Certificate = [data base64EncodedStringWithOptions:0];
        NSLog(@"Downloaded FairPlay certificate %@", base64Certificate);
        self.certificateData = data;

        // Play video once certificate is downloaded
        dispatch_async(dispatch_get_main_queue(), ^{
          [self playFairPlayVideo];
        });
    }];
    
    [certTask resume];
}


#pragma mark - Play Video
- (void)playFairPlayVideo {
    AVURLAsset *asset = [AVURLAsset URLAssetWithURL:self.videoURL options:nil];
    [asset.resourceLoader setDelegate:self queue:dispatch_get_main_queue()];

    AVPlayerItem *item = [AVPlayerItem playerItemWithAsset:asset];
    self.player = [AVPlayer playerWithPlayerItem:item];

    NSError *audioError = nil;
    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:&audioError];
    [[AVAudioSession sharedInstance] setActive:YES error:&audioError];

    [self.player addObserver:self forKeyPath:@"timeControlStatus" options:NSKeyValueObservingOptionNew context:nil];

    [self setupPlayerViewController];
}


- (void)setupPlayerViewController {
    if (!self.player) {
        NSLog(@"❌ No player available to set up");
        return;
    }
    dispatch_async(dispatch_get_main_queue(), ^{
        __weak typeof(self) weakSelf = self;
        // Clean up previous view controller
        if (weakSelf.playerViewController) {
            [weakSelf.playerViewController.view removeFromSuperview];
            [weakSelf.playerViewController removeFromParentViewController];
            weakSelf.playerViewController = nil;
        }

        // Create and configure the player view controller
        weakSelf.playerViewController = [[AVPlayerViewController alloc] init];
        weakSelf.playerViewController.player = weakSelf.player;
        weakSelf.playerViewController.delegate = self;

        weakSelf.playerViewController.showsPlaybackControls = YES;
        weakSelf.playerViewController.requiresLinearPlayback = NO;
        weakSelf.playerViewController.allowsPictureInPicturePlayback = NO;
        weakSelf.playerViewController.updatesNowPlayingInfoCenter = NO;
      
        weakSelf.player.allowsExternalPlayback = NO;
        weakSelf.player.usesExternalPlaybackWhileExternalScreenIsActive = NO;

        weakSelf.playerViewController.view.frame = self.bounds;
        weakSelf.playerViewController.view.autoresizingMask =
            UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;

        weakSelf.playerViewController.entersFullScreenWhenPlaybackBegins = NO;
        weakSelf.playerViewController.exitsFullScreenWhenPlaybackEnds = NO;
      
        weakSelf.fullscreenButton.hidden = YES;
      
        [weakSelf addSubview:weakSelf.playerViewController.view];
      

        // Add loading spinner
        UIActivityIndicatorView *spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleLarge];
        spinner.center = CGPointMake(CGRectGetMidX(weakSelf.bounds), CGRectGetMidY(weakSelf.bounds));
        spinner.autoresizingMask = UIViewAutoresizingFlexibleTopMargin | UIViewAutoresizingFlexibleBottomMargin | UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
        spinner.hidesWhenStopped = YES;
        spinner.color = [UIColor systemGrayColor];
        [weakSelf addSubview:spinner];
        [spinner startAnimating];

        

        weakSelf.loadingSpinner = spinner;

        // Observe item status
        [weakSelf.player.currentItem addObserver:weakSelf
                                      forKeyPath:@"status"
                                         options:NSKeyValueObservingOptionInitial | NSKeyValueObservingOptionNew
                                         context:nil];

        // Time observer for seek detection
        weakSelf.timeObserverToken = [weakSelf.player addPeriodicTimeObserverForInterval:CMTimeMake(1, 2)
                                                                                   queue:dispatch_get_main_queue()
                                                                              usingBlock:^(CMTime time) {
            [weakSelf handlePlaybackTimeChange:time];
        }];
      
        self.audioTrackTimer = [NSTimer scheduledTimerWithTimeInterval:1.0
                                                               target:self
                                                             selector:@selector(checkAudioTrackChanged)
                                                             userInfo:nil
                                                               repeats:YES];
      
      [self.player addObserver:self forKeyPath:@"rate"
                       options:NSKeyValueObservingOptionNew
                       context:nil];
      
      [[AVAudioSession sharedInstance] addObserver:self
                                         forKeyPath:@"outputVolume"
                                            options:NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld
                                            context:nil];
      
      [[NSNotificationCenter defaultCenter] addObserver:self
                                               selector:@selector(videoDidFinishPlaying:)
                                                   name:AVPlayerItemDidPlayToEndTimeNotification
                                                 object:self.player.currentItem];

      
    
      [self setupFullscreenButton];
      if(self._VideoIds.count > 1){
        [self setupCustomButtons];
        [self toggleControls];
      }
      
    });
  
}

- (BOOL)isViewObscured {
    if (!self.window || self.hidden || self.alpha == 0) return YES;
    // Check a point in the center of the view
    CGPoint centerPoint = [self convertPoint:self.center toView:self.window];
    // hitTest returns the topmost view at this point
    UIView *topView = [self.window hitTest:centerPoint withEvent:nil];
    // If topView is not self or a subview of self, then something is overlaying
    if (topView != self && ![topView isDescendantOfView:self]) {
        return YES;
    }
    return NO;
}

- (void)checkAndPauseIfObscured {
  if(!self.landscapeVC){
    if ([self isViewObscured]) {
        [self pauseIfPlaying];
        NSLog(@"🎬 Video paused because another layout is on top");
    }
  }
}


- (void)didMoveToWindow {
    [super didMoveToWindow];
    if (!self.window) {
        [self pauseIfPlaying];
    } else {
         if ([UIApplication sharedApplication].keyWindow != self.window) {
            [self pauseIfPlaying];
        }
    }
}

- (void)pauseIfPlaying {
  NSLog(@" pauseIfPlaying:");
    if (self.player && self.player.rate > 0) {
        [self.player pause];
    }
}

- (void)videoDidFinishPlaying:(NSNotification *)notification {
  if(self.onVideoCompleted){
    self.onVideoCompleted(@{});
  }
}

- (void)setupCustomButtons {
    self.previousButton = [self createButtonWithImage:@"prev_icon" action:@selector(didTapPrevious)];
    self.nextButton     = [self createButtonWithImage:@"next_icon" action:@selector(didTapNext)];
    self.multiIconButton = [self createButtonWithImage:@"multi_video_icon" action:@selector(didTapMultiVideo:)];

    for (UIButton *button in @[self.previousButton, self.nextButton]) {
        button.translatesAutoresizingMaskIntoConstraints = NO;
        [self addSubview:button];
        [self bringSubviewToFront:button];
    }

    // 🔧 Add multiIconButton to hierarchy
    self.multiIconButton.translatesAutoresizingMaskIntoConstraints = NO;
    [self addSubview:self.multiIconButton];
    [self bringSubviewToFront:self.multiIconButton];

    // Add constraints
    [NSLayoutConstraint activateConstraints:@[
        [self.previousButton.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:10],
        [self.previousButton.bottomAnchor constraintEqualToAnchor:self.bottomAnchor constant:-50],
        [self.previousButton.widthAnchor constraintEqualToConstant:40],
        [self.previousButton.heightAnchor constraintEqualToConstant:40],

        [self.nextButton.leadingAnchor constraintEqualToAnchor:self.previousButton.trailingAnchor constant:10],
        [self.nextButton.centerYAnchor constraintEqualToAnchor:self.previousButton.centerYAnchor],
        [self.nextButton.widthAnchor constraintEqualToConstant:40],
        [self.nextButton.heightAnchor constraintEqualToConstant:40],

        [self.multiIconButton.leadingAnchor constraintEqualToAnchor:self.nextButton.trailingAnchor constant:10],
        [self.multiIconButton.centerYAnchor constraintEqualToAnchor:self.previousButton.centerYAnchor],
        [self.multiIconButton.widthAnchor constraintEqualToConstant:40],
        [self.multiIconButton.heightAnchor constraintEqualToConstant:40],
    ]];
}


- (UIButton *)createButtonWithImage:(NSString *)imageName action:(SEL)action {
    UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];

    UIImage *image = [[UIImage imageNamed:imageName] imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate];
    [button setImage:image forState:UIControlStateNormal];

    if ([imageName isEqualToString:@"prev_icon"]) {
        button.tintColor = (self.videoPlayIndex == 0) ? [UIColor grayColor] : [UIColor whiteColor];
    }
    else if ([imageName isEqualToString:@"next_icon"]) {
        BOOL isLast = (self.videoPlayIndex >= self.brightcoveVideoIds.count - 1);
        button.tintColor = isLast ? [UIColor grayColor] : [UIColor whiteColor];
    }
    else {
        button.tintColor = [UIColor whiteColor];
    }
    button.backgroundColor = [UIColor clearColor];
    button.translatesAutoresizingMaskIntoConstraints = NO;
    button.imageView.contentMode = UIViewContentModeScaleAspectFit;
    [button addTarget:self action:action forControlEvents:UIControlEventTouchUpInside];

    return button;
}

// 3. Custom logic to detect visibility

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldReceiveTouch:(UITouch *)touch {
    // Allow tap unless touching a button
    [self.toggleControlerTimer invalidate];
    self.toggleControlerTimer = nil;
    if ([touch.view isKindOfClass:[UIButton class]]) {
      if(_isFullScreen){
        self.previousButton.alpha = 1.0;
        self.nextButton.alpha = 1.0;
        self.multiIconButton.alpha =  1.0;
        self.controlsVisible = YES;
        [self startToggleControlsTimer];
      }
      return NO;
    }
    [self toggleControls];
    [self startToggleControlsTimer];
  
    return YES;
}

- (void)startToggleControlsTimer {
    self.toggleControlerTimer = [NSTimer scheduledTimerWithTimeInterval:3.0
                                                                 target:self
                                                               selector:@selector(toggleControlsAfterDelay)
                                                               userInfo:nil
                                                                repeats:NO];
}

- (void)toggleControlsAfterDelay {
  if(self.controlsVisible && self.player.rate > 0.0){
    [self toggleControls];
  }
}

- (void)toggleControls {
  if(_isFullScreen){
    self.controlsVisible = !self.controlsVisible;
    [UIView animateWithDuration:0.25 animations:^{
        self.previousButton.alpha = self.controlsVisible ? 1.0 : 0.0;
        self.nextButton.alpha = self.controlsVisible ? 1.0 : 0.0;
        self.multiIconButton.alpha = self.controlsVisible ? 1.0 : 0.0;
    }];
  }else{
    self.controlsVisible = NO;
    [UIView animateWithDuration:0.25 animations:^{
        self.previousButton.alpha = 0.0;
        self.nextButton.alpha = 0.0;
        self.multiIconButton.alpha =  0.0;
    }];
  }
    
}


- (void)setupFullscreenButton {
    self.fullscreenButton = [UIButton buttonWithType:UIButtonTypeSystem];
    
    CGFloat buttonSize = 70;
    self.fullscreenButton.frame = CGRectMake(10, 10, buttonSize, buttonSize);
    self.fullscreenButton.autoresizingMask = UIViewAutoresizingFlexibleRightMargin | UIViewAutoresizingFlexibleBottomMargin;

    self.fullscreenButton.contentEdgeInsets = UIEdgeInsetsMake(20, 20, 20, 20);
//    [self.fullscreenButton setImage:[UIImage systemImageNamed:@"arrow.up.left.and.arrow.down.right"] forState:UIControlStateNormal]; // Fullscreen icon
    [self.fullscreenButton addTarget:self action:@selector(openFullScreenLandscape)
                   forControlEvents:UIControlEventTouchUpInside];

    [self addSubview:self.fullscreenButton];
    [self bringSubviewToFront:self.fullscreenButton];
}

- (void)openFullScreenLandscape {
    if (!self.player) return;
 
  // this code run only for SESSION VIDEO screen
    if(_isFromLandscape){
      [self handleScreenOrientation:!_isFullScreen];
      if(self.onIOSFullscreenChange){
        self.onIOSFullscreenChange(@{});
      }
      return;
    }

  [self handleScreenOrientation:YES];
  // this for asset screen
    if (self.landscapeVC) {
        [self.landscapeVC.view removeFromSuperview];
        [self.landscapeVC removeFromParentViewController];
        self.landscapeVC = nil;
    }

    // Create new landscape player
    self.landscapeVC = [[LandscapeAVPlayerViewController alloc] init];
    self.landscapeVC.delegate = self;
    self.landscapeVC.player = self.player;
    self.landscapeVC.videoIds = self.brightcoveVideoIds;

    // Use root view controller to embed fullscreen view
    UIWindow *mainWindow = UIApplication.sharedApplication.delegate.window;
    UIViewController *rootVC = mainWindow.rootViewController;

    // Ensure we're on the main thread
    dispatch_async(dispatch_get_main_queue(), ^{
        [rootVC addChildViewController:self.landscapeVC];
        self.landscapeVC.view.frame = rootVC.view.bounds;
        [rootVC.view addSubview:self.landscapeVC.view];
        [self.landscapeVC didMoveToParentViewController:rootVC];
    });
}

- (void)handleScreenOrientation:(BOOL)isLandscape {
    if (isLandscape) {
        // Landscape
        [[NSNotificationCenter defaultCenter] postNotificationName:@"lockOrientation"
                                                            object:nil
                                                          userInfo:@{
                                                              @"mask": @(UIInterfaceOrientationMaskLandscapeRight),
                                                              @"rotate": @(UIInterfaceOrientationLandscapeRight)
                                                          }];
    } else {
        // Portrait
        [[NSNotificationCenter defaultCenter] postNotificationName:@"lockOrientation"
                                                            object:nil
                                                          userInfo:@{
                                                              @"mask": @(UIInterfaceOrientationMaskPortrait),
                                                              @"rotate": @(UIInterfaceOrientationPortrait)
                                                          }];
    }
}


- (void)updatePlayerSettings {
    if (self.player) {
        self.player.volume = _mute;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.7 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            NSString *cleanRateString = [_playSpeedRate stringByReplacingOccurrencesOfString:@"x" withString:@""];
            float rate = [cleanRateString floatValue];
            self.player.rate = rate;
            NSLog(@"✅ Applied rate: %.2f", rate);
        });

        // set audio track
        AVPlayerItem *item = self.player.currentItem;
        if (item.status == AVPlayerItemStatusReadyToPlay) {
          [self applyAudioTrack:_audioTrack forItem:item];
        } else {
            [item addObserver:self forKeyPath:@"status" options:NSKeyValueObservingOptionNew context:nil];
        }
    }
}

- (void)applyAudioTrack:(NSString *)audioTrack forItem:(AVPlayerItem *)item {
    AVMediaSelectionGroup *audioGroup = [item.asset mediaSelectionGroupForMediaCharacteristic:AVMediaCharacteristicAudible];
    for (AVMediaSelectionOption *option in audioGroup.options) {
        NSString *lang = [option extendedLanguageTag];
        if ([lang containsString:audioTrack]) {
            [item selectMediaOption:option inMediaSelectionGroup:audioGroup];
            NSLog(@"✅ Audio track set to %@", lang);
            return;
        }
    }
}


- (NSInteger)parseTimeToMillis:(NSString *)timeString {
    NSArray *components = [timeString componentsSeparatedByString:@":"];
    if (components.count != 3) return -1;

    NSInteger hours = [components[0] integerValue];
    NSInteger minutes = [components[1] integerValue];

    // Handle seconds and milliseconds
    NSArray *secParts = [components[2] componentsSeparatedByString:@"."];
    NSInteger seconds = [[secParts firstObject] integerValue];
    NSInteger milliseconds = secParts.count > 1 ? [[secParts lastObject] integerValue] : 0;

    NSInteger totalMillis = ((hours * 3600) + (minutes * 60) + seconds) * 1000 + milliseconds;
    return totalMillis;
}


- (void)handlePlaybackTimeChange:(CMTime)newTime {
    Float64 currentSeconds = CMTimeGetSeconds(newTime);
    Float64 lastSeconds = CMTimeGetSeconds(self.lastKnownTime);

    if (isnan(currentSeconds) || currentSeconds == 0.0) return;
    [self checkAndPauseIfObscured];

  // call before 20 sec
    Float64 totalDuration = CMTimeGetSeconds(self.player.currentItem.duration);
    if (!self.completionEventSent && self.currentSeekProgressTime > (totalDuration - 20.0)) {
        if (self.onVideoCompleted) {
            self.onVideoCompleted(@{});
        }
        self.completionEventSent = YES;
    }
  //
  
  // triggere ever 30 sec
  if (!self.isVideoWatched) {
      NSInteger checkpointSeconds = CMTimeGetSeconds(self.player.currentTime);
      NSInteger checkpointBlock = checkpointSeconds / 30;

      if (checkpointBlock > self.triggeredCheckpoint) {
          self.triggeredCheckpoint = checkpointBlock;
          [self updateVideoProgress];
          NSLog(@"✅sucess Triggered at 30s interval: %ld count", (long)(checkpointBlock));
      }
  }
  
    self.currentProgress = currentSeconds;
    if(self.currentSeekProgressTime < currentSeconds ){
      Float64 deleteTime = fabs(currentSeconds - lastSeconds);
      if (deleteTime <= 1.5 && currentSeconds > self.currentSeekProgressTime) {
          self.currentSeekProgressTime = currentSeconds;
          NSLog(@"✅ Updated currentSeekProgressTime: %.2f", currentSeconds);
      } else {
          NSLog(@"⏩ Detected seek or skip. Ignoring currentSeekProgressTime update. Jump: %.2f", deleteTime);
      }
    }
  
    Float64 progressMillis = currentSeconds * 1000;

    if (!_isFromLandscape && self._pauseVideoTimesList.count > 0) {
        if (![self._pauseVideoTimesList isKindOfClass:[NSArray class]]) {
            NSLog(@"❌ pauseVideoTimes is not an NSArray! Actual class:");
            return;
        }

        NSArray *safePauseArray = (NSArray *)self._pauseVideoTimesList;

        for (id pausedTimeObj in safePauseArray) {
            if (![pausedTimeObj isKindOfClass:[NSNumber class]]) {
                NSLog(@"⚠️ Invalid object in pauseVideoTimes: %@", [pausedTimeObj class]);
                continue;
            }

            Float64 pausedTime = [pausedTimeObj doubleValue];
            Float64 progressMillis = CMTimeGetSeconds(self.player.currentTime) * 1000;

            if (pausedTime > self.pusedVideoTime && (pausedTime * 1000) < progressMillis) {
                [self.player pause];
                [self updateVideoProgress];
                
                self.pusedVideoTime = pausedTime;
                if (self.onPauseVideo) {
                    self.onPauseVideo(@{
                        @"pauseVideoTime": @((NSInteger)(CMTimeGetSeconds(self.player.currentTime)))
                    });
                }
                return;
            }
        
          if(currentSeconds < pausedTime && self.pusedVideoTime >= pausedTime ){
              self.pusedVideoTime = 1;
          }
          
        }
    }

  // 🟡 Transcript Highlighting Logic
      NSArray *safeTranscriptArray = (NSArray *)self._transcriptTimeList;
      NSLog(@"📋 Transcript Time List: %@", safeTranscriptArray);

      if (self._transcriptTimeList && [self._transcriptTimeList isKindOfClass:[NSArray class]]) {
        for (NSInteger i = 0; i < self._transcriptTimeList.count; i++) {
            NSString *timestamp = self._transcriptTimeList[i];

            // Validate it's a string
            if (![timestamp isKindOfClass:[NSString class]]) {
                NSLog(@"⚠️ Invalid transcript timestamp at index %ld: %@", (long)i, [timestamp class]);
                continue;
            }

            NSInteger transcriptTimeMs = [self parseTimeToMillis:timestamp];

            NSLog(@"🕒 Current progressMillis: %ld, Checking transcript time: %ld ms (%@)", (long)progressMillis, (long)transcriptTimeMs, timestamp);

            if ([self.triggeredTranscriptTimes containsObject:@(transcriptTimeMs)]) {
                continue;
            }

            if ((NSInteger)progressMillis >= transcriptTimeMs) {
                [self.triggeredTranscriptTimes addObject:@(transcriptTimeMs)];
                if (self.onTranscriptHighlight) {
                    self.onTranscriptHighlight(@{ @"highLightIndex": @(i) });
                }
            }
        }


          NSMutableSet *timesToRemove = [NSMutableSet set];
          for (NSNumber *triggeredTime in self.triggeredTranscriptTimes) {
              if ((NSInteger)progressMillis < triggeredTime.integerValue) {
                  [timesToRemove addObject:triggeredTime];
                  NSLog(@"🧹 Removed highlight for time: %ld", triggeredTime.integerValue);
              }
          }
          [self.triggeredTranscriptTimes minusSet:timesToRemove];
      }
  
    // Skip forward check
    if (_isVideoWatched) {
        self.lastKnownTime = newTime;
        return;
    }
  
    if(_isFromLandscape){
      return;
    }

    if(self.currentSeekProgressTime > currentSeconds && lastSeconds < self.currentSeekProgressTime){
      self.lastKnownTime = newTime;
    }else{
      Float64 timeDelta = fabs(currentSeconds - lastSeconds);
      if (timeDelta > 1.5 &&
          !self.allowForwardSeek &&
          currentSeconds > lastSeconds &&
          currentSeconds > 0) {

          [self.player seekToTime:self.lastKnownTime
                  toleranceBefore:kCMTimeZero
                   toleranceAfter:kCMTimeZero];
        
          [self updateVideoProgress];
          [self showForwardAwareMessage:@"ⓘ You cannot skip/forward the video" inDefaultView:self];
          return;
      }
    }
    self.lastKnownTime = newTime;
}

- (void) updateVideoProgress {
  if(self.onVideoProgressChange){
    self.onVideoProgressChange(@{});
  }
}

- (void)showNoVideoAvailableMessageInView:(UIView *)defaultContainer {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIView *containerView = nil;

        if (self.landscapeVC && self.landscapeVC.view.window) {
            containerView = self.landscapeVC.view;
        } else {
            containerView = defaultContainer ?: [self topMostWindowView];
        }

        if (!containerView) return;
        
        // First remove any previous "no video" message to avoid duplicates
        UIView *oldView = [containerView viewWithTag:9999];
        if (oldView) {
            [oldView removeFromSuperview];
        }

        // Black background overlay
        UIView *backgroundView = [[UIView alloc] initWithFrame:containerView.bounds];
        backgroundView.backgroundColor = [UIColor blackColor];
        backgroundView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        backgroundView.tag = 9999; // identify later if needed

        // Centered label
        UILabel *messageLabel = [[UILabel alloc] init];
        messageLabel.text = @"No video available";
        messageLabel.textColor = [UIColor whiteColor];
        messageLabel.font = [UIFont boldSystemFontOfSize:16];
        messageLabel.textAlignment = NSTextAlignmentCenter;
        messageLabel.numberOfLines = 0;
        messageLabel.translatesAutoresizingMaskIntoConstraints = NO;

        [backgroundView addSubview:messageLabel];
        [containerView addSubview:backgroundView];
        
        // Center the label with Auto Layout
        [NSLayoutConstraint activateConstraints:@[
            [messageLabel.centerXAnchor constraintEqualToAnchor:backgroundView.centerXAnchor],
            [messageLabel.centerYAnchor constraintEqualToAnchor:backgroundView.centerYAnchor],
            [messageLabel.leadingAnchor constraintGreaterThanOrEqualToAnchor:backgroundView.leadingAnchor constant:20],
            [messageLabel.trailingAnchor constraintLessThanOrEqualToAnchor:backgroundView.trailingAnchor constant:-20]
        ]];
    });
}


- (void)showForwardAwareMessage:(NSString *)message inDefaultView:(UIView *)defaultContainer {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIView *containerView = nil;

        if (self.landscapeVC && self.landscapeVC.view.window) {
            containerView = self.landscapeVC.view;
        } else {
            containerView = defaultContainer ?: [self topMostWindowView];
        }

        if (!containerView) return;

        UIEdgeInsets safeInsets = containerView.safeAreaInsets;
        CGRect bounds = containerView.bounds;

        CGFloat topMargin = safeInsets.top + 10;
        CGFloat horizontalPadding = 20;
        CGFloat maxWidth = bounds.size.width - 40;

        UILabel *messageLabel = [[UILabel alloc] init];
        messageLabel.backgroundColor = [UIColor whiteColor];
        messageLabel.textColor = [UIColor blackColor];
        messageLabel.font = [UIFont systemFontOfSize:12 weight:UIFontWeightMedium];
        messageLabel.textAlignment = NSTextAlignmentCenter;
        messageLabel.text = message;
        messageLabel.numberOfLines = 2;
        messageLabel.layer.cornerRadius = 8;
        messageLabel.layer.masksToBounds = YES;
        messageLabel.layer.shadowColor = [UIColor blackColor].CGColor;
        messageLabel.layer.shadowOpacity = 0.25;
        messageLabel.layer.shadowOffset = CGSizeMake(0, 2);
        messageLabel.layer.shadowRadius = 4;

        CGSize expectedSize = [messageLabel sizeThatFits:CGSizeMake(maxWidth, CGFLOAT_MAX)];
        CGFloat width = expectedSize.width + horizontalPadding * 2;
        CGFloat height = expectedSize.height + 12;
        CGFloat x = (bounds.size.width - width) / 2.0;

        messageLabel.frame = CGRectMake(x, topMargin, width, height);

        [containerView addSubview:messageLabel];
        [containerView bringSubviewToFront:messageLabel];

        messageLabel.alpha = 0;
        [UIView animateWithDuration:0.3 animations:^{
            messageLabel.alpha = 1.0;
        } completion:^(BOOL finished) {
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [UIView animateWithDuration:0.3 animations:^{
                    messageLabel.alpha = 0.0;
                } completion:^(BOOL finished) {
                    [messageLabel removeFromSuperview];
                }];
            });
        }];
    });
}


- (void)checkAudioTrackChanged {
    AVPlayerItem *item = self.player.currentItem;
    AVMediaSelectionGroup *group = [item.asset mediaSelectionGroupForMediaCharacteristic:AVMediaCharacteristicAudible];
    AVMediaSelectionOption *selected = [item selectedMediaOptionInMediaSelectionGroup:group];
     
    NSString *currentLanguage = selected.extendedLanguageTag ?: @"default";
    
    if (![currentLanguage isEqualToString:self.lastAudioTrack]) {
        NSLog(@"🎧 Audio Track Changed: %@", currentLanguage);
        if (self.handleAudioTrackChange) {
            self.handleAudioTrackChange(@{
                @"audioTrack": currentLanguage
            });
        }
        self.lastAudioTrack = currentLanguage;
    }
}

// Implement KVO to observe when player item is ready
- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary<NSKeyValueChangeKey,id> *)change
                       context:(void *)context {
  
    
    if ([keyPath isEqualToString:@"rate"]) {
        float newRate = self.player.rate;
        self.handleSpeedRateChange(@{
          @"playSpeedRate":@(newRate)
        });
    }
  
    if ([keyPath isEqualToString:@"outputVolume"] && object == [AVAudioSession sharedInstance]) {
         float newVolume = [change[NSKeyValueChangeNewKey] floatValue];
         float oldVolume = [change[NSKeyValueChangeOldKey] floatValue];

        self.handleVolumeChange(@{
          @"mute":@(newVolume)
        });
     }
  
    if ([keyPath isEqualToString:@"status"]) {
        AVPlayerItemStatus status = self.player.currentItem.status;

        dispatch_async(dispatch_get_main_queue(), ^{
            if (status == AVPlayerItemStatusReadyToPlay) {
                // Hide loading spinner
                [self.loadingSpinner stopAnimating];
                self.loadingSpinner.hidden = YES;

                // Handle pending seek
                if (self.pendingSeekTime > 0) {
                    CMTime targetTime = CMTimeMakeWithSeconds(self.pendingSeekTime, NSEC_PER_SEC);
                    [self.player seekToTime:targetTime
                           toleranceBefore:kCMTimeZero
                            toleranceAfter:kCMTimeZero];
                    NSLog(@"⏩ Performed pending seek to: %ld sec", (long)self.pendingSeekTime);
                    self.pendingSeekTime = 0;
                }

                // Remove observer once done
                [self.player.currentItem removeObserver:self forKeyPath:@"status"];
            } else if (status == AVPlayerItemStatusFailed) {
                NSLog(@"❌ Player item failed: %@", self.player.currentItem.error);
                [self.loadingSpinner stopAnimating];
                self.loadingSpinner.hidden = YES;

                // Remove observer on failure too
                [self.player.currentItem removeObserver:self forKeyPath:@"status"];
            }
        });
    }
}


#pragma mark - AVAssetResourceLoaderDelegate
- (BOOL)resourceLoader:(AVAssetResourceLoader *)resourceLoader
shouldWaitForLoadingOfRequestedResource:(AVAssetResourceLoadingRequest *)loadingRequest {

    NSURL *url = loadingRequest.request.URL;
    NSString *scheme = url.scheme;
    if (![scheme isEqualToString:@"skd"]) {
        return NO;
    }

    NSString *contentId = url.host;
    AVAssetResourceLoadingDataRequest *dataRequest = loadingRequest.dataRequest;
    AVAssetResourceLoadingContentInformationRequest *infoRequest = loadingRequest.contentInformationRequest;

    NSURL *certURL = [NSURL URLWithString:self.certificateURL];

    NSData *appCertificate = [NSData dataWithContentsOfURL:certURL];
    
    if (!appCertificate) {
        NSError *certError = [NSError errorWithDomain:@"DRM" code:1002 userInfo:@{NSLocalizedDescriptionKey: @"App Certificate not founds "}];
        [loadingRequest finishLoadingWithError:certError];
        return YES;
    }

    NSData *contentIdData = [[url.host stringByRemovingPercentEncoding] dataUsingEncoding:NSUTF8StringEncoding];

    NSError *spcError = nil;
    NSData *spcData = [loadingRequest streamingContentKeyRequestDataForApp:appCertificate
                                                         contentIdentifier:contentIdData
                                                                  options:nil
                                                                    error:&spcError];


    if (spcError || !spcData) {
        [loadingRequest finishLoadingWithError:spcError];
        return YES;
    }

    NSString *spcBase64 = [spcData base64EncodedStringWithOptions:0];

    [self getDrmLicenseWithSpecString:spcBase64 licenseServer:self.licenseServerURL completion:^(NSString *ckcBase64, NSError *error) {
        if (error) {
            NSLog(@"License fetch failed: %@", error);
            [loadingRequest finishLoadingWithError:error];
            return;
        }

        NSData *ckcData = [[NSData alloc] initWithBase64EncodedString:ckcBase64 options:0];
        if (!ckcData) {
            NSLog(@"Invalid CKC data");
            [loadingRequest finishLoadingWithError:[NSError errorWithDomain:@"DRM" code:1001 userInfo:nil]];
            return;
        }

        [dataRequest respondWithData:ckcData];
        [loadingRequest finishLoading];
    }];

    return YES;
}

- (void)getDrmLicenseWithSpecString:(NSString *)specString
                      licenseServer:(NSString *)licenseServer
                         completion:(void (^)(NSString *license, NSError *error))completion {

    NSURL *url = [NSURL URLWithString:licenseServer];
    NSDictionary *parameters = @{@"server_playback_context": specString};

    NSError *jsonError;
    NSData *bodyData = [NSJSONSerialization dataWithJSONObject:parameters options:0 error:&jsonError];
    if (jsonError) {
        completion(nil, jsonError);
        return;
    }

    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    request.HTTPMethod = @"POST";
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    request.HTTPBody = bodyData;

    NSURLSessionDataTask *task = [[NSURLSession sharedSession]
        dataTaskWithRequest:request
          completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
              if (error) {
                  completion(nil, error);
                  return;
              }

              NSString *base64License = [data base64EncodedStringWithOptions:0];
              completion(base64License, nil);
          }];

    [task resume];
}

- (NSString *)extractAssetIdFromSKDURL:(NSURL *)url {
    NSString *urlString = url.absoluteString;
    NSString *pattern = @"assetId=([^&]+)";
    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:pattern
                                                                           options:0
                                                                             error:nil];
    NSTextCheckingResult *match = [regex firstMatchInString:urlString options:0 range:NSMakeRange(0, urlString.length)];
    if (match) {
        NSRange assetIdRange = [match rangeAtIndex:1];
        return [urlString substringWithRange:assetIdRange];
    }
    return nil;
}

- (void)didTapNext {
    if (self.videoPlayIndex + 1 >= self._VideoIds.count) {
        NSLog(@"⚠️ Already at the last video. Cannot go forward.");
        return;
    }
    self.videoPlayIndex += 1;
    [self playVideoAtCurrentIndex];
    [self startToggleControlsTimer];

}

- (void)didTapPrevious {
    if (self.videoPlayIndex == 0) {
        NSLog(@"⚠️ Already at the first video. Cannot go back further.");
        return;
    }
    self.videoPlayIndex -= 1;
    [self playVideoAtCurrentIndex];
    [self startToggleControlsTimer];

}

- (void)playVideoAtCurrentIndex {
    if (self.videoPlayIndex < self._VideoIds.count) {
        id videoIdObj = self._VideoIds[self.videoPlayIndex];
        NSString *videoId = nil;

        if ([videoIdObj isKindOfClass:[NSString class]]) {
            videoId = (NSString *)videoIdObj;
        } else if ([videoIdObj respondsToSelector:@selector(stringValue)]) {
            videoId = [videoIdObj stringValue];
        }

        if (videoId.length > 0) {
            [self fetchBrightcoveVideo:videoId];
            if (self.onMultiVideoChange) {
              self.onMultiVideoChange(@{ @"selectedBrightCoveId": videoId });
            }
            NSLog(@"▶️ Playing Brightcove video at index %ld with ID: %@", (long)self.videoPlayIndex, videoId);
            return;
        }
    }
}

- (void)didTapMultiVideo:(UIButton *)sender {
      if (self.onMultiVideo) {
        self.onMultiVideo(@{});
      }
    [self startToggleControlsTimer];
}

- (void) handleMultiVideoButtonTap {
  if (self.onMultiVideo) {
    self.onMultiVideo(@{});
  }
  [self startToggleControlsTimer];
}

- (void)didTapClose {
  [self handleScreenOrientation:NO];  // force POTRATE

    dispatch_async(dispatch_get_main_queue(), ^{
        [self.landscapeVC willMoveToParentViewController:nil];
        [self.landscapeVC.view removeFromSuperview];
        [self.landscapeVC removeFromParentViewController];
        self.landscapeVC = nil;

        // Optionally force portrait
        NSNumber *value = @(UIInterfaceOrientationPortrait);
        [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
        [UIViewController attemptRotationToDeviceOrientation];
    });
}

#pragma mark - Helper
- (void)resetPlayer {
    [self cleanupResources];

    // Pause and clear player
    if (self.player) {
        [self.player pause];
        [self.player replaceCurrentItemWithPlayerItem:nil];
        self.player = nil;
    }

    // Dismiss landscape view controller if visible
    if (self.landscapeVC) {
        UIViewController *parentVC = [self parentViewController];
        if (parentVC.presentedViewController == self.landscapeVC) {
            [self.landscapeVC dismissViewControllerAnimated:NO completion:nil];
        }
        self.landscapeVC.player = nil;
        self.landscapeVC = nil;
    }

    // Remove player view controller from parent
    if (self.playerViewController) {
        [self.playerViewController.view removeFromSuperview];
        [self.playerViewController removeFromParentViewController];
        self.playerViewController = nil;
    }
}

#pragma mark - Cleanup
- (void)cleanupResources {
    [self invalidateTimers];
    [self removeObservers];
    [self removeNotifications];
}

- (void)invalidateTimers {
    if (_audioTrackTimer) {
        [_audioTrackTimer invalidate];
        _audioTrackTimer = nil;
    }

    if (_timeObserverToken && _player) {
        [_player removeTimeObserver:_timeObserverToken];
        _timeObserverToken = nil;
        NSLog(@"🧹 Time observer removed");
    }
}

- (void)removeObservers {
    @try {
        if (_player) {
            [_player removeObserver:self forKeyPath:@"rate"];
        }
    } @catch (NSException *exception) {
        NSLog(@"⚠️ Exception removing KVO for rate: %@", exception);
    }

    @try {
        if (_player.currentItem) {
            [_player.currentItem removeObserver:self forKeyPath:@"status"];
        }
    } @catch (NSException *exception) {
        NSLog(@"⚠️ Exception removing KVO for status: %@", exception);
    }

    @try {
        [[AVAudioSession sharedInstance] removeObserver:self forKeyPath:@"outputVolume"];
    } @catch (NSException *exception) {
        NSLog(@"⚠️ Exception removing KVO for outputVolume: %@", exception);
    }

    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)removeNotifications {
    if (_player.currentItem) {
        [[NSNotificationCenter defaultCenter] removeObserver:self
                                                        name:AVPlayerItemDidPlayToEndTimeNotification
                                                      object:_player.currentItem];
    }
}

#pragma mark - Public

- (void)dispose {
    [self cleanupResources];

    if (_player) {
        [_player pause];
        _player = nil;
    }

    if (_playerViewController) {
        [_playerViewController.view removeFromSuperview];
        [_playerViewController removeFromParentViewController];
        _playerViewController = nil;
    }

    _landscapeVC = nil;
}

- (void)removeFromSuperview {
    [self dispose];
    [super removeFromSuperview];
}

- (void)dealloc {
    [self dispose];
}


#pragma mark - Utilities

- (UIViewController *)viewController {
    UIResponder *responder = self;
    while ((responder = [responder nextResponder])) {
        if ([responder isKindOfClass:[UIViewController class]]) {
            return (UIViewController *)responder;
        }
    }
    return nil;
}

- (UIView *)topMostWindowView {
    UIWindow *keyWindow = [UIApplication sharedApplication].keyWindow;
    if (@available(iOS 13.0, *)) {
        for (UIWindowScene *scene in [UIApplication sharedApplication].connectedScenes) {
            if (scene.activationState == UISceneActivationStateForegroundActive) {
                keyWindow = scene.windows.firstObject;
                break;
            }
        }
    }
    return keyWindow;
}

//- (UIViewController *)topMostViewController {
//    UIViewController *topVC = [UIApplication sharedApplication].keyWindow.rootViewController;
//    while (topVC.presentedViewController) {
//        topVC = topVC.presentedViewController;
//    }
//    return topVC;
//}


@end
