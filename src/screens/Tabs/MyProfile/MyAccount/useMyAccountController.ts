import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useMyAccountModel from "@screens/Tabs/MyProfile/MyAccount/useMyAccountModel";

import { AspirationsSkeleton } from "@components/MyProfile/MyAccount/AspirationsSkeleton";
import { CertificateSkeleton } from "@components/MyProfile/MyAccount/CertificateSkeleton";
import ContactDetailsSkeleton from "@components/MyProfile/MyAccount/ContactDetailsSkeleton";
import { PersonalDetailsSkeleton } from "@components/MyProfile/MyAccount/PersonalDetailsSkeleton";
import { WorkExperienceAndEducationDetailsSkeleton } from "@components/MyProfile/MyAccount/WorkExperienceAndEducationDetailsSkeleton";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { IPersonalDetails } from "@graphql/query/myProfile/myAccount/getMyAccountDetails";

import {
	ICPSEducationDetails,
	ICPSEmploymentStatus,
	ICPSWorkExperienceDetailsItem,
} from "@services/cpsService";
import downloadBase64File from "@services/downloadBase64File";
import downloadDocument from "@services/downloadDocument";
import { IUploadFileData, uploadFile } from "@services/uploadBase64";

import useGetTimezone from "@hooks/useGetTimezone";
import { useMedia } from "@hooks/useMedia";

import { formatBytes } from "@utils/functions";

import { setUserBasicDetails } from "@redux/slices/personalDetails.slice";
import { RootState } from "@redux/store/root.reducer";

import { IDateFormat, IFileTypeEnum } from "@interface/app.interface";
import {
	ICertificate,
	INaviagtionType,
	IPersonalInformation,
	IProfessionalInformation,
	IProfileComponentType,
	IProfileData,
	IProfileType,
} from "@interface/myAccount.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import {
	AspirationsIcon,
	CertificatesIcon,
	ContactDetailsIcon,
	EducationProfieIcon,
	PersonalDetails,
	WorkExperience,
} from "@assets/icons";
import { strings } from "@assets/strings";

const useMyAccountController = () => {
	const id = useSelector((state: RootState) => state.user.user.id);
	const userBasicDetails = useSelector(
		(state: RootState) => state.personalDetails.basicDetails,
	);
	const { showToast } = useToast();
	const { chooseMediaFromGallery, choosePdf } = useMedia();
	const dispatch = useDispatch();
	const [isMediaPickerOpen, setMediaPickerOpen] = useState(false);
	const [uploadResumeFilename, setUploadResumeFilename] = useState("");
	const [uploadResumePercent, setUploadResumePercent] = useState(0);
	const [isResumeUploading, setIsResumeUploading] = useState(false);

	const {
		myAccountData,
		myAccountLoading,
		aspirationsData,
		certificatesData,
		getMyAccountMainData,
		refetchMyAccountMainData,
		percentageLoading,
		onUpdateResume,
		getMyAccountCompletionPercentage,
		refetchMyAccountCompletionPercentage,
		getAspirationsMainData,
		getCertificatesData,
		downloadCertificates,
		userCompletionData,
		onManageProfileResume,
		updateUserProfileDetails,
	} = useMyAccountModel();

	const {
		dateOfBirth,
		address,
		pincode,
		workExperiences,
		educations,
		alternateEmail,
		email,
		mobile,
		firstName,
		lastName,
		image,
		userProfileResume,
		currentlyWorking,
	} = myAccountData || {};

	const { name: userTimezone } = useGetTimezone();
	const navigation = useNavigation<RootHomeStackList>();
	const [modalVisible, setModalVisible] = useState(false);
	const [profileModalVisible, setProfileModalVisible] = useState(false);
	const [resumeDownloadingId, setResumeDownloadingId] = useState<
		string | null
	>(null);
	const [certificateDownloadingId, setCertificateDownloadingId] = useState<
		string | null
	>(null);
	const [resumeRemovingFileName, setResumeRemovingFileName] = useState<
		string | null
	>(null);

	const [uploadProfilePicLoading, setUploadProfilePicLoading] =
		useState(false);

	const onToggleModal = () => {
		setModalVisible(!modalVisible);
	};
	const toggleProfileModal = () => {
		setProfileModalVisible(!profileModalVisible);
	};
	const certificates = certificatesData?.userCourseCertificates?.result;
	const resumeData = userProfileResume?.resumes?.filter((r) => !r._isDeleted);
	const loading = myAccountLoading || percentageLoading;
	const initials = firstName?.[0] || "A";
	const isuploadLimitReached = resumeData?.length === 6;
	const aspirations = aspirationsData?.learnerCourses?.result;
	const percentage =
		userCompletionData?.userProfileCompletionStatus?.completionPercentage;

	const userInfo = {
		name: `${firstName || ""} ${lastName || ""}`,
		initials,
		profilePic: image,
		email,
	};

	const profilePicModalData = {
		initials,
		profilePic: image,
	};

	const formatDate = (date: string) => {
		return moment(date).tz(userTimezone).format(IDateFormat.date);
	};

	useEffect(() => {
		if (!id) return;
		getMyAccountData();
		getCompletionPercentage();
		getAspirationsData();
		getCertificationsData();
	}, [id]);

	useFocusEffect(
		useCallback(() => {
			if (!id) return;
			refetchMyAccountMainData();
			refetchMyAccountCompletionPercentage();
		}, [id]),
	);

	const getMyAccountData = async () => {
		getMyAccountMainData();
	};

	const getCompletionPercentage = async () => {
		getMyAccountCompletionPercentage();
	};

	const getAspirationsData = async () => {
		getAspirationsMainData();
	};

	const getCertificationsData = async () => {
		getCertificatesData();
	};

	const getCertificateDownloadUrl = (certificateId: string) => {
		const variables = {
			where: {
				id: certificateId,
			},
		};
		setCertificateDownloadingId(certificateId);

		downloadCertificates({
			variables,
			onCompleted: (data) => {
				if (!data) return;
				const { file } = data?.downloadUserCourseCertificate || [];

				downloadBase64File({
					base64File: file,
					fileName: `certificate_${certificateId}`,
					fileExtension: IFileTypeEnum.PDF,
					successCallback: () => {
						showToast({
							message: strings.DOWNLOAD_CERTIFICATE_SUCCESS,
							type: ToastType.SUCCESS,
						});
						setCertificateDownloadingId(null);
					},
					errorCallback: () => {
						showToast({
							message: strings.DOWNLOAD_CERTIFICATE_FAIL,
							type: ToastType.ERROR,
						});
						setCertificateDownloadingId(null);
					},
				});
			},
		});
	};

	const updateUserProfilePicture = (imageUrl: string | null) => {
		dispatch(
			setUserBasicDetails({
				...userBasicDetails,
				profilePicture: imageUrl || "",
			}),
		);
	};

	const onRemoveImage = async () => {
		try {
			setUploadProfilePicLoading(true);
			await updateUserProfileDetails({
				profilePictureUrl: "",
			});

			updateUserProfilePicture("");
			refetchMyAccountMainData();
			toggleProfileModal();
			refetchMyAccountCompletionPercentage();
			setUploadProfilePicLoading(false);
		} catch (error) {
			setUploadProfilePicLoading(false);
		}
	};

	const chooseImage = async () => {
		if (isMediaPickerOpen) return;
		setMediaPickerOpen(true);
		const res = await chooseMediaFromGallery();
		setMediaPickerOpen(false);

		if (!res?.assets) return;
		const choosenImage = res.assets[0];
		if (!res || formatBytes(choosenImage.fileSize || 0).size > 10.0) return;

		if (!choosenImage) return;
		setUploadProfilePicLoading(true);
		const imageUploadRes = await uploadFile({
			file: {
				uri: choosenImage.uri || "",
				name: choosenImage.fileName || "",
				type: choosenImage.type || "",
				size: choosenImage.fileSize || 0,
			},
		});
		const imageUrl = imageUploadRes.data.location;
		if (!imageUrl) return;

		try {
			await updateUserProfileDetails({ profilePictureUrl: imageUrl });
			updateUserProfilePicture(imageUrl);
			refetchMyAccountMainData();
			refetchMyAccountCompletionPercentage();
			toggleProfileModal();
			setUploadProfilePicLoading(false);
		} catch (error) {
			setUploadProfilePicLoading(false);
		}
	};

	const onRemoveResume = (resumeId: string) => {
		setResumeRemovingFileName(resumeId);
		const variables = {
			where: {
				actionType: "delete",
				resumeId: resumeId,
			},
		};
		onManageProfileResume({
			variables,
			onCompleted: async () => {
				await refetchMyAccountMainData();
				refetchMyAccountCompletionPercentage();
				setResumeRemovingFileName(null);
			},
		});
	};

	const onDownloadResume = (fileName: string, filePath: string) => {
		setResumeDownloadingId(fileName);
		downloadDocument({
			fileUrl: filePath,
			fileName: fileName,
			fileExtension: IFileTypeEnum.PDF,
			successCallback: () => setResumeDownloadingId(null),
			errorCallback: () => setResumeDownloadingId(null),
		});
	};

	const handleResumeUpload = async () => {
		const res = await choosePdf();
		if (!res) return;
		const file = res[0];
		if (!res || formatBytes(file.size || 0).size > 3.0) return;

		setIsResumeUploading(true);
		setUploadResumeFilename(file.name || "");

		const {
			data: { location },
		} = await uploadFile({
			file: file as IUploadFileData,
			onProgress: (p) => setUploadResumePercent(p),
		});

		const mapResumeData = (
			previousResumeData?:
				| { uploadedAt: string; fileName: string; filePath: string }[]
				| null,
		) => {
			return (
				previousResumeData?.map(
					({ uploadedAt, fileName, filePath }) => ({
						uploadedAt,
						fileName,
						filePath,
					}),
				) || []
			);
		};

		onUpdateResume({
			variables: {
				where: { id },
				data: {
					userProfileResume: {
						resumes: [
							...mapResumeData(resumeData),
							{
								uploadedAt: moment()
									.tz(userTimezone)
									.toISOString(),
								fileName: res[0]?.name,
								filePath: location,
							},
						],
					},
				},
			},
			onCompleted: async () => {
				refetchMyAccountMainData();
				setIsResumeUploading(false);
				refetchMyAccountCompletionPercentage();
				setUploadResumeFilename("");
				setUploadResumePercent(0);
			},
		});
	};

	const detailsConfigMapper = ({
		details,
		type,
	}: {
		details?: IProfileType[];
		type: IProfileComponentType;
	}): IProfileType[] => {
		if (!details) return [];
		switch (type) {
			case IProfileComponentType.PERSONAL_INFO:
			case IProfileComponentType.PROFESSIONAL_INFO: {
				const newDetails = details as (
					| IPersonalInformation
					| IProfessionalInformation
				)[];
				return newDetails?.filter((d) => !!d.subText && !!d.text);
			}
			default:
				return details;
		}
	};

	const mapEducationDetails = (
		educationsData?: ICPSEducationDetails[] | null,
	): IProfessionalInformation[] => {
		return (
			educationsData?.map((education): IProfessionalInformation => {
				const text = `${education?.educationType || ""}${
					education?.branch || education?.stream
						? `, ${education?.branch || education?.stream || ""}`
						: ""
				}`;
				const subText = education?.university || "";
				const description =
					education?.graduatingYearFrom && education?.graduatingYearTo
						? `${education.graduatingYearFrom} - ${education.graduatingYearTo}`
						: education?.graduatingYearFrom ||
							education?.graduatingYearTo ||
							"";

				return { text, subText, description };
			}) || []
		);
	};

	const mapWorkExperienceDetails = (
		workExperiencesData?: ICPSWorkExperienceDetailsItem[] | null,
	): IProfessionalInformation[] => {
		return (
			workExperiencesData?.map(
				({
					currentWorkExperience,
					industry,
					designation,
					startYear,
					endYear,
					org,
				}) => {
					let text = "";
					let subText = "";
					let description = "";

					if (currentWorkExperience) {
						text = `${designation || ""}, ${industry || ""}`;
						subText = org || "";
						description = `${startYear} - ${
							endYear ? endYear : strings.PRESENT
						}`;
					} else if (
						currentlyWorking === ICPSEmploymentStatus.FRESHER
					) {
						text = strings.NOT_EMPLOYED;
						subText = strings.NOT_ASSIGNED;
						description = "";
					} else {
						text = `${designation || ""}, ${industry || ""}`;
						subText = org || "";
						description = `${startYear} - ${
							endYear ? endYear : strings.PRESENT
						}`;
					}

					return { text, subText, description };
				},
			) || []
		);
	};

	const mapPersonalDetails = (
		personalDetailsData?: IPersonalDetails | null,
	): { text: string; subText: string }[] => {
		if (!personalDetailsData) return [];

		const { userDateOfBirth, userAddress, userPincode } =
			personalDetailsData;

		return [
			{
				text: strings.DATE_OF_BIRTH,
				subText: userDateOfBirth ? formatDate(userDateOfBirth) : "",
			},
			{
				text: strings.ADDRESS,
				subText:
					!userAddress && !userPincode
						? ""
						: userAddress && userPincode
							? `${userAddress}, ${userPincode}`
							: userAddress || userPincode || "",
			},
		];
	};

	const personalDetails = mapPersonalDetails({
		userDateOfBirth: dateOfBirth ?? null,
		userAddress: address ?? null,
		userPincode: pincode ?? null,
	});

	const profileData: IProfileData[] = [
		{
			type: IProfileComponentType.PERSONAL_INFO,
			title: strings.PERSONAL_DETAILS,
			Icon: PersonalDetails,
			data: detailsConfigMapper({
				details: personalDetails,
				type: IProfileComponentType.PERSONAL_INFO,
			}),
			SkeletonComp: PersonalDetailsSkeleton,
			onPressViewNavigate: () =>
				navigation.navigate("MyProfilePersonalDetails", {
					isStudyPlanBlocker: false,
				}),
			skeletonCount: 2,
			navigationType: INaviagtionType.ADD_EDIT,
			onPressAddEditNavigate: () =>
				navigation.navigate("MyProfilePersonalDetails", {
					isStudyPlanBlocker: false,
				}),
		},
		{
			type: IProfileComponentType.PROFESSIONAL_INFO,
			title: strings.WORK_EXP,
			Icon: WorkExperience,
			data: detailsConfigMapper({
				details: mapWorkExperienceDetails(workExperiences),
				type: IProfileComponentType.PROFESSIONAL_INFO,
			}),
			SkeletonComp: WorkExperienceAndEducationDetailsSkeleton,
			skeletonCount: 3,
			viewScreen: true,
			navigationType: INaviagtionType.ADD_EDIT,
			showCount: true,
			onPressViewNavigate: () =>
				navigation.navigate("WorkExperienceViewScreen"),
			onPressAddEditNavigate: () =>
				navigation.navigate("MyProfileWorkExperience", {
					workExperienceIndex: 0,
				}),
		},
		{
			type: IProfileComponentType.PROFESSIONAL_INFO,
			title: strings.EDUCATION,
			Icon: EducationProfieIcon,
			data: detailsConfigMapper({
				details: mapEducationDetails(educations),
				type: IProfileComponentType.PROFESSIONAL_INFO,
			}),
			SkeletonComp: WorkExperienceAndEducationDetailsSkeleton,
			skeletonCount: 3,
			viewScreen: true,
			navigationType: INaviagtionType.ADD_EDIT,
			showCount: true,
			onPressViewNavigate: () =>
				navigation.navigate("EducationViewScreen"),
			onPressAddEditNavigate: () =>
				navigation.navigate("MyProfileEducationDetails", {
					educationDetailsIndex: 0,
				}),
		},
		{
			type: IProfileComponentType.PROFESSIONAL_INFO,
			title: strings.ASPIRATIONS_MY_ACCOUNT,
			Icon: AspirationsIcon,
			data: detailsConfigMapper({
				details:
					aspirations?.map(
						({ program, course, courseInfo, deliveryType }) => {
							const programName =
								courseInfo?.name ||
								program?.name ||
								course?.name ||
								"";
							const deliveryName = deliveryType?.name;
							const levelName =
								program?.level?.[0]?.name ||
								course?.courseLevels?.[0]?.name;

							const subText =
								deliveryName && levelName
									? `${deliveryName} | ${levelName}`
									: deliveryName || levelName || "";

							return {
								text: programName,
								subText,
							};
						},
					) || [],
				type: IProfileComponentType.PROFESSIONAL_INFO,
			}),
			SkeletonComp: AspirationsSkeleton,
			skeletonCount: 5,
			navigationType: INaviagtionType.ADD_EDIT,
			onPressViewNavigate: () =>
				navigation.navigate("AspirationsViewScreen"),
			onPressAddEditNavigate: () =>
				navigation.navigate("AspirationsViewScreen"),
		},
		{
			type: IProfileComponentType.CERTIFICATE,
			title: strings.CERTIFICATIONS,
			Icon: CertificatesIcon,
			data: certificates?.map((certificate) => {
				const imageUrl = certificate?.imageUrl;
				const title = certificate?.userProgram?.program?.name || "";
				const certificateId = certificate?.id;
				const subTitle =
					certificate?.courseCertificateTemplate?.displayName || "";

				return {
					imageUrl,
					title,
					subTitle,
					downloadCertificate: () =>
						getCertificateDownloadUrl(certificateId),
					certificateDownloadingId: certificateDownloadingId,
					downloadUrl: certificateId,
				};
			}) as ICertificate[],
			SkeletonComp: CertificateSkeleton,
			onPressViewNavigate: () =>
				navigation.navigate("CertificateViewScreen"),
			skeletonCount: 1,
			viewScreen: true,
			navigationType: INaviagtionType.VIEW_MORE,
		},
		{
			type: IProfileComponentType.PERSONAL_INFO,
			title: strings.CONTACT_DETAILS,
			Icon: ContactDetailsIcon,
			data: detailsConfigMapper({
				details: [
					{
						text: strings.EMAIL_ID,
						subText: email || "",
					},
					{
						text: strings.MOBILE_NUMBER,
						subText: mobile || "",
					},
					{
						text: strings.ALTERNATE_EMAIL,
						subText: alternateEmail || "",
					},
				],
				type: IProfileComponentType.PERSONAL_INFO,
			}),
			SkeletonComp: ContactDetailsSkeleton,
			onPressViewNavigate: () =>
				navigation.navigate("MyProfileContactDetails"),
			onPressAddEditNavigate: () =>
				navigation.navigate("MyProfileContactDetails"),
			skeletonCount: 3,
			navigationType: INaviagtionType.ADD_EDIT,
		},
	];

	return {
		resumeDownloadingId,
		modalVisible,
		onToggleModal,
		myAccountData,
		profileModalVisible,
		toggleProfileModal,
		percentage,
		profileData,
		userInfo,
		profilePicModalData,
		onRemoveImage,
		chooseImage,
		resumeData,
		loading,
		uploadResumeFilename,
		uploadResumePercent,
		isResumeUploading,
		onRemoveResume,
		handleResumeUpload,
		isuploadLimitReached,
		onDownloadResume,
		resumeRemovingFileName,
		uploadProfilePicLoading,
	};
};

export default useMyAccountController;
