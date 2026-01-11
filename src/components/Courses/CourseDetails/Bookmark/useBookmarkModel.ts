import { useLazyQuery, useMutation } from "@apollo/client";

import deleteAssetBookmarkQuery, {
	IDeleteAssetBookmarkQuery,
	IDeleteAssetBookmarkQueryVariables,
} from "@graphql/mutation/asset/bookmark/deleteAssetBookmark";
import getCourseBookmarkQuery, {
	ICourseBookmarkCourses,
} from "@graphql/query/bookmark/getBookmarkUserCourseQuery";
import getBookmarkModuleAssetQuery, {
	IBookmarkModuleAssetType,
} from "@graphql/query/bookmark/getBoomarkAssetQuery";
import getCourseBookmarkAssetQuery from "@graphql/query/bookmark/getCourseBookmarkAssetQuery";
import getBookmarkCourseQuery, {
	IBookmarkCourseType,
} from "@graphql/query/bookmark/getCourseBookmarkQuery";
import getNotesAndBookModuleListQuery, {
	INoteBookModuleType,
} from "@graphql/query/notes/getNotesModulesQuery";
import getStudyCourseListQuery, {
	IGetStudyCourseListType,
} from "@graphql/query/studyplanTemp/getStudyProgramListQuery";
import getStudyCourseContainerQuery, {
	IStudyCourseContainer,
} from "@graphql/query/studyplanTemp/getStudyUserCourseContainer";

import { client } from "@config/apollo";

export const useBookmarkModel = () => {
	//course api
	const [
		getCourseDetailsList,
		{ data: courseDetailsData, loading: courseDetailsLoading },
	] = useLazyQuery<IBookmarkCourseType>(getBookmarkCourseQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [getStudyProgramContainerList, { data: studyProgramContainer }] =
		useLazyQuery<IGetStudyCourseListType>(getStudyCourseListQuery, {
			client,
			fetchPolicy: "network-only",
		});

	// module base details  TODO module follow is not manage in website so use study plan consept
	const [
		getModuleDetailsList,
		{ data: modulesDetailsData, loading: moduleListLoading },
	] = useLazyQuery<INoteBookModuleType>(getNotesAndBookModuleListQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [getBookmarkAssetsList, { data: bookMarkAssetsListData }] =
		useLazyQuery<IBookmarkModuleAssetType>(getBookmarkModuleAssetQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [deleteBookmarkCall] = useMutation<
		IDeleteAssetBookmarkQuery,
		IDeleteAssetBookmarkQueryVariables
	>(deleteAssetBookmarkQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	//course base
	const [getCourseBookmarkContainerDetails, { data: courseContainer }] =
		useLazyQuery<ICourseBookmarkCourses>(getCourseBookmarkQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [getCourseBookmarkAssetDetails, { data: courseBookmarkAsset }] =
		useLazyQuery<IGetStudyCourseListType>(getCourseBookmarkAssetQuery, {
			client,
			fetchPolicy: "network-only",
		});

	const [getStudyCourseContainerDetails, { data: studyCourseContainer }] =
		useLazyQuery<IStudyCourseContainer>(getStudyCourseContainerQuery, {
			client,
			fetchPolicy: "network-only",
		});

	return {
		courseDetailsData,
		modulesDetailsData,
		moduleListLoading,
		courseDetailsLoading,
		bookMarkAssetsListData,
		studyProgramContainer,
		courseContainer,
		courseBookmarkAsset,
		studyCourseContainer,
		getCourseDetailsList,
		getModuleDetailsList,
		getBookmarkAssetsList,
		deleteBookmarkCall,
		getStudyProgramContainerList,
		getCourseBookmarkAssetDetails,
		getCourseBookmarkContainerDetails,
		getStudyCourseContainerDetails,
	};
};
