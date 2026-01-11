import { useMutation } from "@apollo/client";

import generateOtpQuery, {
	IGenerateMobileOtpVariable,
} from "@graphql/mutation/contactDetail/generateOtpQuery";

import { client } from "@config/apollo";

export const useNumberInputWithVerifyModel = () => {
	const [generateOtpMutation, { data: generateOtpResponse }] =
		useMutation<IGenerateMobileOtpVariable>(generateOtpQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	return {
		generateOtpResponse,
		generateOtpMutation,
	};
};
