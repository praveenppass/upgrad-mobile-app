import React, { useEffect } from "react";
import { View } from "react-native";
import TicketView from "./TicketView";
import HelpSupportTopTabNavigation from "@routes/tabs/HelpSupportTopTabNavigation";
import { TicketScreenStyle as styles } from "./TicketScreenStyles";
import { HELP_SUPPORT_ENUM } from "@interface/helpSupport.interface";
import TicketViewModel from "./TicketViewModel";
import { TicketLoadingScreen } from "./TicketLoadingScreen";

function TicketTab() {
	const { getTicketSummary, ticketSummaryData, refetch, allTicketLoading } =
		TicketViewModel({
			tabName: undefined,
		});
	const RenderOpenTab = () => <TicketView tabName={HELP_SUPPORT_ENUM.open} />;
	const RenderCloseTab = () => (
		<TicketView tabName={HELP_SUPPORT_ENUM.closed} />
	);
	const tabsData = [
		{
			component: RenderOpenTab,
			name: HELP_SUPPORT_ENUM.open,
			badge: ticketSummaryData?.ticketSummary?.open,
		},
		{
			component: RenderCloseTab,
			name: HELP_SUPPORT_ENUM.closed,
			badge: ticketSummaryData?.ticketSummary?.closed,
		},
	];

	useEffect(() => {
		getTicketSummary();
		refetch();
	}, []);

	return (
		<View style={styles.main}>
			{allTicketLoading ? (
				<TicketLoadingScreen />
			) : (
				<HelpSupportTopTabNavigation tabs={tabsData} />
			)}
		</View>
	);
}

export default TicketTab;
