//
//  BrightcoveVideoInfo.h
//  lexMobileApp
//
//  Created by Firoj  on 25/06/25.
//

#import <Foundation/Foundation.h>

@interface BrightcoveVideoInfo : NSObject

@property (nonatomic, strong) NSURL *videoURL;
@property (nonatomic, strong, nullable) NSURL *posterURL;
@property (nonatomic, strong, nullable) NSURL *licenseURL;
@property (nonatomic, strong, nullable) NSURL *certificateURL;

@end

