const isAppsUri = /^(tel|mailto|maps|geo|sms):/;
const isSocialUri = /\b(?:twitter|whatsapp|facebook|linkedin)\b/;
const isGoogleDocsUri =
	/^(https?:\/\/)?(docs|sheets|slides|drive)\.google\.com/i;

const isLinkedInUrl =
	/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;

const extractYoutubeIdRegex =
	/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export {
	extractYoutubeIdRegex,
	isAppsUri,
	isSocialUri,
	isGoogleDocsUri,
	isLinkedInUrl,
};
