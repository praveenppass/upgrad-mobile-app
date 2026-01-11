import { useEffect, useState } from "react";

import useMyAccountModel from "@screens/Tabs/MyProfile/MyAccount/useMyAccountModel";

import { ToastType, useToast } from "@components/Reusable/Toast";

import downloadBase64File from "@services/downloadBase64File";

import { IFileTypeEnum } from "@interface/app.interface";

import { strings } from "@assets/strings";

const useCertificateController = () => {
	const { certificatesData, getCertificatesData, downloadCertificates } =
		useMyAccountModel();
	const { showToast } = useToast();
	const [certificateDownloadingId, setCertificateDownloadingId] = useState<
		string | null
	>(null);

	useEffect(() => {
		getCertificatesData();
	}, []);

	const certificates = certificatesData?.userCourseCertificates?.result;

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

	const data = certificates?.map((certificate) => {
		const imageUrl = certificate?.imageUrl;
		const title = certificate?.userProgram?.program?.name || "";
		const certificateId = certificate?.id;
		const subTitle =
			certificate?.courseCertificateTemplate?.displayName || "";

		return {
			imageUrl,
			title,
			subTitle,
			downloadCertificate: () => getCertificateDownloadUrl(certificateId),
			certificateDownloadingId: certificateDownloadingId,
			downloadUrl: certificateId,
		};
	});

	return {
		data,
	};
};

export default useCertificateController;
