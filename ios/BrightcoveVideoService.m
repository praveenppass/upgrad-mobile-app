//
//  BrightcoveVideoService.m
//  lexMobileApp
//
//  Created by Firoj  on 15/06/25.
//
// BrightcoveVideoService.m

#import "BrightcoveVideoService.h"

@implementation BrightcoveVideoService

+ (instancetype)sharedService {
    static BrightcoveVideoService *sharedService = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedService = [[self alloc] init];
    });
    return sharedService;
}
- (void)fetchVideoWithId:(NSString *)videoId completion:(BrightcoveVideoFetchCompletion)completion {
    if (!self.accountId || !self.policyKey) {
        NSError *configError = [NSError errorWithDomain:@"Brightcove" code:401 userInfo:@{NSLocalizedDescriptionKey: @"Missing accountId or policyKey"}];
        if (completion) completion(nil, configError);
        return;
    }

    NSString *urlStr = [NSString stringWithFormat:@"https://edge.api.brightcove.com/playback/v1/accounts/%@/videos/%@", self.accountId, videoId];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:urlStr]];
    [request setValue:[NSString stringWithFormat:@"application/json;pk=%@", self.policyKey] forHTTPHeaderField:@"Accept"];

    NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request
                                                                 completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error || !data) {
            NSLog(@"❌ Error fetching Brightcove video: %@", error.localizedDescription);
            if (completion) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    completion(nil, error);
                });
            }
            return;
        }

        NSError *jsonError;
        id json = [NSJSONSerialization JSONObjectWithData:data options:0 error:&jsonError];
        if (jsonError) {
            NSLog(@"❌ Error parsing JSON: %@", jsonError.localizedDescription);
            if (completion) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    completion(nil, jsonError);
                });
            }
            return;
        }

        NSLog(@"json: %@", json);
        NSLog(@"json class: %@", [json class]);

        // Handle error case if API returns an array of errors
        if ([json isKindOfClass:[NSArray class]]) {
            NSArray *jsonArray = (NSArray *)json;
            if (jsonArray.count > 0 && [jsonArray[0] isKindOfClass:[NSDictionary class]]) {
                NSDictionary *errorDict = jsonArray[0];
                NSString *message = errorDict[@"message"] ?: @"Unknown Brightcove error";
                NSInteger errorCode = errorDict[@"error_code"] ? 403 : 400;

                NSError *apiError = [NSError errorWithDomain:@"Brightcove"
                                                        code:errorCode
                                                    userInfo:@{NSLocalizedDescriptionKey: message}];
                dispatch_async(dispatch_get_main_queue(), ^{
                    completion(nil, apiError);
                });
                return;
            }
        }

        // If it's not a dictionary, fail gracefully
        if (![json isKindOfClass:[NSDictionary class]]) {
            NSError *invalidFormatError = [NSError errorWithDomain:@"Brightcove" code:422 userInfo:@{NSLocalizedDescriptionKey: @"Invalid response format"}];
            dispatch_async(dispatch_get_main_queue(), ^{
                completion(nil, invalidFormatError);
            });
            return;
        }

        NSDictionary *jsonDict = (NSDictionary *)json;
        BrightcoveVideoInfo *info = [[BrightcoveVideoInfo alloc] init];

        // Optional: Poster URL
        NSString *posterURLString = jsonDict[@"poster"];
        if ([posterURLString isKindOfClass:[NSString class]]) {
            info.posterURL = [NSURL URLWithString:posterURLString];
        }

        NSArray *sources = jsonDict[@"sources"];
        NSDictionary *source = nil;
        for (NSDictionary *s in sources) {
            if ([s[@"type"] isEqualToString:@"application/x-mpegURL"]) {
                source = s;
                break;
            }
        }

        if (!source) {
            NSError *noSourceError = [NSError errorWithDomain:@"Brightcove" code:404 userInfo:@{NSLocalizedDescriptionKey: @"No playable source found"}];
            dispatch_async(dispatch_get_main_queue(), ^{
                completion(nil, noSourceError);
            });
            return;
        }

        NSString *src = source[@"src"];
        if (!src) {
            NSError *missingSrcError = [NSError errorWithDomain:@"Brightcove" code:400 userInfo:@{NSLocalizedDescriptionKey: @"Missing src in source"}];
            dispatch_async(dispatch_get_main_queue(), ^{
                completion(nil, missingSrcError);
            });
            return;
        }

        NSURLComponents *components = [NSURLComponents componentsWithString:src];
        components.scheme = @"https";
        info.videoURL = components.URL;

        NSDictionary *keySystems = source[@"key_systems"];
        NSDictionary *fairplay = keySystems[@"com.apple.fps.1_0"];
        if (fairplay) {
            NSString *licenseURLStr = fairplay[@"key_request_url"];
            NSString *certificateURLStr = fairplay[@"certificate_url"];
            info.licenseURL = licenseURLStr ? [NSURL URLWithString:licenseURLStr] : nil;
            info.certificateURL = certificateURLStr ? [NSURL URLWithString:certificateURLStr] : nil;
        } else {
            NSLog(@"⚠️ No FairPlay key system found.");
        }

        dispatch_async(dispatch_get_main_queue(), ^{
            completion(info, nil);
        });
    }];
    
    [task resume];
}

@end
