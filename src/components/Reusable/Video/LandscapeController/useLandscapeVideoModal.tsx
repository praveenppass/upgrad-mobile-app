import { useLazyQuery } from "@apollo/client";

import getKeyMovementTranscriptDetailsQuery, {
	IGetKeyMovementTranscriptDetailsVariables,
	IKeyMovementTranscriptDetails,
} from "@graphql/query/asset/video/landscape/getKeyMovementTranscriptDetailsQuery";
import {
	IGetVideoProgramDetailsVariable,
	IVideoProgramDetailsUserEvent,
} from "@graphql/query/asset/video/landscape/getProgramDetailsQuery";
import getVideoProgramDetailsQuery from "@graphql/query/asset/video/landscape/getProgramDetailsQuery";

import { client } from "@config/apollo";

const useLandscapeVideoModal = () => {
	const [
		getVideoProgramDetails,
		{ data: videoProgramDetails, loading: videoProgramDetailsLoading },
	] = useLazyQuery<
		IVideoProgramDetailsUserEvent,
		IGetVideoProgramDetailsVariable
	>(getVideoProgramDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getKeyMovementTranscriptDetails,
		{ data: transcriptsData, loading: transcriptsLoading },
	] = useLazyQuery<
		IKeyMovementTranscriptDetails,
		IGetKeyMovementTranscriptDetailsVariables
	>(getKeyMovementTranscriptDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		videoProgramDetails,
		videoProgramDetailsLoading,
		transcriptsData,
		transcriptsLoading,
		getVideoProgramDetails,
		getKeyMovementTranscriptDetails,
	};
};

export default useLandscapeVideoModal;
