import { useEffect, useState } from "react";

import { useOtpModel } from "@components/Inputs/otpInput/useOtpModel";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { strings } from "@assets/strings";

export interface IOtpInput {
	isVisible: boolean;
	mobileNumber: string;
	handleModal: () => void;
}
export const useOtpController = ({
	isVisible,
	mobileNumber,
	handleModal,
}: IOtpInput) => {
	const { showToast } = useToast();

	const { verifyOtpMutation, generateOtpMutation } = useOtpModel();

	const [otp, setOtp] = useState("");
	const [timer, setTimer] = useState(0);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		if (timer === 0) return;
		const interval = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, [timer]);

	const onTextChange = (value: string) => {
		setOtp(value);
		setErrorMsg("");
	};

	useEffect(() => {
		setTimer(30);
		setErrorMsg("");
		setOtp("");
	}, [isVisible]);

	const verifyOtp = () => {
		const variables = {
			data: {
				isd: "+91",
				mobile: mobileNumber,
				token: otp,
				verificationType: "mobile",
			},
		};
		verifyOtpMutation({
			variables,
			onCompleted: () => {
				handleModal();
				setOtp("");
			},
			onError: (error) => {
				setOtp("");
				if (error) {
					setErrorMsg(strings.INCORRECT_OTP);
				}
			},
		});
	};

	const generateOtp = () => {
		const variables = {
			data: {
				isd: "+91",
				mobile: mobileNumber,
				verificationType: "mobile",
			},
		};
		generateOtpMutation({
			variables,
			onError: () => {
				setOtp("");
				showToast({
					message: strings.ERROR_DESC,
					type: ToastType.ERROR,
				});
			},
		});
	};

	const handleResendOtp = () => {
		generateOtp();
		setTimer(30);
	};

	return {
		otp,
		timer,
		errorMsg,
		verifyOtp,
		handleResendOtp,
		onTextChange,
	};
};
