//
//  BrightcoveDataModule.m
//  lexMobileApp
//
//  Created by Firoj  on 25/06/25.
//

#import "BrightcoveDataModule.h"
#import "BrightcovePlayerView.h"

@implementation BrightcoveDataModule

RCT_EXPORT_MODULE(BrightcoveDataModule);

// Example: get current seek time (in seconds)
RCT_REMAP_METHOD(getVideoProgress,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
      double progress = [BrightcovePlayerView sharedInstance].currentProgress;
       NSLog(@"📺 Returning stored progress value: %.2f seconds", progress);
       resolve(@(progress));
    });
}

@end
