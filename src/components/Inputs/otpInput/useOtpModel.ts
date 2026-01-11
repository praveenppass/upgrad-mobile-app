import { useMutation } from "@apollo/client";

import generateOtpQuery, {
	IGenerateMobileOtpVariable,
} from "@graphql/mutation/contactDetail/generateOtpQuery";
import verifyOtpQuery, {
	IVerifyOtpVariable,
} from "@graphql/mutation/contactDetail/verifyOtpQuery";

import { client } from "@config/apollo";

export const useOtpModel = () => {
	const [generateOtpMutation, { data: generateOtpResponse }] =
		useMutation<IGenerateMobileOtpVariable>(generateOtpQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [verifyOtpMutation, { data: verifyOtpResponse }] =
		useMutation<IVerifyOtpVariable>(verifyOtpQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	return {
		generateOtpResponse,
		verifyOtpResponse,
		generateOtpMutation,
		verifyOtpMutation,
	};
};
