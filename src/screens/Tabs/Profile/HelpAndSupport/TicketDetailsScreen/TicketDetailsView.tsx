import { useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React, { memo, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";

import RNText from "@components/Reusable/RNText";
import StatusCard from "@components/Reusable/StatusCard";
import SupportTicketCard from "@components/Support/SupportTicketCard";
import SupportTicketDate from "@components/Support/SupportTicketDate";
import TicketClosedFooter from "@components/Support/TicketClosedFooter";
import TicketDetailsLoader from "@components/Support/TicketDetailsLoader";
import TicketOpenFooter from "@components/Support/TicketOpenFooter";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { useHelpSupportEvents } from "@hooks/useHelpSupportEvents";

import { IComponentName } from "@interface/events.interface";
import {
	HELP_SUPPORT_ENUM,
	ITicketConversation,
} from "@interface/helpSupport.interface";
import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { ArrowDownSmIcon } from "@assets/icons";

import { TicketDetailsController } from "./TicketDetailsController";
import { ticketDetailStyles as styles } from "./TicketDetailsStyles";
import { TicketDetailsViewModal } from "./TicketDetailsViewModal";

const {
	strings,
	themes: { bg },
	commonStyles: {
		spacing: { pb14, p6, pl10, pr10 },
		align: { itemsCenter },
		text: { sm, bold, clrSkyBlue },
	},
} = C;

interface IEventTypeProps {
	type?: string;
	isNotBold?: boolean;
}

const EventType = ({ type, isNotBold }: IEventTypeProps) => {
	return (
		<View style={[p6, pl10, pr10, itemsCenter, styles.typeCard]}>
			<RNText title={type} style={[sm, !isNotBold && bold, clrSkyBlue]} />
		</View>
	);
};
const BodyComponent = () => {
	const { params } = useRoute<RootHomeStackRouteProps<"TicketDetails">>();

	const {
		onSend,
		isLoading,
		ticketData,
		ticketDetails,
		createConLoader,
		ticketDetailsLoading,
		ticketConversationsLoading,
	} = TicketDetailsViewModal();

	const {
		isOpen,
		inputValue,
		onChooseIcon,
		onRemoveItem,
		onInputChange,
		onMediaHandler,
		onReopenTicket,
		reopenTicket,
		onResetFun,
		onSubmit,
		selectedAttachments,
		scrollViewRef,
		setReopenTicket,
	} = TicketDetailsController();
	const {
		onTicketDetailsScreenView,
		ReopenTicketClicked,
		AddAttachmentTicketDetailsClicked,
		RemoveAttachmentTicketDetailsClicked,
	} = useHelpSupportEvents();
	const ticket = ticketDetails?.ticket;
	const course =
		ticket?.userCourse?.course ??
		ticket?.userProgram?.courseInfo ??
		ticket?.userProgram?.program;
	const isProgram = !!ticket?.userProgram?.program;

	const showLoader =
		isLoading || ticketDetailsLoading || ticketConversationsLoading;

	const renderItem = ({ item }: { item: ITicketConversation | string }) => {
		return (
			<>
				{typeof item === "string" ? (
					<SupportTicketDate date={item} />
				) : (
					<SupportTicketCard {...item} />
				)}
			</>
		);
	};

	useEffect(() => {
		onTicketDetailsScreenView(params?.id);
	}, []);

	useEffect(() => {
		if (
			ticket?.status?.toLowerCase() ===
			HELP_SUPPORT_ENUM.closed?.toLowerCase()
		) {
			setReopenTicket(true);
		}
	}, [ticket?.status]);

	const onSubmitSend = () => {
		onSend(inputValue, selectedAttachments, onResetFun);
		AddAttachmentTicketDetailsClicked(
			params?.id,
			course?.name,
			ticket?.category,
			IComponentName.SEND_MESSAGE,
		);
	};

	const onReopen = () => {
		onReopenTicket();
		ReopenTicketClicked(params?.id, course?.name, ticket?.category);
	};

	const addAttachment = () => {
		onMediaHandler();
		AddAttachmentTicketDetailsClicked(
			params?.id,
			course?.name,
			ticket?.category,
			IComponentName.ADD_ATTACHMENT,
		);
	};

	const removeAttachment = (id: number) => {
		onRemoveItem(id);
		RemoveAttachmentTicketDetailsClicked(
			params?.id,
			course?.name,
			ticket?.category,
		);
	};

	return (
		<View style={styles.ticketDetailsCard}>
			<View style={styles.parentView}>
				<View style={styles.topCard}>
					<RNText style={styles.topCardTxt} title={ticket?.subject} />
					<TouchableOpacity
						onPress={onChooseIcon}
						style={styles.arrowIcon}
					>
						<ArrowDownSmIcon
							color={bg.dark}
							style={isOpen ? styles.arrowDown : null}
						/>
					</TouchableOpacity>
				</View>
			</View>
			{isOpen && (
				<View style={styles.dropDownCard}>
					{course?.name && (
						<EventType
							isNotBold
							type={`${
								isProgram ? strings.PROGRAM : strings.COURSE
							}: ${course?.name}`}
						/>
					)}
					<EventType
						isNotBold
						type={`${strings.CATEGORY}: ${ticket?.category}`}
					/>
					<StatusCard status={ticket?.status?.toLowerCase()} />
				</View>
			)}

			{showLoader ? (
				<TicketDetailsLoader />
			) : (
				<>
					<FlashList
						ref={scrollViewRef}
						estimatedItemSize={80}
						contentInsetAdjustmentBehavior="always"
						automaticallyAdjustContentInsets={false}
						data={ticketData}
						renderItem={renderItem}
						overScrollMode="always"
						contentContainerStyle={pb14}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item) =>
							`${
								typeof item === "string"
									? item
									: `${item?.description}-${item?.createdAt}`
							}`
						}
					/>

					{reopenTicket ? (
						<TicketClosedFooter onFooterHandler={onReopen} />
					) : (
						<TicketOpenFooter
							onSend={onSubmitSend}
							inputValue={inputValue}
							onRemoveItem={removeAttachment}
							onInputChange={onInputChange}
							onMediaHandler={addAttachment}
							onSubmit={onSubmit}
							loader={showLoader ?? createConLoader}
							selectedAttachment={selectedAttachments}
						/>
					)}
				</>
			)}
		</View>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const TicketDetailsView = () => {
	const { params } = useRoute<RootHomeStackRouteProps<"TicketDetails">>();

	return (
		<WithHeaderLxp
			BodyComponent={MemoizedBodyComponent}
			showBack
			title={`${strings.TICKET_TXT}${params?.id}`}
			backgroundColor={colors.neutral.grey_02}
			showBottomShadow={false}
		/>
	);
};

export default TicketDetailsView;
