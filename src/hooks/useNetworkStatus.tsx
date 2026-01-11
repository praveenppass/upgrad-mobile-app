import NetInfo, { type NetInfoState } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { navigator } from "@routes/rootNavigation";

import { appSlice } from "@redux/slices/app.slice";
import { modalSlice } from "@redux/slices/modal.slice";

const useNetworkStatus = () => {
	const dispatch = useDispatch();
	// to identify network status is changed or not
	let STATUS = "NOT_CHANGED";

	const onRetry = () => {
		NetInfo.refresh()
			.then((res) => {
				showNetworkStatus(res);
			})
			.catch(() => {
				//
			});
	};

	const showNetworkStatus = (state: NetInfoState) => {
		const currentRouteName = navigator.getCurrentRoute()?.name;
		const isMainRoute =
			currentRouteName === "MyPrograms" ||
			currentRouteName === "ProfilePage" ||
			currentRouteName === "CoursesPage";
		if (STATUS === "NOT_CHANGED" && state?.isConnected) {
			return;
		} else if (!state?.isConnected) {
			STATUS = "CHANGED";
		}
		if (STATUS === "CHANGED" && state?.isConnected) {
			STATUS = "NOT_CHANGED";
			// state for understanding network status changed...using this we can refetch failed query
			dispatch(appSlice.actions.changeNetworkStatus());
		}
		dispatch(
			modalSlice.actions.showNetworkDownModal({
				type: "network",
				visible: state?.isConnected ?? false,
				tryAgainFunc: isMainRoute ? onRetry : undefined,
			}),
		);
	};

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			showNetworkStatus(state);
		});

		return () => {
			unsubscribe();
		};
	}, []);
};

export default useNetworkStatus;
