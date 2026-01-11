import React from "react";
import { View } from "react-native";

import HomeAssetBanner from "@components/Home/HomeBanner/HomeAssetBanner";
import HomeBannerSkeleton from "@components/Home/HomeBanner/HomeBannerSkeleton";
import HomeSessionBanner from "@components/Home/HomeBanner/HomeSessionBanner";
import Carousel from "@components/Reusable/Carousel";

import { horizontalScale } from "@utils/functions";
import measures from "@utils/measures";

import {
	IHomeBanner,
	IHomeBannerAsset,
	IHomeBannerItem,
	IHomeBannerSession,
	IHomeBannerType,
} from "@interface/components/home/homeBanner.interface";

const { SCREEN_WIDTH } = measures;

const HomeBannerItem = ({ item }: { item: IHomeBannerItem }) => {
	if (item.type === IHomeBannerType.ASSET) {
		const {
			type,
			assetName,
			assetType,
			courseName,
			progress,
			assetActivity,
			assetCode,
			assetId,
			courseId,
			courseVariant,
			progressStatus,
			universityPartnerName,
			workshopId,
			programCode,
			workshopCode,
			userProgramId,
		} = item as IHomeBannerAsset;

		return (
			<HomeAssetBanner
				type={type}
				courseName={courseName}
				assetName={assetName || ""}
				progress={progress}
				assetType={assetType}
				assetCode={assetCode}
				assetId={assetId}
				assetActivity={assetActivity}
				courseId={courseId}
				courseVariant={courseVariant}
				progressStatus={progressStatus}
				universityPartnerName={universityPartnerName}
				workshopId={workshopId}
				programCode={programCode}
				workshopCode={workshopCode}
				userProgramId={userProgramId}
			/>
		);
	} else {
		const {
			endsAt,
			startsAt,
			title,
			type,
			appZoomUrl,
			zoomUrl,
			workshopSession,
			openZoomLink,
		} = item as IHomeBannerSession;

		return (
			<HomeSessionBanner
				type={type}
				startsAt={startsAt}
				endsAt={endsAt}
				title={title}
				appZoomUrl={appZoomUrl}
				zoomUrl={zoomUrl}
				workshopSession={workshopSession}
				openZoomLink={openZoomLink}
			/>
		);
	}
};

const HomeBanner = ({ loading, bannerItems }: IHomeBanner) => {
	if (bannerItems.length === 0 && !loading) return <></>;

	const cardWidth = SCREEN_WIDTH - horizontalScale(40);

	if (loading) return <HomeBannerSkeleton cardWidth={cardWidth} />;

	return (
		<Carousel
			showIndicators
			data={bannerItems}
			renderItem={(item: IHomeBannerItem) => (
				<View style={{ width: cardWidth }}>
					<HomeBannerItem item={item} />
				</View>
			)}
			cardWidth={cardWidth}
		/>
	);
};
export default HomeBanner;
