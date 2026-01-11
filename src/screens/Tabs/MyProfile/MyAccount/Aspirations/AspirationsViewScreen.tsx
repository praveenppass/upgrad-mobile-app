import React, { memo } from "react";
import { FlatList, Pressable, View } from "react-native";

import useAspirationsController from "@screens/Tabs/MyProfile/MyAccount/Aspirations/useAspirationsController";
import styles from "@screens/Tabs/MyProfile/MyAccount/myAccount.styles";

import RNText from "@components/Reusable/RNText";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { LearningPathType } from "@interface/app.interface";

import { EditIconProfile } from "@assets/icons";
import { strings } from "@assets/strings";

interface IAspirationsViewScreenItemData {
	text: string;
	subText: string;
	mainId: string;
	learningPathId: string;
	learningPathType: LearningPathType;
	learningPathCode: string;
	workshopId: string;
}

interface IEditVariables {
	learningPathId: string;
	learningPathType: LearningPathType;
	learningPathCode: string;
	workshopId: string;
}

interface IAspirationsViewScreen {
	data: IAspirationsViewScreenItemData[] | [];
	onEditNavigate: (data: IEditVariables) => void;
}

const AspirationsViewScreen = ({
	data,
	onEditNavigate,
}: IAspirationsViewScreen) => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item, index) => index.toString()}
			contentContainerStyle={styles.contentContainerStyle}
			renderItem={({ item }) => (
				<View style={styles.listItemPersonalView}>
					<View style={[styles.itemRowPersonal, styles.longText]}>
						<RNText style={styles.itemPersonalKey}>
							{item.text}
						</RNText>
						<RNText style={styles.itemPersonalValue}>
							{item.subText}
						</RNText>
					</View>
					<Pressable
						style={styles.screenEditIcon}
						onPress={() =>
							onEditNavigate({
								learningPathId: item.mainId,
								learningPathType: item.learningPathType,
								learningPathCode: item.learningPathCode,
								workshopId: item.workshopId,
							})
						}
					>
						<EditIconProfile />
					</Pressable>
				</View>
			)}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
		/>
	);
};

const BodyComponent = () => {
	const { data, onEditNavigate } = useAspirationsController();
	return (
		<AspirationsViewScreen
			data={data ?? []}
			onEditNavigate={onEditNavigate}
		/>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const AspirationsView = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		title={strings.ASPIRATIONS_MY_ACCOUNT}
	/>
);

export default memo(AspirationsView);
