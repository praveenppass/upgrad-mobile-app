#import "LandscapeAVPlayerViewController.h"
#import <AVKit/AVKit.h>

@interface LandscapeAVPlayerViewController () <UIGestureRecognizerDelegate>

@property (nonatomic, strong) AVPlayerViewController *playerVC;
@property (nonatomic, strong) UIButton *closeButton;

@property (nonatomic, strong) UIButton *nextButton;
@property (nonatomic, strong) UIButton *previousButton;
@property (nonatomic, strong) UIButton *multiIconButton;


@end

@implementation LandscapeAVPlayerViewController

@synthesize videoIds = _videoIds;

#pragma mark - Orientation
//
//- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
//    return UIInterfaceOrientationMaskLandscape;
//}
//
//- (BOOL)shouldAutorotate {
//    return YES;
//}

#pragma mark - Lifecycle

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = UIColor.blackColor;

  NSLog(@"THIS IS BASICALY TO TEST THIS UI IS FOR LANDSCAPE");
    [self setupPlayer];
    [self setupCloseButton];
    if(self.videoIds.count > 1){
      [self setupCustomButtons];
    }
    
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    // Force device to landscape
//    NSNumber *value = @(UIInterfaceOrientationLandscapeRight);
//    [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
//    [UIViewController attemptRotationToDeviceOrientation];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];

    // Revert to portrait
    NSNumber *value = @(UIInterfaceOrientationPortrait);
    [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
    [UIViewController attemptRotationToDeviceOrientation];
}

- (void)replaceCurrentPlayerItem:(AVPlayerItem *)item atIndex:(NSInteger)index {
    if (!item || !self.player) return;

    // Remove KVOs or observers if needed from old item
    AVPlayerItem *oldItem = self.player.currentItem;
    if (oldItem) {
        [[NSNotificationCenter defaultCenter] removeObserver:self
                                                        name:AVPlayerItemDidPlayToEndTimeNotification
                                                      object:oldItem];
    }

    [self.player replaceCurrentItemWithPlayerItem:item];
    self.videoPlayIndex = index;

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(playerItemDidPlayToEnd:)
                                                 name:AVPlayerItemDidPlayToEndTimeNotification
                                               object:item];

    [self.player play];
}

- (void)playerItemDidPlayToEnd:(NSNotification *)notification {
  
    // Auto-play next if needed
}


#pragma mark - Setup Player
- (void)setupPlayer {
    if (!self.player) return;

    self.playerVC = [[AVPlayerViewController alloc] init];
    self.playerVC.player = self.player;
    self.playerVC.view.frame = self.view.bounds;
    self.playerVC.view.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.playerVC.showsPlaybackControls = YES;
    self.playerVC.allowsPictureInPicturePlayback = NO;
  
    self.playerVC.entersFullScreenWhenPlaybackBegins = NO;
    self.playerVC.exitsFullScreenWhenPlaybackEnds = NO;


    [self addChildViewController:self.playerVC];
    [self.view addSubview:self.playerVC.view];
    [self.playerVC didMoveToParentViewController:self];
  
    [self.view bringSubviewToFront:self.closeButton];
    [self.view bringSubviewToFront:self.previousButton];
    [self.view bringSubviewToFront:self.nextButton];
    [self.view bringSubviewToFront:self.multiIconButton];
}

- (void)setupCustomButtons {
    self.previousButton = [self createButtonWithImage:@"prev_icon" action:@selector(didTapPrevious:)];
    self.nextButton     = [self createButtonWithImage:@"next_icon" action:@selector(didTapNext:)];
    self.multiIconButton = [self createButtonWithImage:@"multi_video_icon" action:@selector(didTapMultiVideo:)];

    for (UIButton *button in @[self.previousButton, self.nextButton, self.multiIconButton]) {
        button.translatesAutoresizingMaskIntoConstraints = NO;
        [self.view addSubview:button]; // ✅ Add to self.view
        [self.view bringSubviewToFront:button];
    }

    // Add constraints
    [NSLayoutConstraint activateConstraints:@[
        [self.previousButton.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor constant:20],
        [self.previousButton.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor constant:-60],
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
    } else if ([imageName isEqualToString:@"next_icon"]) {
        BOOL isLast = (self.videoPlayIndex >= self.videoIds.count - 1);
        button.tintColor = NO ? [UIColor grayColor] : [UIColor whiteColor];
    } else {
        button.tintColor = [UIColor whiteColor];
    }

    button.backgroundColor = [UIColor clearColor];
    button.imageView.contentMode = UIViewContentModeScaleAspectFit;
    [button addTarget:self action:action forControlEvents:UIControlEventTouchUpInside];

    return button;
}


#pragma mark - Close Button
- (void)setupCloseButton {
    self.closeButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [self.closeButton setTitle:@"" forState:UIControlStateNormal];
    [self.closeButton setTitleColor:UIColor.whiteColor forState:UIControlStateNormal];
    self.closeButton.titleLabel.font = [UIFont boldSystemFontOfSize:30];
//    self.closeButton.backgroundColor = [UIColor colorWithWhite:0 alpha:0.6];
//    self.closeButton.layer.cornerRadius = 22;
    self.closeButton.clipsToBounds = YES;
    self.closeButton.translatesAutoresizingMaskIntoConstraints = NO;

    self.closeButton.contentEdgeInsets = UIEdgeInsetsMake(10, 10, 10, 10); // top, left, bottom, right

    [self.closeButton addTarget:self action:@selector(closeTapped) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.closeButton];

    // ⬅️ Move to top-left corner
    [NSLayoutConstraint activateConstraints:@[
        [self.closeButton.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor constant:1],
        [self.closeButton.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:1],
        [self.closeButton.widthAnchor constraintEqualToConstant:56],
        [self.closeButton.heightAnchor constraintEqualToConstant:56]
    ]];
}



- (void)closeTapped {
    if ([self.delegate respondsToSelector:@selector(didTapClose)]) {
        [self.delegate didTapClose];
    } else {
        [self dismissViewControllerAnimated:YES completion:nil];
    }
}
- (void)didTapPrevious:(UIButton *)sender {
    NSLog(@"⬅️ Previous button tapped");
    if ([self.delegate respondsToSelector:@selector(didTapPrevious)]) {
        [self.delegate didTapPrevious];
    }
}

- (void)didTapNext:(UIButton *)sender {
    NSLog(@"➡️ Next button tapped");
    if ([self.delegate respondsToSelector:@selector(didTapNext)]) {
        [self.delegate didTapNext];
    }
}

- (void)didTapMultiVideo:(UIButton *)sender {
    NSLog(@"🎬 Multi video button tapped");
    if ([self.delegate respondsToSelector:@selector(handleMultiVideoButtonTap)]) {
        [self.delegate handleMultiVideoButtonTap];
    }
}

- (void)updateVideoWithPlayerItem:(AVPlayerItem *)item atIndex:(NSInteger)index {
    self.videoPlayIndex = index;
    
    if (!self.player) {
        self.player = [AVPlayer playerWithPlayerItem:item];
    } else {
        [self.player replaceCurrentItemWithPlayerItem:item];
    }

    if (!self.playerVC) {
        [self setupPlayer];
    } else {
        self.playerVC.player = self.player;
    }

    [self.player play];
}
  

@end
