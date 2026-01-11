//
//  SpeechToText.m
//  lexMobileApp
//
//  Created by Firoj  on 16/09/25.
//

#import "SpeechToText.h"
#import <AVFoundation/AVFoundation.h>
#import <Speech/Speech.h>
#import "BrightcovePlayerView.h"

@implementation SpeechToText {
    SFSpeechRecognizer *speechRecognizer;
    SFSpeechAudioBufferRecognitionRequest *recognitionRequest;
    SFSpeechRecognitionTask *recognitionTask;
    AVAudioEngine *audioEngine;
    float previousPlayerVolume;
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[@"onSpeechResult", @"onSpeechError", @"onSpeechEnd"];
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

#pragma mark - Start Listening
RCT_EXPORT_METHOD(startListening:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    if (audioEngine && audioEngine.isRunning) {
        reject(@"already_running", @"Speech recognition already started", nil);
        return;
    }

    [SFSpeechRecognizer requestAuthorization:^(SFSpeechRecognizerAuthorizationStatus status) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (status != SFSpeechRecognizerAuthorizationStatusAuthorized) {
                reject(@"permission_denied", @"Speech recognition permission not granted", nil);
                return;
            }

            NSError *error = nil;
            self->audioEngine = [[AVAudioEngine alloc] init];
            self->speechRecognizer = [[SFSpeechRecognizer alloc] initWithLocale:[NSLocale localeWithLocaleIdentifier:@"en-US"]];

            if (!self->speechRecognizer || !self->speechRecognizer.isAvailable) {
                reject(@"recognizer_unavailable", @"Speech recognizer not available", nil);
                return;
            }

            self->recognitionRequest = [[SFSpeechAudioBufferRecognitionRequest alloc] init];
            self->recognitionRequest.shouldReportPartialResults = YES;

            AVAudioInputNode *inputNode = [self->audioEngine inputNode];
            if (!inputNode) {
                reject(@"input_failed", @"No input node available", nil);
                return;
            }

            // ===== AVAudioSession configuration =====
            AVAudioSession *session = [AVAudioSession sharedInstance];
            [session setCategory:AVAudioSessionCategoryMultiRoute error:&error];
            [session setMode:AVAudioSessionModeDefault error:&error];
            [session setActive:YES error:&error];

            if (error) {
                reject(@"audio_session_error", @"Failed to configure audio session", error);
                return;
            }

            // ===== Recognition task =====
            self->recognitionTask =
            [self->speechRecognizer recognitionTaskWithRequest:self->recognitionRequest
                                                 resultHandler:^(SFSpeechRecognitionResult *result, NSError *error) {
                if (result) {
                    NSString *best = result.bestTranscription.formattedString ?: @"";
                    [self sendEventWithName:@"onSpeechResult" body:best];
                    if (result.isFinal) {
                        [self sendEventWithName:@"onSpeechEnd" body:@"finished"];
                    }
                }
                if (error) {
                    [self sendEventWithName:@"onSpeechError"
                                       body:error.localizedDescription ?: @"Unknown error"];
                    [self stopAndCleanup];
                }
            }];

            // ===== Install tap on inputNode =====
            AVAudioFormat *format = [inputNode inputFormatForBus:0];
            [inputNode removeTapOnBus:0];
            [inputNode installTapOnBus:0 bufferSize:1024 format:format block:^(AVAudioPCMBuffer *buffer, AVAudioTime *when) {
                if (self->recognitionRequest) {
                    [self->recognitionRequest appendAudioPCMBuffer:buffer];
                }
            }];

            [self->audioEngine prepare];
            if (![self->audioEngine startAndReturnError:&error]) {
                reject(@"engine_error", @"Failed to start audio engine", error);
                return;
            }

            // ✅ Save & set Brightcove volume
            BrightcovePlayerView *playerView = [BrightcovePlayerView sharedInstance];
            if (playerView && playerView.player) {
                self->previousPlayerVolume = playerView.player.volume;
                playerView.player.volume = 1.0; // optional boost while mic is on
            }

            resolve(@"started");
        });
    }];
}

#pragma mark - Stop Listening
RCT_EXPORT_METHOD(stopListening:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    if (audioEngine && audioEngine.isRunning) {
        [audioEngine stop];
        [recognitionRequest endAudio];
        [self sendEventWithName:@"onSpeechEnd" body:@"stopped"];
        [self stopAndCleanup];

        // ✅ Restore audio session for playback only
        AVAudioSession *session = [AVAudioSession sharedInstance];
        [session setCategory:AVAudioSessionCategoryPlayback error:nil];
        [session setActive:YES error:nil];

        // ✅ Restore Brightcove volume
        BrightcovePlayerView *playerView = [BrightcovePlayerView sharedInstance];
        if (playerView && playerView.player) {
            playerView.player.volume = self->previousPlayerVolume;
        }

        resolve(@"stopped");
    } else {
        reject(@"not_running", @"Speech recognition is not running", nil);
    }
}

#pragma mark - Cleanup
- (void)stopAndCleanup {
    if (recognitionTask) {
        [recognitionTask cancel];
        recognitionTask = nil;
    }
    recognitionRequest = nil;
    audioEngine = nil;
    speechRecognizer = nil;
}

@end

