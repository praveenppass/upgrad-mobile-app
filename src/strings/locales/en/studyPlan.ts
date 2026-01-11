// Study Plan related strings organized by component structure

interface IExtensionInfoModalDescription {
	totalExtensions: number;
	usedExtensions: number;
}

const studyPlan = {
	certificates: {
		downloadCertificate: "Download Certificate",
		showEveryone:
			"Hit that share button and show everyone what you've accomplished!",
	},
	bottomTab: {
		studyPlan: "Study Plan",
		courseMenu: "Course Menu",
		planner: "Planner",
		chatbot: "MI-Ask Bot",
		notes: "Notes",
		bookmarks: "Bookmarks",
		addNote: "Add Note",
		report: "Report",
		scorecard: "Scorecard",
		certificate: "Certificate",
	},
	resumeAssetSticky: {
		continueLearning: "Continue Learning",
		startLearning: "Start Learning",
	},
	container1: {
		baseProgram: "Base Program",
		specialization: "Specialization",
	},
	container2: {
		specializationTag: "Specialization",
		courseCard: {
			course: "Course",
			optional: "Optional",
			assessments: "Assessments",
			track: "Track",
			trackGroup: "Track Group",
			electiveGroup: "Elective Group",
			elective: "Elective",
			shareAchievement: "Share Achievement",

			trackSelection: {
				isAvailable: {
					description:
						"This course is part of a track for which selection is available now.",
					title: "Please select a track on a desktop to continue learning",
				},
				isNotAvailable: {
					description: (date: string) =>
						`This course is a part of a track which is available for selection from ${date}.`,
					title: "Please visit us on a desktop to see the curriculum and choose a track.",
				},
			},
			electiveSelection: {
				isAvailable: {
					description:
						"This course is part of an elective for which selection is available now.",
					title: "Please select an elective on a desktop to continue learning",
				},
				isNotAvailable: {
					description: (date: string) =>
						`This course is a part of an elective which is available for selection from ${date}.`,
					title: "Please visit us on a desktop to see the curriculum and choose an elective.",
				},
			},
		},

		courseInfo: {
			extensionsUsed: "Extensions used",
		},
		extensionInfoModal: {
			title: "What are Extensions",
			description: ({
				totalExtensions,
				usedExtensions,
			}: IExtensionInfoModalDescription) =>
				`You can extend the due dates for all assessments within a module. However, extensions are limited—you have a total of ${totalExtensions} module extensions for this program, and you have used ${usedExtensions}`,
		},
		notificationCard: {
			productivityGpt: "Productivity GPT",
			upcomingSpecializations: "Upcoming Specializations",
			productivityGptDesktopMessage: "Smarter Learning Starts Here.",
			specializationDesktopLoginMessage:
				"Log in on your desktop to complete the selection process",
		},

		programUpgradedModal: {
			title: "Program Upgraded",
			description:
				"This program has been upgraded with the latest content and features to enhance your learning experience",
		},

		specializationModal: {
			title: "Go To Desktop",
			description: (specializationCount: number) =>
				`You have enrolled for ${specializationCount} Specializations as part of your course. Log in on your desktop now to complete the selection process`,
		},
	},
	profileBlocker: {
		title: "Complete your Profile",
		subtitle:
			"Fill in your details to keep learning without interruptions. You're almost there!",
		due: "Due",
		completeNow: "Complete Now",
		backToHome: "Go to Home",
		AccessPaused: "Access Paused!",
		AccessPausedDescription:
			"The submission deadline for your profile details has passed. Complete them now to resume learning.",
		profileSections: {
			personalDetails: "Personal Details",
			workExperience: "Work Experience",
			education: "Education",
			aspiration: "Aspiration",
			contactDetails: "Contact Details",
		},
	},
	profileSetup: {
		title: "Personal Details",
		mainQuestion: "How would you like to tell us about yourself?",
		description:
			"We need to get a sense of your education, experience and skills. It's quickest to import your information- you can edit it before your profile goes live.",
		options: {
			linkedin: {
				title: "Import from Linkedin",
				description:
					"Quickly pull your professional details from your LinkedIn profile.",
				speedText: "Fastest",
			},
			resume: {
				title: "Upload your Resume",
				description:
					"Upload your resume and we'll extract the relevant information.",
				speedText: "Fast",
			},
			manual: {
				title: "Fill out manually",
				description: "Enter your details manually, step-by-step.",
				speedText: "Slow",
			},
		},
		modals: {
			linkedin: {
				title: "Import from LinkedIn",
				description:
					"Enter your LinkedIn profile URL to import your professional details",
				placeholder: "write URL",
				urlLabel: "URL *",
				import: "Import",
				cancel: "Cancel",
				validationError: "This is a mandatory field.",
				invalidUrl: "Please enter a valid LinkedIn profile URL.",
			},
			resume: {
				title: "Add your resume",
				description:
					"Upload your resume and we'll extract the relevant information",
				fileRequirementsText:
					"Use a PDF, Word doc, or rich text file - make sure it's 5MB or less.",
			},
			photo: {
				title: "Add your photo",
				description:
					"Upload your photo and we'll extract the relevant information",

				profileImageRequirementsText:
					"The professional image must be less than or equal to 1MB & JPEG or PNG Preferred.",
				profileImageErrorText:
					"Use a PNG/JPG file - make sure it's 1MB or less",
			},
			common: {
				upload: "Upload",
				replace: "Replace",
				selectFile: "select file",
				continue: "Continue",
				cancel: "Cancel",
			},
		},
		loader: {
			linkedinSync: "Syncing your LinkedIn profile...",
			resumeParse: "Parsing Resume",
		},
	},
	surveyBlocker: {
		title: "Survey",
		subtitle:
			"Take out a few minutes to fill the survey and continue learning.",
	},
	surveyBlockerSuccess: {
		title: "Survey Completed",
		description:
			"Thank you for completing the Survey. We value your feedback.",
		done: "Done",
	},
	container3: {
		moduleDetailsCard: {
			cancelExtension: "Cancel Extension",
			extendDueDate: "Extend Due Date",
			left: "Left",
			assessments: "Assessments",
			dueDate: "Due Date",
			extendedDueDate: "Extended Due Date",
		},
		moduleTabs: {
			module: "Module",
		},
	},
	container6: {
		prev: "Prev",
		next: "Next",
		finish: "Finish",
		note: {
			restoreWarning: "You will never be able to restore it",
			noteDeleteWarning: "Are you sure you want to delete the note?",
			no: "No",
			yes: "Yes",
			notes: "Notes",
		},
		drBot: {
			ok: "OK",
			didNotCatchThat: "Didn't catch that, Try speaking again.",
		},
		transcript: {
			downloadTranscript: "Download Transcript",
			transcripts: "Transcripts",
			noAppFound: "No application found to open DOCX files.",
			unableToDownload: "Unable to download file, it already exists.",
			Doubt: "Doubt",
			answerLive: "Answered Live",
			answer: "Answer",
			answerByModerator: "Answered by Moderator",
		},
	},
	moduleFeedback: {
		banner: {
			text1: "You're collecting completions like a champ! Great job finishing your module ",
			text2: "I'm right here dabbing for you!",
		},
		questionnaire: {
			submitButton: "Submit",
			feedbackTextField: {
				label: "Provide your feedback",
				placeholder: "Type your feedback here",
			},
		},
	},
	introModal: {
		description:
			"Whenever you hit a bump, academic or otherwise, I'm just a chat away!",
		exploreButton: "Let's Explore",
	},
	onboardingModal: {
		greeting: "Hi",
		onboarding: {
			bubbleText: "Yay!",
			bodyText: "Awesome! Time to dive in and have some fun!",
			descriptionText:
				"Let the journey begin and remember, I'm always just a message away.",
		},
		rejoin: {
			bubbleText: "Am I dreaming?",
			bodyText: "So glad you're back!",
			descriptionText:
				"I've missed having you here. Let's jump back in exactly where you paused and keep moving forward",
		},
		startButton: "Let's Start",
	},
	manualProfileFlow: {
		overdueWarningModal: {
			title: "Don't Miss Out — Finish What's Left!",
			message:
				"Some sections are past their due date and still incomplete. Complete the form to Resume Learning.",
			completeNow: "Complete Now",
		},
	},
} as const;

export default studyPlan;
