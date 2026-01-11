import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { FlatList, Pressable, View } from "react-native";

import useEducationController from "@screens/Tabs/MyProfile/MyAccount/Education/useEducationController";
import styles from "@screens/Tabs/MyProfile/MyAccount/myAccount.styles";

import RNText from "@components/Reusable/RNText";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { AddIconProfile, EditIconProfile } from "@assets/icons";
import { strings } from "@assets/strings";

interface IEducationViewScreenItemData {
	text: string;
	subText: string;
	description: string;
}

interface IEducationViewScreen {
	data: IEducationViewScreenItemData[] | [];
	onEditNavigate: (index: number) => void;
}

const BodyComponent = ({ data, onEditNavigate }: IEducationViewScreen) => {
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
							<RNText style={styles.itemDescription}>
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

const MemoizedBodyComponent = memo(BodyComponent);

const EducationViewScreen = () => {
	const navigation = useNavigation<RootHomeStackList>();
	const { data, onEditNavigate } = useEducationController();
	const educationDetailsIndex = data.length;

	return (
		<WithHeaderLxp
			BodyComponent={() => (
				<MemoizedBodyComponent
					data={data as IEducationViewScreenItemData[]}
					onEditNavigate={onEditNavigate}
				/>
			)}
			showBack
			title={strings.EDUCATION}
			rightIcon={AddIconProfile}
			onRightIconPress={() =>
				navigation.navigate("MyProfileEducationDetails", {
					educationDetailsIndex,
				})
			}
		/>
	);
};

export default memo(EducationViewScreen);
