import { useLazyQuery } from "@apollo/client";

import getAccountCertificatesQuery, {
	IGetAccountCeriticates,
} from "@graphql/query/myProfile/myAccount/getAccountCertificates";
import getDownloadCertificatesQuery, {
	IDownloadCertificateResponse,
} from "@graphql/query/myProfile/myAccount/getDownloadCertificatesQuery";

import { client } from "@config/apollo";

const useCertificateModel = () => {
	const [getCertificatesData, { data: certificatesData }] =
		useLazyQuery<IGetAccountCeriticates>(getAccountCertificatesQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [downloadCertificates] = useLazyQuery<IDownloadCertificateResponse>(
		getDownloadCertificatesQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	return {
		certificatesData,
		getCertificatesData,
		downloadCertificates,
	};
};
export default useCertificateModel;
