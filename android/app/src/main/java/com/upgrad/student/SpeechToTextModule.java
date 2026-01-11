package com.upgrad.student;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;

public class SpeechToTextModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private SpeechRecognizer speechRecognizer;

    public SpeechToTextModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "SpeechToText";
    }

    @ReactMethod
    public void startListening() {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            sendEvent("onSpeechError", "No current activity");
            return;
        }

        activity.runOnUiThread(() -> {
            if (SpeechRecognizer.isRecognitionAvailable(reactContext)) {
                if (speechRecognizer == null) {
                    speechRecognizer = SpeechRecognizer.createSpeechRecognizer(activity);
                    speechRecognizer.setRecognitionListener(new RecognitionListener() {
                        @Override
                        public void onReadyForSpeech(Bundle params) {
                          
                        }

                        @Override
                        public void onBeginningOfSpeech() {
                        }

                        @Override
                        public void onRmsChanged(float rmsdB) {}

                        @Override
                        public void onBufferReceived(byte[] buffer) {}

                        @Override
                        public void onEndOfSpeech() {
                        }

                        @Override
                        public void onError(int error) {
                            sendEvent("onSpeechError", "Error code: " + error);
                        }

                        @Override
                        public void onResults(Bundle results) {
                            ArrayList<String> matches =
                                    results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                            if (matches != null && matches.size() > 0) {
                                String spokenText = matches.get(0);
                                sendEvent("onSpeechResult", spokenText);
                            }
                        }

                        @Override
                        public void onPartialResults(Bundle partialResults) {
                            ArrayList<String> partial =
                                    partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                            if (partial != null && partial.size() > 0) {
                                String partialText = partial.get(0);
                                sendEvent("onSpeechPartial", partialText);
                            }
                        }

                        @Override
                        public void onEvent(int eventType, Bundle params) {}
                    });
                }

                Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                        RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US");
                intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
                intent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, reactContext.getPackageName());
                speechRecognizer.startListening(intent);
            } else {
                sendEvent("onSpeechError", "Speech recognition not available");
            }
        });
    }

    @ReactMethod
    public void stopListening() {
        Activity activity = getCurrentActivity();
        if (activity == null) return;

        activity.runOnUiThread(() -> {
            if (speechRecognizer != null) {
                speechRecognizer.stopListening();
                speechRecognizer.cancel();
                speechRecognizer.destroy();
                speechRecognizer = null;
            }
        });
    }

    private void sendEvent(String eventName, String data) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
    }
}
