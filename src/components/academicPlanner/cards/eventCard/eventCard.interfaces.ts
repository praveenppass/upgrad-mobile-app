import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

import { IEventAgenda } from "@components/academicPlanner/common/EventAgenda";

import {
	ISessionDetails,
	IUploadedFile,
	IUserProfileConfiguration,
} from "@graphql/query/academicPlanner/interfaces";
import { IMentor, ITimeSlot } from "@graphql/query/academicPlanner/interfaces";

import { LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";
import {
	IEventButtonTypes,
	IEventStatusType,
	IEventType,
} from "@interface/components/academicPlanner/events.interface";

// Common Item Type
export interface IItem {
	Icon: (props: SvgProps) => React.JSX.Element;
	text?: string;
}

export interface IEventInfo {
	Icon: (props: SvgProps) => React.JSX.Element;
	text: string;
	textStyle?: StyleProp<TextStyle>;
}

// Shared base props (common to all event card interfaces)
export interface BaseEventCardProps {
	id: string;
	sessionId: string;
	eventType: IEventType;
	eventStatus: IEventStatusType;
	headerTitle: string;
	eventTitle: string;
	agenda?: IEventAgenda;
	eventInfo?: IEventInfo;
	viewedInfo?: IEventInfo;
	mentors?: IMentor[];
	instructors?: IMentor[];
	joinUrl?: string;
	isBtnDisabled: boolean;
	ctaType: IEventButtonTypes;
	brightCoveId?: string | IUploadedFile[];
	workshopId?: string;
	workshopCode?: string;
	userProgramId?: string;
	sessionGroupId?: string;
	btnDisabledReason?: string;
	profileConfiguration: IUserProfileConfiguration;
	style?: ViewStyle;
	learningPathId: string;
	programCode: string;
	learningPathType: LearningPathType;
	mentorWindow?: {
		id: string;
		bookByDate: string;
		eventId: string;
	};
	startsAt: string;
	endsAt: string;
	rescheduleRequestDetails?: ITimeSlot;
	rescheduleRequestLimit?: number;
	asset?: {
		assetCode?: string;
		level1?: string;
		level2?: string;
		level3?: string;
		level4?: string;
		track?: string;
		elective?: string;
		learningPathName?: string;
		assetType?: IAssetType;
	};
	showButton?: boolean;
	resourcesCount?: number;
}

// Regular event card props
export interface IEventCardProps extends BaseEventCardProps {
	dueDate?: string;
	eventDate?: string;
	duration?: string;
}

// Modal event card props
export interface IEventCardModalProps extends BaseEventCardProps {
	onClose: () => void;
	visible: boolean;
	eventData: IItem[];
	onModalCTAClick: () => void;

	onRescheduleMentorshipEvent: () => void;
	onCancelMentorshipEvent: () => void;

	onAcceptRescheduleMentorshipEvent: () => void;
	onRejectRescheduleMentorshipEvent: () => void;
	onResourceCTAClick: () => void;
}

// Read-only event card props
export interface IEventCardViewProps extends BaseEventCardProps {
	eventData: IItem[];
	onCTAClick: () => void;
	onViewModal: () => void;
}

export interface IHandleAcceptRescheduleMentorshipSession {
	mentorSlotId: string;
	mentorshipId: string;
}

export interface IGetMentorRescheduleRequestText {
	endsAt: string;
	mentor?: IMentor;
	startsAt: string;
	userTimezone: string;
}

export interface IGetEventData {
	eventType: IEventType;
	eventStatus: IEventStatusType;
	dueDate?: string;
	eventDate?: string;
	duration?: string;
	bookByDate?: string;
	userTimezone: string;
}

export interface IHandleResourceItemClick {
	eventType: IEventType;
	sessionId: string;
}
