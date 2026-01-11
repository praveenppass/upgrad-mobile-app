import { useState } from "react";

import { useNumberInputWithVerifyModel } from "@components/Inputs/numberInputVerify/useNumberInputWithVerfiyModel";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { strings } from "@assets/strings";

interface INumberInputWithVerifyController {
	onVerifySuccess?: () => void;
}

export const useNumberInputWithVerifyController = ({
	onVerifySuccess,
}: INumberInputWithVerifyController) => {
	const { generateOtpMutation } = useNumberInputWithVerifyModel();

	const [isOtpPopupVisible, setOtpPopupVisible] = useState(false);
	const [isGetOtpLoading, setGetOtpLoading] = useState(false);
	const { showToast } = useToast();

	const getOtp = (mobile: string) => {
		setGetOtpLoading(true);
		const variables = {
			data: {
				isd: "+91",
				mobile: mobile,
				verificationType: "mobile",
			},
		};
		generateOtpMutation({
			variables,
			onCompleted: () => {
				setOtpPopupVisible(true);
				setGetOtpLoading(false);
			},
			onError: (error) => {
				setGetOtpLoading(false);
				if (error) {
					showToast({
						message: strings.ERROR_DESC,
						type: ToastType.ERROR,
					});
				}
			},
		});
	};

	const closeOtpModel = () => {
		onVerifySuccess?.();
		setOtpPopupVisible(false);
	};

	return {
		getOtp,
		closeOtpModel,
		isOtpPopupVisible,
		isGetOtpLoading,
	};
};
