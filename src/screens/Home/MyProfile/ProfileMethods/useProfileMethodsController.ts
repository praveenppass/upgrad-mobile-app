import { useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { IParseFileStatus } from "@screens/Home/MyProfile/ProfileMethods/ParseResumeModal";
import useProfileMethodsModel from "@screens/Home/MyProfile/ProfileMethods/useProfileMethodsModel";

import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { userSlice } from "@redux/slices/user.slice";

import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

const useProfileMethodsController = () => {
	const [isLinkedInModalVisible, setIsLinkedInModalVisible] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isParseFileLoading, setIsParseFileLoading] = useState(false);
	const dispatch = useDispatch();
	const navigation = useAppNavigation();

	const route = useRoute<RootHomeStackRouteProps<"ProfileMethods">>();
	const {
		profileConfigList = [],
		learningPathId,
		learningPathCode,
		learningPathName,
		workshopId,
		workshopCode,
		learningPathType,
	} = route.params || {};

	const navigateToManualProfileFlow = useCallback(
		() =>
			navigation.navigate(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.ManualProfileFlow,
				params: {
					profileConfigList,
					learningPathId,
					learningPathCode,
					learningPathName,
					workshopId,
					workshopCode,
					learningPathType,
				},
			}),
		[
			navigation,
			profileConfigList,
			learningPathId,
			learningPathCode,
			learningPathName,
			workshopId,
			workshopCode,
			learningPathType,
		],
	);

	const { parseLinkedin, parseLinkedinLoading } = useProfileMethodsModel(
		navigateToManualProfileFlow,
	);

	const handleLinkedInParsing = useCallback(
		(url: string) => {
			parseLinkedin({
				variables: {
					linkedInUrl: url,
				},
				onCompleted: (data) => {
					dispatch(
						userSlice.actions.setParsedProfileData(
							data.autofillProfile,
						),
					);
				},
			});
		},
		[parseLinkedin, dispatch],
	);

	const handleLinkedInClose = useCallback(
		() => setIsLinkedInModalVisible(false),
		[],
	);

	const setParseFileStatus = useCallback(
		(status: IParseFileStatus) => {
			if (status === IParseFileStatus.LOADING) {
				setIsParseFileLoading(true);
				setIsModalVisible(false);
			} else {
				setIsParseFileLoading(false);
				if (status === IParseFileStatus.COMPLETED)
					navigateToManualProfileFlow();
			}
		},
		[navigateToManualProfileFlow],
	);

	return {
		parseLinkedinLoading,
		isLinkedInModalVisible,
		setIsLinkedInModalVisible,
		handleLinkedInClose,
		handleLinkedInParsing,
		navigateToManualProfileFlow,
		isModalVisible,
		setIsModalVisible,
		isParseFileLoading,
		setParseFileStatus,
	};
};

export default useProfileMethodsController;
