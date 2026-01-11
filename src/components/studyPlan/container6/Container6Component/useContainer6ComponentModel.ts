import { useMutation } from "@apollo/client";

import createAssetBookmarkQuery, {
	ICreateAssetBookmarkQuery,
	ICreateAssetBookmarkQueryVariables,
} from "@graphql/mutation/asset/bookmark/createAssetBookmark";
import deleteAssetBookmarkQuery, {
	IDeleteAssetBookmarkQuery,
	IDeleteAssetBookmarkQueryVariables,
} from "@graphql/mutation/asset/bookmark/deleteAssetBookmark";
import createAssetNoteQuery, {
	ICreateAssetNoteQuery,
	ICreateAssetNoteQueryVariables,
} from "@graphql/mutation/asset/createAssetNote";
import updateAssetTimeSpentCourseQuery, {
	IUpdateAssetTimeSpentCourseQuery,
	IUpdateAssetTimeSpentCourseVariables,
} from "@graphql/mutation/asset/global/updateAssetTimeSpentCourseQuery";
import updateAssetTimeSpentProgramQuery, {
	IUpdateAssetUserProgramQuery,
	IUpdateAssetUserProgramVariables,
} from "@graphql/mutation/asset/global/updateAssetTimeSpentProgramQuery";

import { client } from "@config/apollo";

const useContainer6ComponentModel = () => {
	const [deleteBookmark] = useMutation<
		IDeleteAssetBookmarkQuery,
		IDeleteAssetBookmarkQueryVariables
	>(deleteAssetBookmarkQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [createBookmark] = useMutation<
		ICreateAssetBookmarkQuery,
		ICreateAssetBookmarkQueryVariables
	>(createAssetBookmarkQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [createAssetNote] = useMutation<
		ICreateAssetNoteQuery,
		ICreateAssetNoteQueryVariables
	>(createAssetNoteQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [updateProgramAssetSpendTime] = useMutation<
		IUpdateAssetUserProgramQuery,
		IUpdateAssetUserProgramVariables
	>(updateAssetTimeSpentProgramQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [updateCourseAssetSpendTime] = useMutation<
		IUpdateAssetTimeSpentCourseQuery,
		IUpdateAssetTimeSpentCourseVariables
	>(updateAssetTimeSpentCourseQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		deleteBookmark,
		createBookmark,
		createAssetNote,
		updateProgramAssetSpendTime,
		updateCourseAssetSpendTime,
	};
};

export default useContainer6ComponentModel;
