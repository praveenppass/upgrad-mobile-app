// Common strings used across the application
import { ENV } from "@config/env";

interface ILinkedInShareText {
	courseName: string;
	certificateUrl: string;
}

interface IXShareText {
	courseName: string;
	certificateUrl: string;
}

const common = {
	loading: "Loading",
	toast: {},
	validation: {},
	readMore: {
		readMore: "Read More",
		readLess: "Read Less",
	},
	backToTop: "Back to top",
	copy: "Copy",
	close: "Close",
	networkErrorScreen: {
		debugInfoModal: {
			viewDebugInfo: "View Debug Info",
			errorDetails: "Error Details",
			noErrorDetails: "No error details available",
		},
		clientError: {
			title: "Something Went Wrong",
			description: "We couldn't process your request. Please try again.",
		},
		networkLost: {
			title: "Network Connection Lost",
			description:
				"This app needs an internet connection. Please reconnect to proceed.",
		},
		tryAgain: "Try Again",
	},
	optional: "Optional",
	elective: "Elective",
	track: "Track",
	youAreHere: "You're here",

	microInteractions: {
		lastAssetCompletion: {
			description:
				"You've reached the last asset in this program. Keep up the great work!",
			button: "Go to Study Plan",
		},
		courseCompletion: {
			description:
				"My happy dance is officially out of control!Great job finishing your course",
			description2:
				"Hit that share button and show everyone what you've accomplished!",

			linkedInShareText: ({
				courseName,
				certificateUrl,
			}: ILinkedInShareText) => `
				🚀 Exciting News! 🚀
				I'm thrilled to share that I've just completed a ${courseName} with @UpGrad! 🎓✨ This course has been an exciting experience where I expanded my skills and deepened my understanding in ${courseName}.  A huge thank you to the amazing instructors and peers who enriched this journey.

				I'm looking forward to applying these new insights and strategies to my work and continuing to grow both personally and professionally.

				Here's to lifelong learning and embracing new challenges! 🌟

				You can explore similar courses here at ${ENV.ugUrl}

				#upGrad #aagekisoch

				${certificateUrl}
			`,
			xShareText: ({ courseName, certificateUrl }: IXShareText) => `
				🚀 Exciting News! 🚀
				Thrilled to have completed ${courseName} with @UpGrad! 🎓✨ This course helped me grow my skills and deepen my knowledge. Grateful for this enriching journey.

				#upGrad #aagekisoch

				${certificateUrl}
			`,
		},
	},
	shareOn: "Share on",
	logoutModal: {
		title: "Ready to head out?",
		subtitle: "You can always jump back in whenever you like.",
		logoutButton: "Logout",
		cancelButton: "Cancel",
	},
	agenda: "Agenda",
	resources: {
		viewResources: "View Resources",
		resourcesList: "Resources List",
		downloadAll: "Download All",
		downloadAllSuccess: "All resources downloaded successfully.",
		downloadAllFailure: "Failed to download all resources.",
	},
	file: {
		downloading: "Downloading...",
		downloadSuccess: "File downloaded successfully",
		downloadFailed: "File download failed...Please try again",
	},
} as const;

export default common;
