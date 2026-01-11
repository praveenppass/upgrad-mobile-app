import { useAssetTranslation } from "@contexts/AssetTranslationContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { useClassOpinionAssetModel } from "@components/asset/classOpinion";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { IUpdateClassOpinionCourseStatusQueryVariables } from "@graphql/mutation/asset/classOpinion/updateClassOpinionCourseStatus";
import { IUpdateClassOpinionProgramStatusQueryVariables } from "@graphql/mutation/asset/classOpinion/updateClassOpinionProgramStatus";

import { RootState } from "@redux/store/root.reducer";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum } from "@interface/asset.interface";

import { strings } from "@assets/strings";

interface IClassOpinionControllerProps {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathId: string | null;
	learningPathType: LearningPathType;
	modalPageData?: any;
	closeModal?: (response?: string) => void;
}

export const useClassOpinionController = ({
	assetCode,
	courseId,
	moduleId,
	sessionId,
	segmentId,
	learningPathId,
	learningPathType,
	modalPageData,
	closeModal,
}: IClassOpinionControllerProps) => {
	const {
		getClassOpinionCourseDetails,
		classOpinionCourseData,
		getClassOpinionProgramDetails,
		classOpinionProgramData,
		classOpinionResponseData,
		getClassOpinionResponses,
		loadingClassOpinionCourseData,
		loadingClassOpinionProgramData,
		loadingClassOpinionResponseData,
		updateClassOpinionProgramStatus,
		updateClassOpinionCourseStatus,
	} = useClassOpinionAssetModel();

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		trigger,
		getValues,
	} = useForm<{ description: string }>({ mode: "all" });

	const {
		user: { id },
	} = useSelector((state: RootState) => state.user);

	const { showToast } = useToast();

	const [editResponseModalVisible, setEditResponseModalVisible] =
		useState(false);
	const [isUpdate, setIsUpdate] = useState(false);

	const toggleEditResponseModal = useCallback(() => {
		setEditResponseModalVisible((prev) => !prev);
	}, []);

	const handleResponseEdit = (response: string) => {
		setValue("description", response);
		setIsUpdate(true);
	};
	useEffect(() => {
		if (editResponseModalVisible) {
			trigger();
		}
	}, [editResponseModalVisible, trigger]);
	const modalData = modalPageData?.input?.meta;

	const _learningPathType =
		modalPageData?.learningPathType || learningPathType;

	const isProgram = _learningPathType === LearningPathType.PROGRAM;

	// Get translation language ID from context
	const { getTranslationLanguageId } = useAssetTranslation();

	const classOpinion =
		classOpinionProgramData?.getAssetFromUserProgram?.asset?.classOpinion;

	const enableViewResponseBeforeSubmit =
		classOpinion?.enableViewResponseBeforeSubmit;

	const responseCount =
		classOpinionResponseData?.classOpinionResponses?.totalCount;

	const isOpinionAdded =
		classOpinionResponseData?.classOpinionResponses?.result?.some(
			(item) => item?.createdBy?.id === id,
		);

	const showOthersOpinion = enableViewResponseBeforeSubmit || isOpinionAdded;

	const classOpinionResult =
		classOpinionResponseData?.classOpinionResponses?.result || [];

	const learningPath =
		classOpinionProgramData?.getAssetFromUserProgram ||
		classOpinionCourseData?.getAssetFromUserCourse;

	const isCompleted = learningPath?.status === IAssetStatusEnum.completed;

	const userProgram = isProgram
		? classOpinionProgramData?.getAssetFromUserProgram?.userProgram
		: classOpinionCourseData?.getAssetFromUserCourse?.userCourse;

	const deliveryTypeId =
		modalData?.deliveryType || userProgram?.deliveryType?.id;

	const programCode = modalData?.userProgram || userProgram?.program?.code;
	const workshopId = modalData?.workshop || userProgram?.workshop?.id;
	const _assetCode = modalData?.asset || assetCode;
	const question = modalPageData?.question || classOpinion?.question;
	const minLength =
		modalPageData?.minWordCount || classOpinion?.minWordCount || 1;
	const maxLength =
		modalPageData?.maxWordCount || classOpinion?.maxWordCount || 100;
	const minMaxWordLimitMessage = `Min word limit ${minLength} & Max ${maxLength}`;
	const sortedOpinions =
		responseCount === 0
			? []
			: showOthersOpinion
				? [
						...(classOpinionResult?.filter(
							(item) => item.createdBy.id === id,
						) || []),
						...(classOpinionResult?.filter(
							(item) => item.createdBy.id !== id,
						) || []),
					]
				: [];

	const getClassOpinionResponsesDetails = useCallback(async () => {
		const whereVariables = {
			asset: _assetCode ?? null,
			deliveryType: deliveryTypeId ?? null,
			program: programCode ?? null,
			workshop: workshopId ?? null,
		};

		await getClassOpinionResponses({
			variables: {
				where: {
					...whereVariables,
				},
				sort: {
					createdAt: "desc",
				},
			},
		});
	}, [
		_assetCode,
		deliveryTypeId,
		programCode,
		workshopId,
		getClassOpinionResponses,
	]);

	useEffect(() => {
		if (_assetCode && programCode && workshopId && deliveryTypeId) {
			getClassOpinionResponsesDetails();
		}
	}, [
		_assetCode,
		programCode,
		workshopId,
		deliveryTypeId,
		getClassOpinionResponsesDetails,
	]);

	const getClassOpinionContentAssetDetails = async () => {
		if (isProgram) {
			await getClassOpinionProgramDetails({
				variables: {
					where: {
						asset: _assetCode ?? null,
						level1: courseId ?? null,
						level2: moduleId ?? null,
						level3: sessionId ?? null,
						level4: segmentId ?? null,
						userProgram: learningPathId,
						// Add translation language if supported for this asset type
						translationLanguage: getTranslationLanguageId(),
					},
				},
			});
		} else {
			await getClassOpinionCourseDetails({
				variables: {
					where: {
						asset: _assetCode ?? null,
						level1: courseId ?? null,
						level2: moduleId ?? null,
						level3: sessionId ?? null,
						level4: segmentId ?? null,
						userCourse: learningPathId,
					},
				},
			});
		}
	};

	useFocusEffect(
		useCallback(() => {
			if (!modalPageData) getClassOpinionContentAssetDetails();
		}, [
			modalPageData,
			_assetCode,
			courseId,
			moduleId,
			sessionId,
			segmentId,
			learningPathType,
			learningPathId,
		]),
	);

	const submitClassOpinionResponse = async (value: any) => {
		const opinion = value.description
			.replace(/[\n\r]+/g, " ")
			.replace(/\s+/g, " ")
			.trim();
		if (modalPageData && closeModal) {
			closeModal(opinion);
			return;
		}
		const variables = {
			where: {
				asset: assetCode,
				...(modalData?.asset && { subAsset: _assetCode }),
				...(isProgram
					? {
							userProgram: modalData?.program || learningPathId,
						}
					: {
							userCourse: modalData?.program || learningPathId,
						}),

				...(courseId && { level1: courseId }),
				...(moduleId && { level2: moduleId }),
				...(sessionId && { level3: sessionId }),
				...(segmentId && { level4: segmentId }),
			},
			data: {
				status: IAssetStatusEnum.completed,
				response: opinion,
			},
		};

		const handleCompletion = async () => {
			setEditResponseModalVisible(false);
			await getClassOpinionResponsesDetails();
			showToast({
				message: isUpdate
					? strings.OPINION_UPDATE
					: strings.OPINION_SAVE,
				type: ToastType.SUCCESS,
			});
		};

		const handleError = () => {
			showToast({
				message: strings.ERROR_DESC,
				type: ToastType.ERROR,
			});
		};

		if (isProgram) {
			await updateClassOpinionProgramStatus({
				variables:
					variables as IUpdateClassOpinionProgramStatusQueryVariables,
				onCompleted: handleCompletion,
				onError: handleError,
			});
		} else {
			await updateClassOpinionCourseStatus({
				variables:
					variables as IUpdateClassOpinionCourseStatusQueryVariables,
				onCompleted: handleCompletion,
				onError: handleError,
			});
		}
	};
	return {
		control,
		handleSubmit,
		errors,
		isValid,
		setValue,
		getValues,
		handleResponseEdit,
		loadingClassOpinionCourseData,
		loadingClassOpinionProgramData,
		loadingClassOpinionResponseData,
		responseCount,
		isOpinionAdded,
		showOthersOpinion,
		editResponseModalVisible,
		toggleEditResponseModal,
		isCompleted,
		submitClassOpinionResponse,
		minLength,
		maxLength,
		question,
		sortedOpinions,
		trigger,
		minMaxWordLimitMessage,
	};
};
