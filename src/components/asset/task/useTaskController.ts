import { useFocusEffect } from "@react-navigation/native";
import moment from "moment-timezone";
import { useCallback, useEffect, useMemo, useState } from "react";
import BackgroundService from "react-native-background-actions";
import { useSelector } from "react-redux";

import { shouldShowResubmissionButton } from "@components/asset/task/task.utils";
import useTaskModel from "@components/asset/task/useTaskModel";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { useAssetTranslation } from "@contexts/AssetTranslationContext";

import {
	ICourseDetailsUserCourse,
	IGetAssetFromUserCourse,
} from "@graphql/query/asset/task/getTaskCourseDetails";
import {
	IGetAssetFromUserProgram,
	IProgramDetailsUserProgram,
} from "@graphql/query/asset/task/getTaskProgramDetails";

import downloadDocument from "@services/downloadDocument";
import {
	IUploadFileData,
	IUploadFileResponse,
	uploadFile,
	uploadFileInBackground,
} from "@services/uploadBase64";

import useAssetPenalty from "@hooks/assetPenalty/useAssetPenalty";
import useGetTimezone from "@hooks/useGetTimezone";
import { useMedia } from "@hooks/useMedia";
import useTimer from "@hooks/useTimer";

import { calculateDueDates, formatBytes, isValidUrl } from "@utils/functions";
import {
	getUploadedFiles,
	saveUploadedFile,
	UPLOADS_KEY,
} from "@utils/store.util";

import { storage } from "@config/mmkvStorage";

import { RootState } from "@redux/store/root.reducer";

import { LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";

import { strings } from "@assets/strings";

const MAX_FILE_SIZE_MB = {
	VIDEO: 500,
	DEFAULT: 50,
};

enum ITaskSubmissionType {
	GROUP = "group",
	URL = "uploadUrl",
}

interface IFileValidationError {
	errorMessage: string;
	errorFile: string;
}

interface ITaskControllerProps {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathId: string | null;
	learningPathType: LearningPathType;
	assetType: IAssetType.ASSIGNMENT | IAssetType.PROJECT;
}

interface ITaskAttempt {
	answerFiles: { name: string; url: string }[];
}

const useTaskController = ({
	assetCode,
	courseId,
	moduleId,
	sessionId,
	segmentId,
	learningPathId,
	learningPathType,
	assetType,
}: ITaskControllerProps) => {
	const isProgram = learningPathType === LearningPathType.PROGRAM;

	// Get translation language ID from context
	const { getTranslationLanguageId } = useAssetTranslation();

	const {
		getCourseTask,
		getProgramTask,
		taskProgramDetail,
		taskCourseDetail,
		loadingProgram,
		loadingCourse,
		refetchCourseTask,
		refetchProgramTask,
		getTaskGroupSubmission,
		groupSubmissionData,
		groupSubmissionLoading,
		createAssignmentAttempt,
		createProjectAttempt,
		refetchGroupSubmission,
		requestAssignmentRevaluation,
		requestProjectRevaluation,
		reuploadAnswerFileForAssignmentAttempt,
		reuploadAnswerFileForProjectAttempt,
	} = useTaskModel();

	const {
		user: { id: userId },
	} = useSelector((state: RootState) => state.user);

	const { firstName: currentUserFirstName, lastName: currentUserLastName } =
		useSelector((state: RootState) => state.personalDetails.basicDetails);

	const { showToast } = useToast();
	const [url, setUrl] = useState<string>("");
	const [isResubmit, setIsResubmit] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>();
	const [
		isAssignmentSubmissionModalOpen,
		setIsAssignmentSubmissionModalOpen,
	] = useState(false);

	const { name: userTimezone } = useGetTimezone();

	enum ITaskReviewed {
		REVIEWED = "reviewed",
		NOT_REVIEWED = "not-reviewed",
	}

	enum IEnableRevaluation {
		REVIEW = "review",
	}

	const [openUploadTaskModal, setOpenUploadTaskModal] = useState(false);
	const [uploadedTask, setUploadedTask] = useState(false);

	const [uploadedFilesArray, setUploadedFilesArray] = useState<
		{
			name: string;
			url: string;
			type: string;
		}[]
	>([]);

	const [taskDownloading, setTaskDownloading] = useState(false);
	const [downloadingFileName, setDownloadingFileName] = useState<
		string | null
	>(null);
	const [progress, setProgress] = useState(0);
	const [uploadFromDesktopModalVisible, setUploadFromDesktopModalVisible] =
		useState(false);

	const { chooseFile } = useMedia();
	const { seconds } = useTimer();

	const closeUploadTask = () => {
		setOpenUploadTaskModal(false);
		setProgress(0);
	};

	const toggleUploadFromDesktopModal = () => {
		setUploadFromDesktopModalVisible(!uploadFromDesktopModalVisible);
	};

	const isAssignment = assetType === IAssetType.ASSIGNMENT;

	const assetDetails = isProgram
		? taskProgramDetail?.getAssetFromUserProgram
		: taskCourseDetail?.getAssetFromUserCourse;

	const asset = assetDetails?.asset;
	const task = isAssignment ? asset?.assignment : asset?.project;

	const submissionTemplate = task?.submissionTemplate;

	const learningPathDetails = isProgram
		? (assetDetails as IGetAssetFromUserProgram)?.userProgram
		: (assetDetails as IGetAssetFromUserCourse)?.userCourse;

	const learningPathCode = isProgram
		? (learningPathDetails as IProgramDetailsUserProgram)?.program?.code
		: (learningPathDetails as ICourseDetailsUserCourse)?.course?.code;

	const learningPath = isProgram
		? (learningPathDetails as IProgramDetailsUserProgram)?.program
		: (learningPathDetails as ICourseDetailsUserCourse)?.course;

	const totalExtensionsTaken = learningPathDetails?.totalExtensionsTaken;
	const hardDeadlineDays = learningPath?.hardDeadlineDays;

	const { totalExtensionsAllowed, dueDateExtensionMode } = useMemo(() => {
		const { program, comboCurriculum } =
			taskProgramDetail?.getAssetFromUserProgram.userProgram || {};

		const enableComboCurriculum = program?.enableComboCurriculum ?? false;

		if (enableComboCurriculum && comboCurriculum) {
			return {
				totalExtensionsAllowed: comboCurriculum.totalExtensionsAllowed,
				dueDateExtensionMode: comboCurriculum.dueDateExtensionMode,
			};
		}

		return {
			totalExtensionsAllowed: program?.totalExtensionsAllowed,
			dueDateExtensionMode: program?.dueDateExtensionMode,
		};
	}, [learningPathDetails]);

	const extensionRequests = assetDetails?.extensionRequests;

	const taskSummary = task?.summary;
	const isTaskSubmitted = !!taskSummary;

	const taskAttempt = taskSummary?.attempt;

	const isTaskReSubmissionEnabled = taskAttempt?.enableReSubmission;

	const status = taskAttempt?.status;

	const evaluationReport = taskAttempt?.report;

	const answerFilesArray = taskAttempt?.answerFiles?.map((file) => ({
		name: file.name,
		url: file.url,
	}));

	const uploadLimit = asset?.allowedFileTypes?.reduce(
		(sum, fileType) => sum + (fileType.count || 0),
		0,
	);

	// Calculate URL-specific limit for mixed submissions
	const urlLimit = asset?.allowedFileTypes?.find(
		(fileType) => fileType.type.toString().toUpperCase() === "URL",
	)?.count;

	const loading = loadingProgram || loadingCourse;

	const taskDownloadUrl = taskAttempt?.answerUrl;
	const uploadTaskFileName = taskDownloadUrl?.split("/")?.pop() ?? "";

	const taskSubmittedDate = taskAttempt?.createdAt ?? "";

	const SECONDS_IN_MINUTE = 60;
	const taskDuration = task?.duration ? task.duration / SECONDS_IN_MINUTE : 0;

	const isRevaluationEnabled = learningPath?.enableRevaluation;

	const evaluationStatus = taskAttempt?.recentEvaluationTag ?? null;

	const requestedReEvaluationDate = taskAttempt?.requestedReEvaluationAt;

	const learnerRevaluationRequestDate =
		assetDetails?.evaluationSetting?.revaluationSetting
			?.learnerRevaluationRequest ?? 0;

	const attemptId = taskAttempt?.id;

	const deliveryType = isProgram
		? (learningPathDetails as IProgramDetailsUserProgram)?.deliveryType
		: (learningPathDetails as ICourseDetailsUserCourse)?.deliveryType;

	const isDeliveryTypeSelfPaced = deliveryType?.name !== "selfpaced-only";

	const isRevaluationCompleted =
		status === ITaskReviewed.REVIEWED && requestedReEvaluationDate != null;

	const isEvaluationCompleted = status === ITaskReviewed.REVIEWED;

	const dateValidation = () => {
		const publishesAt = new Date(taskAttempt?.publishedAt || "");

		const learnerReValuationRequest =
			assetDetails?.evaluationSetting?.revaluationSetting
				?.learnerRevaluationRequest || 0;
		const validDate = new Date(
			publishesAt.setDate(
				publishesAt.getDate() + learnerReValuationRequest,
			),
		);
		const currentDate = new Date();

		return validDate >= currentDate;
	};

	const isRevaluationBtnVisible =
		isRevaluationEnabled &&
		!requestedReEvaluationDate &&
		isDeliveryTypeSelfPaced &&
		evaluationStatus !== IEnableRevaluation.REVIEW &&
		dateValidation();

	const showSubmissionReview = status === ITaskReviewed.NOT_REVIEWED;

	const handleInputChange = (value: string) => {
		setUrl(value);
	};

	const onDeleteFile = (fileName: string) => {
		storage.delete(UPLOADS_KEY);
		setUploadedFilesArray((prev) => {
			prev.forEach((file) => {
				if (file.name !== fileName) {
					saveUploadedFile(file);
				}
			});
			return prev.filter((file) => file.name !== fileName);
		});
	};

	const assetVersion =
		taskProgramDetail?.getAssetFromUserProgram?.asset?.version;

	const isBackgroundServiceRunning = () => {
		const isRunning = BackgroundService.isRunning();
		return isRunning;
	};

	const onUploadTask = async () => {
		try {
			if (isBackgroundServiceRunning()) return;
			setUploadedTask(false);

			if (uploadLimit > 0 && uploadedFilesArray.length >= uploadLimit) {
				setErrorMessage(
					`${strings.UPLOAD_FILE_LIMIT} ${uploadLimit} ${strings.FILES}.`,
				);
				return;
			}

			const res = await chooseFile(task?.uploadFileTypes);
			if (!res) return;

			const file = res[0];
			const extension = file.name?.split(".").pop()?.toLowerCase();
			const isVideo = ["mp4", "avi"].includes(extension || "");

			const sizeMB = formatBytes(file.size || 0).size;
			const maxSize = isVideo
				? MAX_FILE_SIZE_MB.VIDEO
				: MAX_FILE_SIZE_MB.DEFAULT;
			if (sizeMB > maxSize) {
				setErrorMessage(
					`${strings.UPLOAD_FILE_LIMIT} ${maxSize} MB ${
						isVideo ? strings.VIDEO_FILE_TYPE : strings.OTHER_FILE
					}.`,
				);

				return;
			}
			setErrorMessage(null);
			let uploadResult: IUploadFileResponse | null = null;

			if (isVideo) {
				try {
					uploadResult = await uploadFileInBackground(
						file,
						setProgress,
					);

					const uploadedFile = {
						name: file.name || "" + uploadedFilesArray.length,
						url: uploadResult?.data?.location || "",
						type: file.type || "",
					};

					saveUploadedFile(uploadedFile);
				} catch (err) {
					return;
				}
			} else {
				uploadResult = await uploadFile({
					file: file as IUploadFileData,
					onProgress: setProgress,
				});
			}

			setUploadedFilesArray((prev) => [
				...prev,
				{
					name: res[0].name || "" + uploadedFilesArray.length,
					url: uploadResult?.data?.location || "",
					type: res[0].type || "",
				},
			]);
			setUploadedTask(true);
		} catch (err) {
			return;
		} finally {
			setProgress(0);
		}
	};

	const onUploadURL = () => {
		const isValid = isValidUrl(url);
		if (!isValid) {
			return showToast({
				message: strings.ENTER_VALID_URL,
				type: ToastType.ERROR,
			});
		}

		setUploadedTask(true);
		setUploadedFilesArray((prev) => [
			...prev,
			{
				name: url || "",
				url: url || "",
				type: "url",
			},
		]);
		setUrl("");
	};

	const onResubmit = () => {
		setUploadedFilesArray([]);
		setOpenUploadTaskModal(true);
		setIsResubmit(true);
	};

	useFocusEffect(
		useCallback(() => {
			getTaskDetails();
			const savedFiles = getUploadedFiles();
			setUploadedFilesArray(savedFiles);
			storage.delete(UPLOADS_KEY);
		}, [
			assetCode,
			courseId,
			moduleId,
			sessionId,
			segmentId,
			learningPathType,
			learningPathId,
		]),
	);

	const getTaskDetails = async () => {
		const whereVariables = {
			asset: assetCode,
			level1: courseId,
			level2: moduleId,
			...(isProgram ? { level3: sessionId, level4: segmentId } : {}),
			// Add translation language for instructions
			translationLanguage: getTranslationLanguageId(),
		};
		if (isProgram) {
			await getProgramTask({
				variables: {
					where: {
						...whereVariables,
						userProgram: learningPathId,
					},
				},
			});
		} else {
			await getCourseTask({
				variables: {
					where: {
						...whereVariables,
						userCourse: learningPathId,
					},
				},
			});
		}
	};

	const handleEvaluationSubmit = async (value: string) => {
		if (!attemptId) return;

		if (assetDetails?.asset?.assignment) {
			await requestAssignmentRevaluation({
				variables: {
					where: { id: attemptId },
					data: { reason: value },
				},
				onCompleted: () => refetchQueries(),
			});
		} else {
			requestProjectRevaluation({
				variables: {
					where: { id: attemptId },
					data: { reason: value },
				},
				onCompleted: () => refetchQueries(),
			});
		}
	};

	const submitTask = () => {
		setOpenUploadTaskModal(false);
		setProgress(0);
		onSubmitAssignment();
	};

	const taskDownload = (fileName?: string) => {
		setTaskDownloading(true);
		setDownloadingFileName(fileName ?? null);
		let fileUrlToDownload = "";

		if (fileName) {
			const matchedFile = uploadFileTitle?.find(
				(f) => f.name === fileName,
			);
			if (matchedFile?.url) fileUrlToDownload = matchedFile.url;
		}

		if (!fileUrlToDownload && fileName) {
			const matchedAnswerFile = uploadedFilesArray.find(
				(f) => f.name === fileName,
			);
			if (matchedAnswerFile?.url)
				fileUrlToDownload = matchedAnswerFile.url;
		}

		if (!fileUrlToDownload) {
			setTaskDownloading(false);
			setDownloadingFileName(null);
			return;
		}

		downloadDocument({
			fileUrl: fileUrlToDownload,
			errorCallback: () => {
				setTaskDownloading(false);
				setDownloadingFileName(null);
			},
			successCallback: () => {
				setTaskDownloading(false);
				setDownloadingFileName(null);
			},
		});
	};

	const onSubmitAssignment = () => {
		if (!assetCode || !learningPathId || !task?.id) return;
		const mappedAnswerFiles = uploadedFilesArray.map((file) => ({
			name: file.name,
			url: file.url,
		}));
		if (isResubmit) {
			if (isAssignment) {
				reuploadAnswerFileForAssignmentAttempt({
					variables: {
						where: { id: attemptId },
						data: { answerFiles: mappedAnswerFiles },
					},

					onCompleted: () => refetchQueries(),
				});
			} else {
				reuploadAnswerFileForProjectAttempt({
					variables: {
						where: { id: attemptId },
						data: { answerFiles: mappedAnswerFiles },
					},
					onCompleted: () => refetchQueries(),
				});
			}
		} else {
			const variables = {
				asset: assetCode,
				version: assetVersion ?? 0,
				...(isProgram
					? {
							userProgram: learningPathId,
							level3: sessionId ?? undefined,
							level4: segmentId ?? undefined,
						}
					: { userCourse: learningPathId }),

				answerFiles: mappedAnswerFiles,
				timeSpent: seconds ?? 0,
				level1: courseId ?? undefined,
				level2: moduleId ?? undefined,
			};

			if (isAssignment)
				createAssignmentAttempt({
					variables: {
						data: {
							assignment: task.id,
							...variables,
						},
					},
					onCompleted: () => refetchQueries(),
				});
			else
				createProjectAttempt({
					variables: {
						data: {
							project: task.id,
							...variables,
						},
					},
					onCompleted: () => refetchQueries(),
				});

			if (!isOriginalDueDatePassed && !isDueDateExtended)
				setIsAssignmentSubmissionModalOpen(true);
		}

		setOpenUploadTaskModal(false);
	};

	const isGroupSubmission =
		task?.submissionType === ITaskSubmissionType.GROUP;

	// Derive submission type directly
	const hasUrl = task?.uploadFileTypes.includes("url");
	const hasFiles = task?.uploadFileTypes.some((type) => type !== "url");

	const taskSubmissionType =
		hasUrl && hasFiles ? "mixed" : hasUrl ? "url-only" : "file-only";

	const taskSubmissionTypeUrl = hasUrl;

	const uploadFileTitle = (() => {
		const files: { name: string; url: string }[] = [];
		const addFileIfNotExists = (file: { name: string; url: string }) => {
			if (!files.some((f) => f.url === file.url)) {
				files.push(file);
			}
		};

		if (taskDownloadUrl) {
			addFileIfNotExists({
				name: uploadTaskFileName || taskDownloadUrl,
				url: taskDownloadUrl,
			});
		}

		const attemptAnswerFiles = (taskAttempt as ITaskAttempt)
			?.answerFiles as { name: string; url: string }[] | undefined;

		attemptAnswerFiles?.forEach((f) => addFileIfNotExists(f));
		return files;
	})();

	useEffect(() => {
		if (isGroupSubmission) {
			getTaskGroupSubmission({
				variables: {
					where: {
						asset: asset?.code || "",
						user: userId || "",
						workshop: learningPathDetails?.workshop?.id || "",
					},
				},
			});
		}
	}, [isGroupSubmission]);

	const refetchQueries = async () => {
		const whereVariables = {
			asset: assetCode,
			level1: courseId,
			level2: moduleId,
			...(isProgram ? { level3: sessionId, level4: segmentId } : {}),
		};

		if (isProgram)
			await refetchProgramTask({
				where: {
					...whereVariables,
					userProgram: learningPathId,
				},
			});
		else
			await refetchCourseTask({
				where: {
					...whereVariables,
					userCourse: learningPathId,
				},
			});

		if (isGroupSubmission)
			refetchGroupSubmission({
				where: {
					asset: asset?.code || "",
					user: userId || "",
					workshop: learningPathDetails?.workshop?.id || "",
				},
			});
	};

	const groupMembers =
		groupSubmissionData?.workshopLearnerGroupForAsset?.users?.map(
			({ user: { firstName, lastName, id } }) => ({
				firstName,
				lastName,
				active: id === userId,
			}),
		) || [];

	const groupTaskSubmittedBy =
		groupSubmissionData?.workshopLearnerGroupForAsset?.attemptedBy;

	const groupTaskSubmittedByName = groupTaskSubmittedBy?.firstName
		? `${groupTaskSubmittedBy?.firstName} ${groupTaskSubmittedBy?.lastName} `
		: "";

	const currentUserFullName = [currentUserFirstName, currentUserLastName]
		.filter(Boolean)
		.join(" ");

	const isCurrentUserTheSubmitter =
		currentUserFullName === groupTaskSubmittedByName.trim();

	const uploadTask = (() => {
		if (!asset) return null;

		const fileTypeDescriptions = asset.allowedFileTypes
			.map((fileType) => {
				const count = fileType.count;
				const type = fileType.type.toString().toLowerCase();
				return `${count} .${type} file${count > 1 ? "s" : ""}`;
			})
			.join(", ");

		return `${strings.EXPECTED_UPLOAD} ${uploadLimit} ${strings.FILES}: ${fileTypeDescriptions}. ${strings.MAX_FILE_SIZE_500_MB}`;
	})();

	const skills = asset?.skills?.map((skill) => ({
		id: skill.id,
		name: skill.name,
	}));

	const subSkills = asset?.subSkills?.map((subSkill) => ({
		id: subSkill.id,
		name: subSkill.name,
	}));

	const referenceLinks = asset?.dynamicLinks.map((link) => ({
		url: link.url,
		title: link.text,
	}));

	const isDeadlineExtensionRegained = assetDetails?.isExtensionRegained;

	const isDueDateExtended = !!extensionRequests?.length;

	const { extendedDueDate, originalDueDate } = calculateDueDates({
		dueDate: assetDetails?.endsAt || "",
		hardDeadlineDays,
		isDueDateExtended,
	});

	const { loadingAssetPenalty, penalties, revertedPenalties } =
		useAssetPenalty({
			dueDate: originalDueDate,
			isDueDateExtended,
			learningPathCode,
			isProgram,
			extendedDueDate,
		});

	const baseResubmissionVisible = shouldShowResubmissionButton({
		isExtensionApplied: isDueDateExtended,
		isResubmissionAllowed: isTaskReSubmissionEnabled,
		submittedDate: taskSubmittedDate,
		originalDueDate,
		extendedDueDate,
	});

	const isResubmissionButtonVisible =
		baseResubmissionVisible &&
		(isCurrentUserTheSubmitter || !isGroupSubmission);

	const validateUploadedFiles = (): IFileValidationError | null => {
		if (!asset?.allowedFileTypes?.length || !uploadedFilesArray.length)
			return null;

		const uploadedByType = uploadedFilesArray.reduce(
			(acc, { name }) => {
				const ext = name.split(".").pop()?.toUpperCase() || "UNKNOWN";
				if (!acc[ext]) acc[ext] = [];
				acc[ext].push(name);
				return acc;
			},
			{} as Record<string, string[]>,
		);

		for (const { type, count } of asset.allowedFileTypes) {
			const ext = type.toString().toUpperCase();
			const filesOfType = uploadedByType[ext] || [];
			const excess = filesOfType.length - count;
			if (excess > 0) {
				const errorFile = filesOfType[count];
				return {
					errorMessage: `${strings.REMOVE_EXTRA_FILES}: ${excess} .${ext.toLowerCase()}`,
					errorFile: errorFile,
				};
			}
		}

		return null;
	};

	const fileValidationError = validateUploadedFiles();

	const isOriginalDueDatePassed = moment(originalDueDate)?.isBefore(
		moment().tz(userTimezone),
	);

	const handleAssignmentSubmissionModalClose = useCallback(() => {
		setIsAssignmentSubmissionModalOpen(false);
	}, [setIsAssignmentSubmissionModalOpen]);

	return {
		taskSubmittedDate,
		onUploadTask,
		uploadTask,
		closeUploadTask,
		progress,
		taskDownloading,
		downloadingFileName,
		openUploadTaskModal,
		setOpenUploadTaskModal,
		uploadedTask,
		task,
		groupMembers,
		taskDownload,
		isGroupSubmission,
		groupSubmissionLoading,
		loading,
		groupTaskSubmittedByName,
		assetDetails,
		totalExtensionsAllowed,
		totalExtensionsTaken,
		hardDeadlineDays,
		dueDateExtensionMode,
		isTaskSubmitted,
		submitTask,
		refetchQueries,
		skills,
		subSkills,
		url,
		referenceLinks,
		taskDuration,
		extensionRequests,
		isDeadlineExtensionRegained,
		handleEvaluationSubmit,
		evaluationReport,
		evaluationStatus,
		requestedReEvaluationDate,
		learnerRevaluationRequestDate,
		isRevaluationCompleted,
		isEvaluationCompleted,
		isRevaluationBtnVisible,
		showSubmissionReview,
		onUploadURL,
		handleInputChange,
		taskDownloadUrl,
		taskSubmissionTypeUrl,
		taskSubmissionType,
		uploadFileTitle,
		penalties,
		loadingAssetPenalty,
		extendedDueDate,
		originalDueDate,
		revertedPenalties,
		toggleUploadFromDesktopModal,
		uploadFromDesktopModalVisible,
		uploadLimit,
		urlLimit,
		onResubmit,
		onDeleteFile,
		isResubmissionButtonVisible,
		answerFilesArray,
		uploadedFilesArray,
		fileValidationError,
		isResubmit,
		errorMessage,
		assetVersion,
		submissionTemplate,
		isAssignmentSubmissionModalOpen,
		handleAssignmentSubmissionModalClose,
	};
};

export default useTaskController;
