import React, { memo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import Carousel from "@components/Reusable/Carousel";
import NotificationCard, {
	INotificationCard,
	NOTIFICATION_CARD_WIDTH,
} from "@components/studyPlan/container2/NotificationCard";

import { horizontalScale, verticalScale } from "@utils/functions";

interface IContainer2Carousel {
	carouselData: INotificationCard[];
	autoScrollInterval?: number;
}

const Container2Carousel = ({
	carouselData,
	autoScrollInterval = 5000,
}: IContainer2Carousel) => {
	const { width } = useWindowDimensions();

	if (!carouselData.length) return null;

	return (
		<View style={styles.carouselContainer}>
			<Carousel
				data={carouselData}
				renderItem={(item) => <NotificationCard {...item} />}
				autoscroll
				gap={verticalScale(10)}
				indicatorSize={horizontalScale(4)}
				autoscrollInterval={autoScrollInterval}
				cardWidth={width * NOTIFICATION_CARD_WIDTH}
				enableScrollOnIndicatorPress
			/>
		</View>
	);
};

export default memo(Container2Carousel);

const styles = StyleSheet.create({
	carouselContainer: {
		marginBottom: verticalScale(10),
		marginTop: verticalScale(20),
	},
});
