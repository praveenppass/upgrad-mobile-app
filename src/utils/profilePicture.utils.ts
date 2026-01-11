interface ProfilePictureObject {
	url?: string;
	URL?: string;
}

type ProfilePicture = string | null | undefined | ProfilePictureObject;

export const getProfilePictureUrl = (image: ProfilePicture): string => {
	if (!image) return "";

	if (typeof image === "string") return image;

	return image.url ?? image.URL ?? "";
};
