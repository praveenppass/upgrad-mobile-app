import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Pressable, View } from "react-native";

import styles from "@screens/Tabs/MyProfile/MyAccount/myAccount.styles";
import useWorkExperienceController from "@screens/Tabs/MyProfile/MyAccount/WorkExperience/useWorkExperienceController";

import RNText from "@components/Reusable/RNText";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { colors } from "@assets/colors";
import { AddIconProfile, EditIconProfile } from "@assets/icons";
import { strings } from "@assets/strings";

interface WorkExperienceItem {
	text: string;
	subText: string;
	description?: string;
}

interface WorkExperienceViewScreenProps {
	data: WorkExperienceItem[];
	onEditNavigate: (index: number) => void;
}

const WorkExperienceViewScreen = ({
	data,
	onEditNavigate,
}: WorkExperienceViewScreenProps) => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item, index) => index.toString()}
			contentContainerStyle={styles.contentContainerStyle}
			renderItem={({ item, index }) => (
				<View style={styles.listItemPersonalView}>
					<View style={[styles.itemRowPersonal, styles.longText]}>
						<RNText style={styles.itemPersonalKey}>
							{item.text}
						</RNText>
						<RNText style={styles.itemPersonalValue}>
							{item.subText}
						</RNText>
						{item.description ? (
							<RNText style={styles.itemDescriptionworkEx}>
								{item.description}
							</RNText>
						) : (
							<></>
						)}
					</View>
					<Pressable
						style={styles.screenEditIcon}
						onPress={() => onEditNavigate(index)}
					>
						<EditIconProfile />
					</Pressable>
				</View>
			)}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
		/>
	);
};

export default () => {
	const navigation = useNavigation<RootHomeStackList>();
	const { data, onEditNavigate, isFresher } = useWorkExperienceController();
	const workExperienceIndex = data.length;

	return WithHeaderLxp({
		BodyComponent: () => (
			<WorkExperienceViewScreen
				data={data as WorkExperienceItem[]}
				onEditNavigate={onEditNavigate}
			/>
		),
		showBack: true,
		title: strings.WORK_EXP,
		rightIcon: !isFresher ? AddIconProfile : <></>,
		onRightIconPress: () =>
			navigation.navigate("MyProfileWorkExperience", {
				workExperienceIndex,
			}),
		backgroundColor: colors.neutral.grey_02,
	});
};
