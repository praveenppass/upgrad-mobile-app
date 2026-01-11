import React, { memo } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import RenderHTML from "react-native-render-html";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { moderateScale, removeHtmlTags, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";
import { themes } from "@assets/themes";

const { neutral } = colors;
const { reg, sm, md } = commonStyles.text;

interface IContentModelProps {
	isVisible: boolean;
	contentData: {
		heading?: string | null;
		pageData?: [{ heading?: string | null; content?: string | null }];
	};
	onClose?: (type?: string | null) => void;
}
interface IPageDataItem {
	heading?: string | null;
	content?: string | null;
}

const ContentModel = ({
	isVisible = true,
	onClose,
	contentData,
}: IContentModelProps) => {
	const { heading, pageData } = contentData || {};
	return (
		<ActionModal
			closeModal={onClose}
			isOpen={isVisible}
			onBackPress={onClose}
			disableCloseOnSwipeDown
		>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={true}
			>
				<Pressable>
					{heading && (
						<RNText style={styles.heading}>
							{removeHtmlTags(heading)}
						</RNText>
					)}
					{pageData?.map((item: IPageDataItem) => (
						<>
							{item?.heading && (
								<RNText style={styles.subHeading}>
									{removeHtmlTags(item?.heading)}
								</RNText>
							)}
							{item?.content && (
								<RenderHTML
									source={{ html: item?.content }}
									tagsStyles={{
										p: styles.p,
									}}
								/>
							)}
						</>
					))}
				</Pressable>
			</ScrollView>
		</ActionModal>
	);
};

export default memo(ContentModel);

const styles = StyleSheet.create({
	heading: {
		color: themes.text.dark,
		...reg,
		fontWeight: "600",
		lineHeight: moderateScale(26),
		textAlign: "left",
	},
	p: {
		color: neutral.black,
		...md,
		lineHeight: moderateScale(22),
	},
	scrollContainer: {
		height: moderateScale(500),
		paddingTop: verticalScale(12),
	},
	scrollView: {
		height: "auto",
		maxHeight: verticalScale(500),
		paddingTop: verticalScale(12),
	},
	subHeading: {
		color: themes.text.dark,
		...sm,
		fontWeight: "600",
		lineHeight: moderateScale(26),
	},
});
