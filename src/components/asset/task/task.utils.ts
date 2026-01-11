import moment from "moment-timezone";

interface IShouldShowResubmissionButtonProps {
	isExtensionApplied: boolean;
	isResubmissionAllowed: boolean;
	submittedDate: string;
	originalDueDate: string | null;
	extendedDueDate: string | null;
}
export const shouldShowResubmissionButton = ({
	isExtensionApplied,
	isResubmissionAllowed,
	submittedDate,
	originalDueDate,
	extendedDueDate,
}: IShouldShowResubmissionButtonProps): boolean => {
	const isSubmitted = !!submittedDate;

	const dueDate = moment(extendedDueDate || originalDueDate || undefined);
	const submissionDate = moment(submittedDate || undefined);

	let isReSubmissionButtonVisible = false;

	if (isSubmitted) {
		if (submissionDate.isAfter(dueDate)) {
			isReSubmissionButtonVisible = false;
		} else {
			isReSubmissionButtonVisible = true;
		}
	} else {
		if (isExtensionApplied) {
			if (isResubmissionAllowed) {
				isReSubmissionButtonVisible = true;
			} else {
				if (submissionDate.isAfter(dueDate)) {
					isReSubmissionButtonVisible = false;
				} else {
					isReSubmissionButtonVisible = true;
				}
			}
		} else {
			if (isResubmissionAllowed) {
				isReSubmissionButtonVisible = true;
			} else {
				if (submissionDate.isAfter(dueDate)) {
					isReSubmissionButtonVisible = false;
				} else {
					isReSubmissionButtonVisible = true;
				}
			}
		}
	}

	return isReSubmissionButtonVisible;
};
