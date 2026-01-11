import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { captureScreen } from "react-native-view-shot";

import {
	IReportAnIssueFetchAndSetContainerName,
	IReportAnIssueModaGetContainerName,
	IReportAnIssueModaHandleSubmit,
	IReportAnIssueModalContainer,
	IUseReportAnIssueModalController,
	IUseReportAnIssueModalFormValues,
} from "@components/asset/common/ReportAnIssueModal/index.interface";
import {
	delayToast,
	getBase64FileSize,
	getFileNameAndExtension,
	getIssueDescription,
	getIssueSubject,
	getUploadFileData,
} from "@components/asset/common/ReportAnIssueModal/index.util";
import useReportAnIssueModalModel from "@components/asset/common/ReportAnIssueModal/useReportAnIssueModalModel";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { uploadFile } from "@services/uploadBase64";

import { LearningPathType } from "@interface/app.interface";

import { strings } from "@assets/strings";

const useReportAnIssueModalController = ({
	assetCode,
	assetName,
	courseId,
	learningPathId,
	learningPathName,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
	closeModal,
	buildPath,
	isQuiz = false,
	quizQuestionId,
	quizQuestionName,
}: IUseReportAnIssueModalController) => {
	const {
		reportAnIssue,
		reportAnIssueLoading,
		getReportAnIssueCourseInfo,
		getReportAnIssueProgramInfo,
	} = useReportAnIssueModalModel();

	const isProgram = learningPathType === LearningPathType.PROGRAM;

	const [courseName, setCourseName] = useState("");
	const [moduleName, setModuleName] = useState("");
	const [sessionName, setSessionName] = useState("");
	const [segmentName, setSegmentName] = useState("");

	const [loading, setLoading] = useState(false);

	const methods = useForm<IUseReportAnIssueModalFormValues>({
		mode: "onChange",
	});

	const { showToast } = useToast();

	const getContainerName = async ({
		level,
		code,
	}: IReportAnIssueModaGetContainerName) => {
		const variables = {
			where: {
				id: learningPathId,
				...(level >= 2 && { level1: courseId || null }),
				...(isProgram && level >= 3 && { level2: moduleId || null }),
				...(isProgram && level === 4 && { level3: sessionId || null }),
			},
		};

		let containers: IReportAnIssueModalContainer[] = [];

		if (isProgram) {
			const { data } = await getReportAnIssueProgramInfo({ variables });
			containers = data?.userProgramContainers || [];
		} else {
			const { data } = await getReportAnIssueCourseInfo({ variables });
			containers = data?.userCourseContainers || [];
		}
		return containers.find((item) => item.code === code)?.name || null;
	};

	const fetchAndSetContainerName = async ({
		level,
		code,
		setName,
	}: IReportAnIssueFetchAndSetContainerName) => {
		const name = await getContainerName({ level, code });
		if (name) setName(name);
	};

	useEffect(() => {
		const getContainerNames = async () => {
			await fetchAndSetContainerName({
				level: 1,
				code: courseId,
				setName: setCourseName,
			});
			await fetchAndSetContainerName({
				level: 2,
				code: moduleId,
				setName: setModuleName,
			});
			await fetchAndSetContainerName({
				level: 3,
				code: sessionId,
				setName: setSessionName,
			});
			await fetchAndSetContainerName({
				level: 4,
				code: segmentId,
				setName: setSegmentName,
			});
		};

		getContainerNames();
	}, []);

	const handleSubmit = async ({
		issueType,
		issueDescription,
	}: IReportAnIssueModaHandleSubmit) => {
		try {
			setLoading(true);
			Keyboard.dismiss();

			const screenshot = await captureScreen({
				format: "jpg",
				result: "base64",
			});

			const {
				data: { location },
			} = await uploadFile(getUploadFileData(screenshot));

			if (!location) throw new Error();

			const { extension, filename } = getFileNameAndExtension(location);
			const fileSize = getBase64FileSize(screenshot);

			const monthNumber = new Date().getMonth() + 1;
			const attachments = [
				{
					size: fileSize,
					key: filename,
					name: `${assetName}-${moduleName}-${learningPathId}-${monthNumber}.${extension}`,
				},
			];

			const description = getIssueDescription({
				issueType,
				issueDescription,
				assetName,
				isQuiz,
				learningPathName,
				learningPathType,
				courseName,
				moduleName,
				sessionName,
				segmentName,
				quizQuestionName,
				buildPath,
			});

			const subject = getIssueSubject({
				assetName,
				learningPathName,
				isQuiz,
			});

			await reportAnIssue({
				variables: {
					data: {
						subject,
						...(isProgram
							? { userProgram: learningPathId }
							: { userCourse: learningPathId }),
						category: strings.ASSET_ISSUE,
						asset: assetCode,
						description,
						attachments,
						qId: quizQuestionId,
						assetLink: buildPath,
					},
				},
			});

			handleCloseModal();

			delayToast({ showToast, type: ToastType.SUCCESS });
		} catch {
			handleCloseModal();

			delayToast({ showToast, type: ToastType.ERROR });
		} finally {
			setLoading(false);
		}
	};

	const buttonDisabled = !methods.formState.isValid || loading;

	const handleSubmitButtonPress = methods.handleSubmit(
		({ issueDescription, issueType }) =>
			handleSubmit({
				issueDescription: issueDescription,
				issueType: issueType?.value || "",
			}),
	);

	const buttonText =
		reportAnIssueLoading || loading ? strings.SUBMITTING : strings.SUBMIT;

	const handleCloseModal = () => {
		closeModal();
		methods.reset({
			issueType: null,
			issueDescription: "",
		});
	};

	return {
		handleSubmitButtonPress,
		handleCloseModal,

		buttonDisabled,
		buttonText,
		methods,
	};
};

export default useReportAnIssueModalController;
