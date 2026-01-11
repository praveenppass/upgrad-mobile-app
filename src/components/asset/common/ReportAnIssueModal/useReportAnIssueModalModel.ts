import { useLazyQuery, useMutation } from "@apollo/client";

import reportAnIssueQuery, {
	IReportAnIssueQuery,
	IReportAnIssueQueryVariables,
} from "@graphql/mutation/asset/reportAnIssue";
import getReportAnIssueCourseInfoQuery, {
	IReportAnIssueCourseInfo,
	IReportAnIssueCourseInfoVariables,
} from "@graphql/query/asset/reportAnIssueInfo/getReportAnIssueCourseInfo";
import getReportAnIssueProgramInfoQuery, {
	IReportAnIssueProgramInfo,
	IReportAnIssueProgramInfoVariables,
} from "@graphql/query/asset/reportAnIssueInfo/getReportAnIssueProgramInfo";

import { client } from "@config/apollo";

const useReportAnIssueModalModel = () => {
	const [reportAnIssue, { loading: reportAnIssueLoading }] = useMutation<
		IReportAnIssueQuery,
		IReportAnIssueQueryVariables
	>(reportAnIssueQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [getReportAnIssueProgramInfo] = useLazyQuery<
		IReportAnIssueProgramInfo,
		IReportAnIssueProgramInfoVariables
	>(getReportAnIssueProgramInfoQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [getReportAnIssueCourseInfo] = useLazyQuery<
		IReportAnIssueCourseInfo,
		IReportAnIssueCourseInfoVariables
	>(getReportAnIssueCourseInfoQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		reportAnIssue,
		reportAnIssueLoading,
		getReportAnIssueProgramInfo,
		getReportAnIssueCourseInfo,
	};
};

export default useReportAnIssueModalModel;
