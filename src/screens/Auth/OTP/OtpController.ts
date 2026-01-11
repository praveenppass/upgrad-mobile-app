import { useEffect, useState } from "react";
import { authSlice } from "@redux/slices/auth.slice";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { AuthRouteProps } from "@interface/types/rootAuthStack.type";
import { useForm } from "react-hook-form";
import { navigator } from "@routes/rootNavigation";

type FormInputs = {
	pinCode: string;
};

export const useOtpController = () => {
	let intervalId: any;
	const dispatch = useDispatch();
	const [timer, setTimer] = useState<number>(30);
	const route = useRoute<AuthRouteProps<"OtpView">>();
	const { credential, loginType } = route.params;
	const { clearErrors, reset, setValue } = useForm<FormInputs>({
		mode: "all",
	});

	useEffect(() => {
		if (timer > 0) {
			intervalId = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		}
		return () => {
			// @ts-ignore NodeJS.Timer conflicts with number
			clearInterval(intervalId);
		};
	}, [timer]);

	const onResend = () => {
		reset({}, { keepValues: true });
		dispatch(
			authSlice.actions.login({
				username: credential,
				loginType: loginType,
				type: "resend",
			}),
		);
	};

	const onGoBack = () => {
		dispatch(authSlice.actions.onAuthError(""));
		reset({}, { keepValues: true });
		clearErrors();
		navigator.reset({
			index: 0,
			routes: [
				{
					name: "LoginView",
					params: { credential: null, loginType: loginType },
				},
			],
		});
	};

	const handleEditCredential = () => {
		// Clear the error message and pin code
		dispatch(authSlice.actions.onAuthError(""));
		setValue("pinCode", "");
		// Navigate back to the Login screen
		navigator.reset({
			index: 0,
			routes: [
				{
					name: "LoginView",
					params: { credential: credential, loginType: loginType },
				},
			],
		});
	};

	return {
		handleEditCredential,
		onGoBack,
		onResend,
		timer,
		setTimer,
	};
};

export default useOtpController;
