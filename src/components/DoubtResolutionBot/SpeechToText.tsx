import React, { useCallback, useEffect, useRef } from "react";
import {
	NativeEventEmitter,
	NativeModules,
	PermissionsAndroid,
	Platform,
	Pressable,
	View,
} from "react-native";

import styles from "@components/DoubtResolutionBot/DRBot.styles";
import VoiceWave from "@components/DoubtResolutionBot/VoiceWave";

import { colors } from "@assets/colors";
import { DismissIcon, RightTick } from "@assets/icons";

const { SpeechToText } = NativeModules;
const eventEmitter = new NativeEventEmitter(SpeechToText);
const { neutral } = colors;

interface IVoiceToTextScreen {
	onSave: (text: string) => void;
	onCancel: () => void;
}

const VoiceToTextScreen = ({ onSave, onCancel }: IVoiceToTextScreen) => {
	const finalTextRef = useRef("");
	const partialTextRef = useRef("");

	const requestMicrophonePermission = useCallback(async () => {
		if (Platform.OS === "android") {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
			);
			return granted === PermissionsAndroid.RESULTS.GRANTED;
		}
		return true;
	}, []);

	const startRecording = useCallback(async () => {
		const ok = await requestMicrophonePermission();
		if (!ok) return;
		try {
			SpeechToText.startListening();
			finalTextRef.current = "";
			partialTextRef.current = "";
		} catch (e) {}
	}, [requestMicrophonePermission]);

	const stopRecording = useCallback(() => {
		try {
			SpeechToText.stopListening();
		} catch (e) {}
	}, []);

	const handleSave = useCallback(() => {
		const textToSave = (
			finalTextRef.current ||
			partialTextRef.current ||
			""
		).trim();

		stopRecording();
		onSave(textToSave);
	}, [stopRecording, onSave]);

	useEffect(() => {
		const resultListener = eventEmitter.addListener(
			"onSpeechResult",
			(text: string) => {
				finalTextRef.current = text;
			},
		);

		const partialListener = eventEmitter.addListener(
			"onSpeechPartial",
			(text: string) => {
				partialTextRef.current = text;
			},
		);

		const errorListener = eventEmitter.addListener(
			"onSpeechError",
			(err: any) => {},
		);

		startRecording();

		return () => {
			resultListener.remove();
			partialListener.remove();
			errorListener.remove();
			stopRecording();
		};
	}, [startRecording, stopRecording]);

	const dismissRecording = () => {
		stopRecording();
		onCancel();
	};

	return (
		<View style={styles.inputContainer}>
			<View style={styles.micContainer}>
				<View style={styles.micWaveContainer}>
					<VoiceWave />
				</View>
				<View style={styles.micButtons}>
					<Pressable
						style={styles.buttonPadding}
						onPress={dismissRecording}
					>
						<DismissIcon color={neutral.black} />
					</Pressable>

					<Pressable
						style={styles.buttonPadding}
						onPress={handleSave}
					>
						<RightTick color={neutral.black} />
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default VoiceToTextScreen;
