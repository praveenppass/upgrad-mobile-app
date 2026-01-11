import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/core";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import { uploadResume } from "@services/uploadBase64";

import { useHelpSupportEvents } from "@hooks/useHelpSupportEvents";
import { useMedia } from "@hooks/useMedia";

import { formatBytes } from "@utils/functions";

import { IComponentName } from "@interface/events.interface";
import {
	IAttachment,
	ICreateTicketData,
	IFileUploadResType,
} from "@interface/helpSupport.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";
import { IDropDownData, IDropDownOptions } from "@interface/user.interface";

import { strings } from "@assets/strings";

import RaiseATicketViewModel, {
	RAISE_ISSUE_DESCRIPTION_MAX_LENGTH,
	RAISE_ISSUE_SUBJECT_MAX_LENGTH,
} from "./RaiseATicketViewModel";

export interface ICreateTicketFormData {
	subject?: string;
	category?: ISelectedItem;
	description?: string;
	attachments?: IAttachment[];
	userProgram?: ISelectedItem;
}

export interface ICreateTicketFormDataError {
	subjectError?: string;
	categoryError?: string;
	descriptionError?: string;
	userProgramError?: string;
	attachmentsError?: string;
}
export interface ISelectedItem {
	id: string;
	deliveryId: string;
	text: string;
	isUserProgram?: boolean;
}

enum SELECT_DROP {
	COURSE = "COURSE",
	CATEGORY = "CATEGORY",
}

//* Temp Default data
const DEFAULT_VALUE: ICreateTicketFormData = {};

const RaiseATicketController = () => {
	const { chooseFile } = useMedia();
	const { goBack, navigate } = useNavigation<RootHomeStackList>();
	const [createTicketFormData, setCreateTicketFormData] = useState<
		ICreateTicketFormData | undefined
	>(DEFAULT_VALUE);
	const [createTicketFormError, setCreateTicketFormError] = useState<
		ICreateTicketFormDataError | undefined
	>();
	const {
		courseListData,
		categoryListData,
		createTicket,
		isDropDownItemLoading,
	} = RaiseATicketViewModel();
	const [modalData, setModalData] = useState<IDropDownData[]>([]);
	const [modalSelection, setModalSelection] = useState<SELECT_DROP>(
		SELECT_DROP.COURSE,
	);
	const {
		onRaiseTicketEdit,
		AddAttachmentClicked,
		RemoveAttachmentClicked,
		onRaiseTicketAttachmentSuccess,
	} = useHelpSupportEvents();
	const bottomSheetRef = useRef<BottomSheet>(null);

	const [modalOptions, setModalOptions] = useState<IDropDownOptions>(
		Object(null),
	);

	useEffect(() => {
		courseListData.getCourseList();
	}, []);

	const setCourseData = () => {
		if (courseListData?.data?.allLearnerCourses?.length) {
			const data = courseListData?.data?.allLearnerCourses?.map(
				(item) => {
					return {
						id: item.id,
						code: item.id || "", //* To Show selected Item
						deliveryId: item.deliveryType?.id,
						name:
							item?.courseInfo?.name ||
							item?.program?.name ||
							item?.course?.name,
						isUserProgram: item?.course ? false : true,
					};
				},
			);
			setModalData(data);
		}
	};

	const uploadAttachments = async () => {
		const result = await chooseFile();
		if (!result) {
			return null;
		}
		const totalSize = createTicketFormData?.attachments?.reduce(
			(perVal, item) => {
				return item?.size || 0 + perVal;
			},
			0,
		);

		//* Max Size Check
		if (formatBytes((totalSize || 0) + (result[0].size || 0)).size > 20.0) {
			setCreateTicketFormError({
				...createTicketFormError,
				attachmentsError:
					strings.ATTACHMENT_SIZE_NEEDS_TO_BE_LESS_THAN_20_MB,
			});
			return;
		} else {
			setCreateTicketFormError({
				...createTicketFormError,
				attachmentsError: undefined,
			});
		}
		if (!result) {
			return null;
		}
		const formData = new FormData();
		formData.append("upload", {
			uri: result[0].uri,
			type: result[0].type,
			name: result[0].name,
		});
		const uploadRes: AxiosResponse<IFileUploadResType> =
			await uploadResume(formData);
		const fileObj: IAttachment = {
			name: uploadRes.data.originalname,
			key: uploadRes.data.Key || uploadRes.data.key,
			size: uploadRes.data.size,
			fileUrl: uploadRes.data.location,
			contentType: uploadRes.data.contentType,
			mimetype: uploadRes.data.mimetype,
		};
		if (fileObj) {
			onRaiseTicketAttachmentSuccess(
				createTicketFormData?.userProgram?.text ?? "NA",
				createTicketFormData?.category?.text ?? "NA",
				IComponentName?.ATTACHMENT_ADDED,
			);
		}

		return fileObj;
	};

	const openDropDown = () => {
		bottomSheetRef.current?.expand();
	};

	const closeDropDown = () => {
		bottomSheetRef.current?.close();
	};

	const setCategoryData = () => {
		if (!createTicketFormData?.userProgram?.id) {
			return;
		}
		const variables = {
			where: {
				for: {
					_elemMatch: {
						type: createTicketFormData?.userProgram?.isUserProgram
							? "program"
							: "course",
						deliveryType:
							createTicketFormData?.userProgram?.deliveryId,
					},
				},
			},
		};
		categoryListData.getCategory({
			variables: variables,
			onCompleted: (response) => {
				if (response?.allTicketCategories) {
					const data = response?.allTicketCategories?.map((item) => {
						return {
							id: item.id,
							code: item?.id,
							name: item?.name,
						};
					});

					const isCategoryGeneral = (name?: string) =>
						name === "General";

					let finalData;
					const hasGeneral = data.some((d) =>
						isCategoryGeneral(d.name),
					);

					if (hasGeneral)
						finalData = data.filter((d) =>
							isCategoryGeneral(d.name),
						);
					else
						finalData = [
							{ id: null, code: null, name: "No Data Found" },
						];

					setModalData(finalData);
				}
			},
		});
	};

	const onChooseItem = (item: IDropDownData) => {
		onRaiseTicketEdit(item?.name, modalSelection?.toLocaleLowerCase());
		if (modalSelection === SELECT_DROP.COURSE) {
			setCreateTicketFormData({
				...createTicketFormData,
				userProgram: {
					id: item.id || "",
					deliveryId: item.deliveryId,
					text: item.name || "",
					isUserProgram: item.isUserProgram ?? false,
				},
			});
			setCreateTicketFormError({
				...createTicketFormError,
				userProgramError: undefined,
			});
		}
		if (modalSelection === SELECT_DROP.CATEGORY) {
			setCreateTicketFormData({
				...createTicketFormData,
				category: {
					id: item.code || "",
					text: item.name || "",
				},
			});
			setCreateTicketFormError({
				...createTicketFormError,
				categoryError: undefined,
			});
		}
		closeDropDown();
	};

	const openCourseSheet = () => {
		setCourseData();
		setModalSelection(SELECT_DROP.COURSE);
		setModalOptions({
			title: strings.COURSE,
			queryKey: undefined,
			selectedItem: createTicketFormData?.userProgram?.id || "",
		});
		openDropDown();
	};

	const openCategorySheet = () => {
		//* if Course is not selected clear this list
		if (!createTicketFormData?.userProgram?.id) {
			setModalData([]);
		}
		setCategoryData();
		setModalSelection(SELECT_DROP.CATEGORY);
		setModalOptions({
			title: strings.COURSE_CATEGORY,
			queryKey: undefined,
			selectedItem: createTicketFormData?.category?.id || "",
		});
		openDropDown();
	};

	const onSubmitSubject = () => {
		onRaiseTicketEdit(
			createTicketFormData?.subject,
			IComponentName.SUBJECT,
		);
	};

	const onSubmitDescription = () => {
		onRaiseTicketEdit(
			createTicketFormData?.description,
			IComponentName.DESCRIPTION,
		);
	};

	const onChangeSubject = (subject: string) => {
		if (subject?.length > RAISE_ISSUE_SUBJECT_MAX_LENGTH) {
			setCreateTicketFormError({
				...createTicketFormError,
				subjectError: ` ${subject?.length} / ${RAISE_ISSUE_SUBJECT_MAX_LENGTH} ${strings.CHARACTER}`,
			});
		} else {
			setCreateTicketFormError({
				...createTicketFormError,
				subjectError: undefined,
			});
		}
		setCreateTicketFormData({
			...createTicketFormData,
			subject: subject,
		});
	};

	const onChangeDescription = (description: string) => {
		if (description?.length > RAISE_ISSUE_DESCRIPTION_MAX_LENGTH) {
			setCreateTicketFormError({
				...createTicketFormError,
				descriptionError: ` ${description?.length} / ${RAISE_ISSUE_DESCRIPTION_MAX_LENGTH} ${strings.CHARACTER}`,
			});
		} else {
			setCreateTicketFormError({
				...createTicketFormError,
				descriptionError: undefined,
			});
		}
		setCreateTicketFormData({
			...createTicketFormData,
			description: description,
		});
	};

	const addAttachments = async () => {
		const file: IAttachment = await uploadAttachments();
		AddAttachmentClicked();
		if (!file) {
			return;
		}
		setCreateTicketFormData({
			...createTicketFormData,
			attachments: [...(createTicketFormData?.attachments ?? []), file],
		});
	};

	const onViewAttachment = (attachment: IAttachment) => {
		const type = attachment?.contentType;
		const fileUrl = attachment?.fileUrl;
		navigate("ImageViewScreen", {
			file: {
				fileUrl: fileUrl ?? "",
				contentType: type,
			},
		});
	};

	const removeAttachment = (index: number) => {
		const attachmentsList = [...(createTicketFormData?.attachments ?? [])];
		attachmentsList.splice(index, 1);
		setCreateTicketFormData({
			...createTicketFormData,
			attachments: attachmentsList,
		});
		RemoveAttachmentClicked();
	};

	const validateForm = () => {
		const errorArray = [];
		if (!createTicketFormData?.userProgram) {
			errorArray.push({
				userProgramError: strings.COURSE_REQUIRED,
			});
		}
		if (!createTicketFormData?.category) {
			errorArray.push({
				categoryError: strings.CATEGORY_REQUIRED,
			});
		}
		if (!createTicketFormData?.subject) {
			errorArray.push({
				subjectError: strings.SUBJECT_REQUIRED,
			});
		}
		if (!createTicketFormData?.description) {
			errorArray.push({
				descriptionError: strings.DESCRIPTION_REQUIRED,
			});
		}
		if (
			(createTicketFormData?.subject?.length ?? 0) >
			RAISE_ISSUE_SUBJECT_MAX_LENGTH
		) {
			errorArray.push({
				subjectError: ` ${createTicketFormData?.subject?.length} / ${RAISE_ISSUE_SUBJECT_MAX_LENGTH} ${strings.CHARACTER}`,
			});
		}
		if (
			(createTicketFormData?.description?.length ?? 0) >
			RAISE_ISSUE_DESCRIPTION_MAX_LENGTH
		) {
			errorArray.push({
				descriptionError: ` ${createTicketFormData?.description?.length} / ${RAISE_ISSUE_DESCRIPTION_MAX_LENGTH} ${strings.CHARACTER}`,
			});
		}

		if (errorArray?.length) {
			const output = Object.assign({}, ...errorArray);
			setCreateTicketFormError(output);
			return true;
		} else {
			setCreateTicketFormError(undefined);
			return false;
		}
	};
	const onSubmit = async () => {
		if (!validateForm()) {
			const programType = {
				userProgram: createTicketFormData?.userProgram?.id,
			};

			const courseType = {
				userCourse: createTicketFormData?.userProgram?.id,
			};
			const attachments = createTicketFormData?.attachments?.map(
				(item) => {
					return {
						name: item.name ?? "",
						key: item.key ?? "",
						size: item.size ?? 0,
					};
				},
			);
			let postData: ICreateTicketData = {
				data: {
					subject: createTicketFormData?.subject,
					category: createTicketFormData?.category?.text,
					description: createTicketFormData?.description,
					attachments: attachments ?? [],
				},
			};

			if (createTicketFormData?.userProgram?.isUserProgram) {
				postData = {
					data: {
						...postData?.data,
						...programType,
					},
				};
			} else {
				postData = {
					data: {
						...postData?.data,
						...courseType,
					},
				};
			}
			try {
				await createTicket(postData);
				onRaiseTicketAttachmentSuccess(
					createTicketFormData?.userProgram?.text,
					createTicketFormData?.category?.text,
					strings.NEW_TICKET_CREATED_SUCCESSFULLY,
				);

				goBack();
			} catch (error) {}
		}
	};

	return {
		onChangeSubject,
		createTicketFormData,
		createTicketFormError,
		onChangeDescription,
		addAttachments,
		removeAttachment,
		onSubmit,
		bottomSheetRef,
		modalData,
		onSubmitSubject,
		onSubmitDescription,
		modalOptions,
		openCourseSheet,
		openCategorySheet,
		onChooseItem,
		onViewAttachment,
		isDropDownItemLoading,
	};
};

export default RaiseATicketController;
