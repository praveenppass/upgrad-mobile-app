import { useMutation } from "@apollo/client";

import autofillFromLinkedInQuery, {
	IAutofillFromLinkedInQuery,
	IAutofillFromLinkedInQueryVariables,
} from "@graphql/mutation/myProfile/personalDetails/autofillFromLinkedIn";

import { client } from "@config/apollo";

const useProfileMethodsModel = (onLinkedInParseCompleted: () => void) => {
	const [
		parseLinkedin,
		{ data: parsedLinkedinData, loading: parseLinkedinLoading },
	] = useMutation<
		IAutofillFromLinkedInQuery,
		IAutofillFromLinkedInQueryVariables
	>(autofillFromLinkedInQuery, {
		client,
		fetchPolicy: "no-cache",
		onCompleted: onLinkedInParseCompleted,
	});

	return {
		parseLinkedin,
		parseLinkedinLoading,
		parsedLinkedinData,
	};
};

export default useProfileMethodsModel;
