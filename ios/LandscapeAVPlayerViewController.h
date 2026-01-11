//
//  LandscapeAVPlayerViewController.h
//  lexMobileApp
//
//  Created by Firoj  on 01/06/25.
//

#import <AVKit/AVKit.h>

@protocol LandscapeAVPlayerDelegate <NSObject>
@optional
- (void)didTapClose;
- (void)didTapPrevious;
- (void)didTapNext;
- (void)handleMultiVideoButtonTap;

@end

@interface LandscapeAVPlayerViewController : AVPlayerViewController

@property (nonatomic, strong) NSArray<NSString *> *videoIds;
@property (nonatomic, assign) NSInteger videoPlayIndex;

@property (nonatomic, strong) AVPlayer *player;
@property (nonatomic, weak) id<LandscapeAVPlayerDelegate> delegate;

@property (nonatomic, copy) NSString *accountId;
@property (nonatomic, copy) NSString *policyKey;

/// Update video while in fullscreen
- (void)updateVideoWithPlayerItem:(AVPlayerItem *)item atIndex:(NSInteger)index;

@end
