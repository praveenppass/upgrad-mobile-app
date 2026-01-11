import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";

import { AuthRouteProps } from "@interface/types/rootAuthStack.type";

export const useLoginController = () => {
	const [componentType, setComponentType] = useState(Number);
	// const { onLoginView, onTrackBackBtn } = useAuthEvents();
	const [isModelPopup, setModelPopup] = useState(false);
	const onCountryClick = () => setModelPopup(true);
	const inputRef = useRef<TextInput>(null);
	const route = useRoute<AuthRouteProps<"LoginView">>();
	useEffect(() => {
		let componentcheckType = 1;
		if (route.params?.loginType == "email") {
			componentcheckType = 2;
		}
		setComponentType(componentcheckType);
	}, []);

	const handleFocus = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const extraValidation = () => {
		let obj = {};
		if (componentType == 1) {
			obj = {
				minLength: {
					value: 10,
					message: "",
				},
				maxLength: {
					value: 10,
					message: "",
				},
			};
		}
		return obj;
	};

	return {
		extraValidation,
		isModelPopup,
		setModelPopup,
		handleFocus,
		onCountryClick,
		// onLoginView,
		// onTrackBackBtn,
		componentType,
		setComponentType,
	};
};

export default useLoginController;
