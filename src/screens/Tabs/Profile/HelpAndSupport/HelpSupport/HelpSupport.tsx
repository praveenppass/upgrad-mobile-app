import { useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";

import HelpAnsSupportModel from "@screens/Tabs/Profile/HelpAndSupport/HelpSupport/HelpAnsSupportModel";

import CustomButton from "@components/Reusable/Buttons/CustomButton";
import EmptyCard from "@components/Reusable/EmptyCard";
import RNText from "@components/Reusable/RNText";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { ILearnerCourse } from "@graphql/query/getCourseProgramList";

import { useHelpSupportEvents } from "@hooks/useHelpSupportEvents";

import { moderateScale } from "@utils/functions";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { C } from "@assets/constants";
import { NoTicket, PlusIcon } from "@assets/icons";
import { strings } from "@assets/strings";

import TicketTab from "../TicketScreen/TicketTab";
import TicketViewModel from "../TicketScreen/TicketViewModel";
import { HelpSupportStyle as styles } from "./HelpSupportstyles";

const {
	themes: { primary },
	commonStyles: {
		text: { reg, w600, clrDarkBlack },
		spacing: { mv100 },
	},
} = C;

const EXPLORE_ICON_SIZE = {
	width: moderateScale(140),
	height: moderateScale(103),
};

const BodyComponent = () => {
	const { getCourseList } = HelpAnsSupportModel();

	const { navigate } = useNavigation<RootHomeStackList>();
	const { onRaiseATicketClicked } = useHelpSupportEvents();
	const { ticketSummaryData, getTicketSummary, refetch } = TicketViewModel({
		tabName: undefined,
	});
	const [allLearnerCourses, setAllLearnerCourses] = useState<
		ILearnerCourse[]
	>([]);

	useEffect(() => {
		const fetchInitialData = async () => {
			await getTicketSummary();
			refetch();

			const data = await getCourseList();
			setAllLearnerCourses(data?.data?.allLearnerCourses ?? []);
		};

		fetchInitialData();
	}, []);

	const onRaiseNewTicket = () => {
		onRaiseATicketClicked();
		navigate("RaiseATicketView");
	};

	const shouldHideRaiseRequest =
		allLearnerCourses.length === 1
			? allLearnerCourses[0]?.workshop?.disableRaiseRequest === true
			: !allLearnerCourses.some(
					(item) =>
						item?.workshop?.disableRaiseRequest == null ||
						item?.workshop?.disableRaiseRequest === false,
				);

	return (
		<>
			{ticketSummaryData?.ticketSummary?.open === 0 &&
			ticketSummaryData?.ticketSummary?.closed === 0 ? (
				<>
					<SafeAreaView style={styles.main}>
						{!shouldHideRaiseRequest ? (
							<>
								<EmptyCard
									desc={strings.GO_AHEAD_TXT}
									descStyle={styles.desc}
									title={strings.NEED_ASSISTANCE}
									titleStyle={[reg, clrDarkBlack, w600]}
									icon={<NoTicket {...EXPLORE_ICON_SIZE} />}
									containerStyle={mv100}
								/>
								<RNText
									title={strings.RAISE_DESC}
									style={styles.raiseDesc}
								/>
							</>
						) : (
							<View style={styles.noQueriesView}>
								<NoTicket {...EXPLORE_ICON_SIZE} />
								<RNText
									title={strings.NO_QUERIES_FOUND}
									style={styles.noQueriesStyles}
								/>
								<RNText
									title={strings.NO_QUERIES_FOUND_DESC}
									style={styles.noQueriesDescriptionStyles}
								/>
							</View>
						)}

						{!shouldHideRaiseRequest ? (
							<CustomButton
								title={strings.RAISE_TICKET}
								btnStyle={[styles.bottomBtn]}
								onBtnHandler={onRaiseNewTicket}
								rightIcon={
									<PlusIcon
										width={14}
										height={14}
										color={primary.color2}
									/>
								}
							/>
						) : (
							<></>
						)}
					</SafeAreaView>
				</>
			) : (
				<TicketTab />
			)}
		</>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const HelpSupport = () => {
	const { onHelpSupportScreenView } = useHelpSupportEvents();

	useEffect(() => {
		onHelpSupportScreenView();
	}, []);

	return (
		<WithHeaderLxp
			BodyComponent={MemoizedBodyComponent}
			showBack
			title={strings.HELP_SUPPORT}
			showBottomShadow={false}
		/>
	);
};

export default memo(HelpSupport);
