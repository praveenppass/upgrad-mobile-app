//
//  BrightcoveVideoService.h
//  lexMobileApp
//
//  Created by Firoj  on 15/06/25.
//

#import <Foundation/Foundation.h>
#import "BrightcoveVideoInfo.h"

typedef void (^BrightcoveVideoFetchCompletion)(BrightcoveVideoInfo *_Nullable info, NSError *_Nullable error);

@interface BrightcoveVideoService : NSObject

@property (nonatomic, strong) NSString *accountId;
@property (nonatomic, strong) NSString *policyKey;

+ (instancetype)sharedService;

- (void)fetchVideoWithId:(NSString *)videoId completion:(BrightcoveVideoFetchCompletion)completion;

@end
