import { useNavigation } from "@react-navigation/core";
import { useModal } from "react-native-modalfy";
import { useDispatch, useSelector } from "react-redux";

// import { IAssignment } from "@screens/Tabs/Courses/ManualAssignment/type/AssessmentType";
import GlobeBottomSheetController from "@components/Modals/GlobeBottomSheetController";
import { learningArtifactsDesktopOption } from "@components/Modals/ModalConfig";

import { studyPlanSlice } from "@redux/slices/studyplan.slice";
import { RootState } from "@redux/store/root.reducer";

import { IAssetType } from "@interface/asset.interface";
import { type Asset } from "@interface/milestonetype.interface";

import { C } from "@assets/constants";

const {
	themes: { bg, border },
} = C;

const useAssetHandler = () => {
	const dispatch = useDispatch();

	const { navigate } = useNavigation();
	const selectedAsset = useSelector(
		(state: RootState) => state.studyPlan?.selectedAsset,
	);
	const { currentModal } = useModal();

	// const isAssignmentSupported = (assignment?: IAssignment) => {
	// 	if (!assignment) {
	// 		return false;
	// 	}
	// 	if (assignment?.template?.type === "manual") {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };

	const isAssetSupportedUtil = (type?: IAssetType) => {
		if (type === IAssetType.HAND_ON) {
			return false;
		}
		return true;
	};

	const isAssetSupported = (asset?: Asset | null) => {
		if (!isAssetSupportedUtil(asset?.assetType?.type)) {
			const option = {
				...learningArtifactsDesktopOption,
				iconViewStyle: { marginTop: 0 },
				indicatorColor: border.indicator3,
				backgroundColor: bg.lightOrange,
			};
			GlobeBottomSheetController.showModal(option);
			return false;
		}
		//* Make isResume true if user start to consume assets
		dispatch(
			studyPlanSlice.actions.selectedCourseDetailsAction({
				isResume: true,
			}),
		);
		return true;
	};

	const isSelectedAsset = (asset?: Asset | null) => {
		//* Show Selected Asset UI only if Modal is Open
		if (!currentModal) {
			return false;
		}
		if (asset?.code === selectedAsset?.code) {
			return true;
		}
		return false;
	};

	// const onClickVideo = (
	// 	vimoeId: string,
	// 	events_params: Record<string, unknown>,
	// 	superAssetCode: string,
	// 	assetId: string,
	// 	completed?: string,
	// 	reloadAssetScreen?: () => void,
	// ) =>
	// 	navigate("VimeoPlayerWrapper", {
	// 		vimoeId,
	// 		events_params,
	// 		superAssetCode,
	// 		assetId,
	// 		completed,
	// 		reloadAssetScreen,
	// 	});

	return {
		isAssetSupported,
		isSelectedAsset,
		isAssetSupportedUtil,
		// onClickVideo,
		// isAssignmentSupported,
	};
};

export default useAssetHandler;
