import { gql } from "@apollo/client";

const getDownloadCertificatesQuery = gql`
	query downloadUserCourseCertificate(
		$where: downloadUserCourseCertificateWhereInput
	) {
		downloadUserCourseCertificate(where: $where) {
			file
		}
	}
`;
export default getDownloadCertificatesQuery;

export interface IDownloadCertificateResponse {
	downloadUserCourseCertificate: {
		file: string;
	};
}
