import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useState } from "react";
import { Image } from "react-native";

import { Toast, ToastType } from "@components/Reusable/Toast";
import {
	ICertificatesComponent,
	IImageDimensionsState,
} from "@components/studyPlan/common/Certificates/certificates.interface";
import {
	getScaledHeight,
	mapUserCourseCertificate,
	mapUserProgramCertificate,
} from "@components/studyPlan/common/Certificates/certificates.utils";
import useCertificatesModel from "@components/studyPlan/common/Certificates/useCertificatesModel";

import downloadDocument from "@services/downloadDocument";

import { horizontalScale } from "@utils/functions";

import { LearningPathType } from "@interface/app.interface";

import { strings } from "@assets/strings";

const useCertificatesController = ({
	learningPathId,
	learningPathType,
}: ICertificatesComponent) => {
	const {
		getCourseCertificateData,
		programCertificateData,
		loading,
		getProgramCertificateData,
		courseCertificateData,
	} = useCertificatesModel();

	useEffect(() => {
		if (!learningPathId || !learningPathType) return;

		if (learningPathType === LearningPathType.COURSE)
			getCourseCertificateData(learningPathId);
		else getProgramCertificateData(learningPathId);
	}, [learningPathType, learningPathId]);

	const certificateData = useMemo(() => {
		if (learningPathType === LearningPathType.COURSE) {
			const certificate =
				courseCertificateData?.userCourseCertificates.result[0];
			if (!certificate) return null;

			return mapUserCourseCertificate(certificate);
		} else {
			const certificate =
				programCertificateData?.userCourseCertificates.result[0];
			if (!certificate) return null;

			return mapUserProgramCertificate(certificate);
		}
	}, [courseCertificateData, programCertificateData, learningPathType]);

	const certificateWidth = SCREEN_WIDTH - horizontalScale(40);

	const [certificateImageData, setCertificateImageData] =
		useState<IImageDimensionsState>({
			loading: true,
			imageDimensions: null,
		});

	useEffect(() => {
		const getImageDimensions = async () => {
			if (!certificateData?.certificateUrl) return;

			const imageDimensions = await Image.getSize(
				certificateData?.certificateUrl,
			);

			const certificateHeight = getScaledHeight({
				imageDimensions,
				width: certificateWidth,
			});

			setCertificateImageData({
				loading: false,
				imageDimensions: {
					width: certificateWidth,
					height: certificateHeight,
				},
			});
		};

		getImageDimensions();
	}, [certificateData?.certificateUrl]);

	const handleCertificateDownload = () => {
		downloadDocument({
			fileUrl: certificateData?.certificateUrl || "",
			successCallback: () =>
				Toast.showToast({
					message: strings.DOWNLOAD_SUCCESS,
					type: ToastType.SUCCESS,
				}),
			errorCallback: () =>
				Toast.showToast({
					message: strings.DOWNLOAD_FAILED,
					type: ToastType.ERROR,
				}),
		});
	};

	const certificateImageLoading = useMemo(
		() => certificateImageData.loading,
		[certificateImageData.loading],
	);

	const certificateImageDimensions = useMemo(
		() => certificateImageData.imageDimensions,
		[certificateImageData.imageDimensions],
	);

	return {
		certificate: certificateData,
		loading: loading && certificateImageLoading,
		certificateDimensions: certificateImageDimensions,
		handleCertificateDownload,
	};
};

export default useCertificatesController;
