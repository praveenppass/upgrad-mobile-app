import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

interface IUseAppStateParams {
	handleForeground?: () => void;
	handleBackground?: () => void;
}

export enum IAppStateStatusEnum {
	ACTIVE = "active",
	BACKGROUND = "background",
	INACTIVE = "inactive",
}

let isAppStateBlocked = false;

const createAppStateManager = () => {
	const setIsAppStateBlocked = (isBlocked: boolean) =>
		(isAppStateBlocked = isBlocked);
	const isBlocked = () => isAppStateBlocked;

	return { setIsAppStateBlocked, isBlocked };
};

export const AppStateManager = createAppStateManager();

/**
 * AppState Listener for foreground and background changes.
 *
 * @param onForeground Called when the app comes to the foreground
 * @param onBackground Called when the app goes to the background
 */
const useAppState = ({
	handleForeground,
	handleBackground,
}: IUseAppStateParams) => {
	useEffect(() => {
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			const isBlocked = AppStateManager.isBlocked();

			if (nextAppState === IAppStateStatusEnum.ACTIVE && !isBlocked)
				handleForeground?.();
			else if (
				nextAppState === IAppStateStatusEnum.BACKGROUND &&
				!isBlocked
			)
				handleBackground?.();
		};

		const subscription = AppState.addEventListener(
			"change",
			handleAppStateChange,
		);

		return () => subscription.remove();
	}, [handleForeground, handleBackground]);
};

export default useAppState;
