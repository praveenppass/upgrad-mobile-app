import { useState, useEffect } from "react";

const useTimer = () => {
	const [seconds, setSeconds] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let interval: string | number | NodeJS.Timeout | undefined;
		if (isRunning) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds + 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isRunning]);

	const start = () => {
		setIsRunning(true);
	};

	const stop = () => {
		setIsRunning(false);
	};

	const reset = () => {
		setIsRunning(false);
		setSeconds(0);
	};

	return { seconds, isRunning, start, stop, reset };
};

export default useTimer;
