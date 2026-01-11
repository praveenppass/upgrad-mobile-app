import { useLazyQuery, useMutation } from "@apollo/client";

import createGeneralNoteQuery, {
	ICreateGeneralNoteQueryBodyVariables,
} from "@graphql/mutation/generalNotes/createGeneralNotes";
import deleteGeneralNoteQuery, {
	IDeleteGeneralNoteQueryVariables,
} from "@graphql/mutation/generalNotes/deleteGeneralNotes";
import updateGeneralNote, {
	IUpdateGeneralNoteQueryBodyVariables,
	IUpdateGeneralNoteQueryVariables,
} from "@graphql/mutation/generalNotes/updateGeneralNotes";
import createNotesQuery, {
	ICreateNoteBodyVariables,
} from "@graphql/mutation/notes/createNotes";
import deleteNotesQuery, {
	IDeleteNoteQueryVariables,
} from "@graphql/mutation/notes/deleteNotes";
import updateNotesQuery, {
	IUpdateNoteQueryVariables,
} from "@graphql/mutation/notes/updateNotes";
import downloadCourseNoteQuery, {
	IdownloadCourseNotes,
} from "@graphql/query/generalNotes/downloadCourseNotesQuery";
import downloadGeneralNote, {
	IdownloadGeneralNotes,
} from "@graphql/query/generalNotes/downloadGeneralNotesQuery";
import {
	getAllGeneralNotesCourse,
	getAllGeneralNotesProgram,
	IGeneralNotesCourseType,
	IGeneralNotesProgramType,
} from "@graphql/query/generalNotes/getAllGeneralNotesQuery";
import getNotesAssetCourseQuery, {
	INotesAssetCourseType,
} from "@graphql/query/notes/getNoteAssetCourseQuery";
import getNotesModuleAssetQuery, {
	INotesAssetQuery,
} from "@graphql/query/notes/getNotesAssetQuery";
import getNotesCourseContainerQuery, {
	INotesCourseContainerType,
} from "@graphql/query/notes/getNotesCourseContainerQuery";
import { INotesCourseType } from "@graphql/query/notes/getNotesProgramContainerQuery";
import getNotesProgramCourseQuery from "@graphql/query/notes/getNotesProgramContainerQuery";
import getTotalNotesCount, {
	ITotalNotesCount,
} from "@graphql/query/notes/getTotalNotesCountQuery";
import getStudyCourseListQuery, {
	IGetStudyCourseListType,
} from "@graphql/query/studyplanTemp/getStudyProgramListQuery";
import getStudyCourseContainerQuery, {
	IStudyCourseContainer,
} from "@graphql/query/studyplanTemp/getStudyUserCourseContainer";

import { client } from "@config/apollo";

export const useNotesModel = () => {
	const [
		getProgramContainerDetails,
		{ data: programContainerDetails, loading: courseDetailsLoading },
	] = useLazyQuery<INotesCourseType>(getNotesProgramCourseQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [getStudyCourseDetails, { data: studyProgramContainer }] =
		useLazyQuery<IGetStudyCourseListType>(getStudyCourseListQuery, {
			client,
			fetchPolicy: "network-only",
		});
	// general notes list
	const [getGeneralNotesProgram, { data: listOfGeneralNotesProgram }] =
		useLazyQuery<IGeneralNotesProgramType>(getAllGeneralNotesProgram, {
			client,
			fetchPolicy: "no-cache",
		});

	const [getGeneralNotesCourse, { data: listOfGeneralNotesCourse }] =
		useLazyQuery<IGeneralNotesCourseType>(getAllGeneralNotesCourse, {
			client,
			fetchPolicy: "no-cache",
		});

	//download general notes list
	const [downloadGeneralNotes, { data: downloadFileURL }] =
		useLazyQuery<IdownloadGeneralNotes>(downloadGeneralNote, {
			fetchPolicy: "no-cache",
			client,
		});

	const [downloadCourseNotes, { data: downloadCourseFileURL }] =
		useLazyQuery<IdownloadCourseNotes>(downloadCourseNoteQuery, {
			fetchPolicy: "no-cache",
			client,
		});

	const [getNotesAssetsList, { data: notesAssetData }] =
		useLazyQuery<INotesAssetQuery>(getNotesModuleAssetQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [deleteGeneralNoteCall] =
		useMutation<IDeleteGeneralNoteQueryVariables>(deleteGeneralNoteQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [createGeneralNoteCall] =
		useMutation<ICreateGeneralNoteQueryBodyVariables>(
			createGeneralNoteQuery,
			{
				client,
				fetchPolicy: "no-cache",
			},
		);

	const [updateGeneralNoteCall] = useMutation<
		IUpdateGeneralNoteQueryBodyVariables,
		IUpdateGeneralNoteQueryVariables
	>(updateGeneralNote, {
		client,
		fetchPolicy: "no-cache",
	});

	const [getTotalNotes, { data: totalNotesCount }] =
		useLazyQuery<ITotalNotesCount>(getTotalNotesCount, {
			client,
			fetchPolicy: "no-cache",
		});

	const [createNoteCall] = useMutation<ICreateNoteBodyVariables>(
		createNotesQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [deleteNoteCall] = useMutation<IDeleteNoteQueryVariables>(
		deleteNotesQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [updateNoteCall] = useMutation<IUpdateNoteQueryVariables>(
		updateNotesQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	//course
	const [getCourseContainerDetails, { data: courseContainerDetails }] =
		useLazyQuery<INotesCourseContainerType>(getNotesCourseContainerQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [getStudyCourseContainerDetails, { data: studyCourseContainer }] =
		useLazyQuery<IStudyCourseContainer>(getStudyCourseContainerQuery, {
			client,
			fetchPolicy: "network-only",
		});

	const [getNotesAssetsCourseList, { data: notesAssetCourseData }] =
		useLazyQuery<INotesAssetCourseType>(getNotesAssetCourseQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	return {
		programContainerDetails,
		listOfGeneralNotesProgram,
		listOfGeneralNotesCourse,
		courseDetailsLoading,
		notesAssetData,
		downloadFileURL,
		totalNotesCount,
		studyProgramContainer,
		courseContainerDetails,
		studyCourseContainer,
		notesAssetCourseData,
		downloadCourseFileURL,
		getProgramContainerDetails,
		getGeneralNotesProgram,
		getGeneralNotesCourse,
		downloadGeneralNotes,
		deleteGeneralNoteCall,
		createGeneralNoteCall,
		updateGeneralNoteCall,
		getNotesAssetsList,
		getTotalNotes,
		getStudyCourseDetails,
		createNoteCall,
		deleteNoteCall,
		updateNoteCall,
		getCourseContainerDetails,
		getStudyCourseContainerDetails,
		getNotesAssetsCourseList,
		downloadCourseNotes,
	};
};
