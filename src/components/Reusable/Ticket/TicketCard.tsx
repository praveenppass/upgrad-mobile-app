import { useNavigation } from "@react-navigation/core";
import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";

import { TicketScreenStyle as styles } from "@screens/Tabs/Profile/HelpAndSupport/TicketScreen/TicketScreenStyles";

import { useHelpSupportEvents } from "@hooks/useHelpSupportEvents";

import { calendarDate, formatTime } from "@utils/functions";

import {
	HELP_AND_SUPPORT_DETAILS,
	HELP_SUPPORT_ENUM,
	ITicket,
} from "@interface/helpSupport.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { C } from "@assets/constants";
import {
	CalendarIcon,
	ClosedTicketIcon,
	OpenTicketIcon,
	RecentIconOutlineDynamic,
} from "@assets/icons";
import { strings } from "@assets/strings";

import IconContainer from "../IconContainer";
import RNText from "../RNText";

interface ITicketCardProps extends ITicket {
	tabName: string;
}

const {
	themes: { text, bg },
	commonStyles: {
		spacing: { mv10 },
		align: { rowBtw, rowCntr },
	},
} = C;

const ARROW_DIMENSION = {
	width: 14,
	height: 14,
};

const TicketCard = ({
	tabName,
	id,
	subject,
	category,
	createdAt,
	userCourse,
	userProgram,
}: ITicketCardProps) => {
	const { TicketCardClicked } = useHelpSupportEvents();
	const course = userCourse?.course ?? userProgram?.program;
	const navigation = useNavigation<RootHomeStackList>();
	const currentTab =
		tabName == HELP_SUPPORT_ENUM.open
			? HELP_AND_SUPPORT_DETAILS?.open_ticket
			: HELP_AND_SUPPORT_DETAILS?.closed_ticket;
	const onCardHandler = () => {
		TicketCardClicked(currentTab, id, course?.name as string, category);
		navigation.navigate("TicketDetails", { id });
	};
	return (
		<TouchableOpacity onPress={onCardHandler} style={styles.mainContainer}>
			<View style={rowBtw}>
				<View style={rowCntr}>
					{tabName == HELP_SUPPORT_ENUM.open ? (
						<OpenTicketIcon />
					) : (
						<ClosedTicketIcon />
					)}
					<RNText
						title={`${strings.TICKET_TXT}${id}`}
						style={styles.ticketStyle}
					/>
				</View>
				{/* {tabName == HELP_SUPPORT_ENUM.open ? (
					<View style={styles.tabNameStyle}>
						<View style={styles.conversationViewStyle}>
							<RNText
								title={conversationCount}
								style={styles.conversationTextStyle}
							/>
						</View>
					</View>//TODO for conversationCount
				) : null} */}
			</View>

			<View style={mv10}>
				<RNText
					title={subject ?? ""}
					numberOfLines={2}
					style={styles.titleStyle}
				/>
				<RNText
					title={category ?? ""}
					numberOfLines={2}
					style={styles.subTitleStyle}
				/>
			</View>
			<View style={styles.iconCard}>
				<IconContainer
					title={calendarDate(`${createdAt}`) ?? ""}
					textStyle={styles.iconTextStyle}
					color={bg.chip}
					icon={
						<CalendarIcon
							color={text.steelBlue}
							{...ARROW_DIMENSION}
						/>
					}
					iconContainerStyle={styles.iconContainerStyle}
				/>
				<IconContainer
					textStyle={styles.iconTextStyle}
					color={bg.chip}
					title={formatTime(`${createdAt}`) ?? ""}
					icon={
						<RecentIconOutlineDynamic
							color={text.steelBlue}
							{...ARROW_DIMENSION}
						/>
					}
					iconContainerStyle={styles.iconContainerStyle}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default memo(TicketCard);
