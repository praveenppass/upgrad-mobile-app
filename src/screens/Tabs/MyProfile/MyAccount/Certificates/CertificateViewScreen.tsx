import React, { memo } from "react";
import { FlatList, Image, Pressable, View } from "react-native";

import useCertificateController from "@screens/Tabs/MyProfile/MyAccount/Certificates/useCertificateController";
import styles from "@screens/Tabs/MyProfile/MyAccount/myAccount.styles";

import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { DownloadIconProfile } from "@assets/icons";
import { strings } from "@assets/strings";

const BodyComponent = () => {
	const { data } = useCertificateController();

	return (
		<FlatList
			data={data}
			keyExtractor={(item, index) => index.toString()}
			contentContainerStyle={styles.contentContainerStyle}
			renderItem={({ item }) => {
				const isCertificateDownloading =
					item.certificateDownloadingId === item.downloadUrl;

				return (
					<View style={styles.certificateContainerViewScreen}>
						<View style={styles.certificateBottomSection}>
							<Image
								style={styles.certificateImage}
								source={{
									uri: item.imageUrl,
								}}
							/>
							<View style={styles.certificateBottomRightSection}>
								<RNText numberOfLines={1} style={styles.name}>
									{item.title}
								</RNText>
								<RNText numberOfLines={1} style={styles.email}>
									{item.subTitle}
								</RNText>
								<Pressable
									onPress={() => item.downloadCertificate()}
									style={styles.downloadButton}
								>
									{isCertificateDownloading ? (
										<Loading
											imageStyle={styles.loadingStyle}
										/>
									) : (
										<DownloadIconProfile />
									)}
								</Pressable>
							</View>
						</View>
					</View>
				);
			}}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
		/>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const CertificateViewScreen = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		title={strings.CERTIFICATIONS}
	/>
);

export default memo(CertificateViewScreen);
