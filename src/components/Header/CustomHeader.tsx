import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useGlobalEventAnalytics } from "@hooks/useGlobalEventAnalytics";

import { HOME_ROUTES, HOME_TAB_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { moderateScale } from "@utils/functions";

import { type ICustomHeaderProps } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { UpGradLogo } from "@assets/icons";

const {
	themes: { primary, bg },
	commonStyles: {
		spacing: { p6, g14, pl8, pr8, pb10 },
		align: { rowStart, itemsCenter, rowBetween, overFlowHidden },
	},
} = C;

const { icon } = colors;

const CustomHeader = ({ isBack = false }: ICustomHeaderProps) => {
	// TODO: Removed as requested for UpGrad LEX Learning App
	// const dispatch = useDispatch();
	const { goBack, navigate } = useAppNavigation();

	// TODO: Removed as requested for UpGrad LEX Learning App
	const {
		// topNavStreakTapEvent,
		topNavNotificationTapEvent,
		// topNavCoinTapEvent,
		topHomeIconTapEvent,
	} = useGlobalEventAnalytics();

	// TODO: Removed as requested for UpGrad LEX Learning App
	// const userDetails = useSelector((state: RootState) => state.app.userDetails);

	const onNavigateHome = () => {
		navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.MainTabs,
			params: {
				screen: HOME_TAB_ROUTES.MyPrograms,
			},
		});
		topHomeIconTapEvent();
	};

	// TODO: Removed as requested for UpGrad LEX Learning App
	// const onStreakHandler = () => {
	// 	topNavStreakTapEvent();
	// 	dispatch(modalSlice.actions.showStreakModal());
	// };

	const onNotificationTap = () => {
		topNavNotificationTapEvent();
	};

	// TODO: Removed as requested for UpGrad LEX Learning App
	// const onCoinIconTap = () => {
	// 	topNavCoinTapEvent();
	// };
	// const isNetworkBack = useSelector((state: RootState) => state.app.isNetworkBack);
	// const {
	// 	user: { id },
	// } = useSelector((state: RootState) => state.user);

	// TODO: Removed as requested for UpGrad LEX Learning App
	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		refetchGamification();
	// 		return () => {
	// Clean up if needed
	// 		};
	// 	}, []),
	// );

	// TODO: Removed as requested for UpGrad LEX Learning App
	// const {
	// 	data: gamificationData,
	// 	error: gamificationError,
	// 	refetch: refetchGamification,
	// } = useQuery(getGamificationDetails, {
	// 	client,
	// 	variables: {
	// 		where: {
	// 			user: id,
	// 		},
	// 	},
	// });

	// TODO: Removed as requested for UpGrad LEX Learning App
	// useEffect(() => {
	// 	if (gamificationError || isNetworkBack) {
	// 		refetchGamification();
	// 	}
	// }, [gamificationError, isNetworkBack]);

	return (
		<View style={[pb10, overFlowHidden, styles.bgParent]}>
			<View style={[p6, pl8, pr8, styles.container, rowBetween]}>
				{isBack ? (
					<TouchableOpacity onPress={goBack} style={itemsCenter}>
						<UpGradLogo color={icon.default_red} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={itemsCenter}
						onPress={onNavigateHome}
					>
						<UpGradLogo color={icon.default_red} />
					</TouchableOpacity>
				)}
				<View style={[rowStart, g14]}>
					{/* // TODO: Removed as requested for UpGrad LEX Learning App */}
					{/* {userDetails?.me?.gamificationProfile ? (
						<>
							<HeaderProgressBar
								disabled
								icon={<CoinIcon />}
								onButtonHandler={onCoinIconTap}
								title={gamificationData?.gamificationProfile?.points?.toString()}
							/>
							<HeaderProgressBar
								desc="200"
								icon={<StreakIcon />}
								onButtonHandler={onStreakHandler}
								title={gamificationData?.gamificationProfile?.dayStreak?.completedDays?.toString()}
							/>
						</>
					) : null} */}
					{/* <TouchableOpacity onPress={onNotificationTap}>
						<NotificationIcon />
					</TouchableOpacity> */}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bgParent: {
		backgroundColor: bg.primary,
		height: moderateScale(56),
	},
	container: {
		backgroundColor: primary.color2,
		elevation: 9,
		height: moderateScale(56),
		shadowColor: primary.color3,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
	},
});

export default memo(CustomHeader);
