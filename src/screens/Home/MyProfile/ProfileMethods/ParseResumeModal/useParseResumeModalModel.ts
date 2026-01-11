import { useMutation } from "@apollo/client";

import autofillFromResumeQuery, {
	IAutofillFromResumeQuery,
	IAutofillFromResumeQueryVariables,
} from "@graphql/mutation/myProfile/personalDetails/autofillFromResume";

import { client } from "@config/apollo";

const useFileUploadModalModel = () => {
	const [parseFile, { data: parsedFileData, loading: parseFileLoading }] =
		useMutation<
			IAutofillFromResumeQuery,
			IAutofillFromResumeQueryVariables
		>(autofillFromResumeQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	return {
		parseFile,
		parseFileLoading,
		parsedFileData,
	};
};

export default useFileUploadModalModel;
