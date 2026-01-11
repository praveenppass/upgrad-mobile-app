import { useEffect } from "react";
import Sound from "react-native-sound";

import { S3_BUCKET_BASE_URL } from "@utils/constants";

const MICRO_INTERACTION_AUDIO_URL = `${S3_BUCKET_BASE_URL}/audio/micro_interaction.mp3`;

const COOLDOWN_DURATION_MS = 2000;

let lastPlaybackTime = 0;

const useMicroInteractionAudio = (playAudio: boolean) => {
	useEffect(() => {
		if (!playAudio) return;

		const now = Date.now();
		const timeSinceLastPlayback = now - lastPlaybackTime;

		if (timeSinceLastPlayback < COOLDOWN_DURATION_MS) return;

		Sound.setCategory("Playback");

		const sound = new Sound(MICRO_INTERACTION_AUDIO_URL, "", (error) => {
			if (error) return;

			lastPlaybackTime = Date.now();
			sound.play(sound.release);
		});
	}, [playAudio]);
};

export default useMicroInteractionAudio;
