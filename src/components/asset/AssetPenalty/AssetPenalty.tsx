import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { IAssetPenaltyItem } from "@hooks/assetPenalty/assetPenalty.interface";

import { strings } from "@assets/strings";

import styles from "./assetPenaltyStyles";

interface IAssetPenalty {
	loading?: boolean;
	style?: StyleProp<ViewStyle>;
	penalties: IAssetPenaltyItem[];
}

interface IAssetPenaltySkeleton {
	style?: StyleProp<ViewStyle>;
}

const AssetPenaltySkeleton = ({ style }: IAssetPenaltySkeleton) => {
	return (
		<View style={[styles.uploadContainer, style]}>
			<Skeleton style={styles.skeleton1} />

			<View style={styles.rowContainer1}>
				<Skeleton style={styles.skeleton2} />
				<Skeleton style={styles.text1} />
			</View>
			<Skeleton style={styles.text2} />
			<View style={styles.rowContainer2}>
				<Skeleton style={styles.skeleton2} />
				<Skeleton style={styles.text3} />
			</View>

			<View style={styles.rowContainer3}>
				<Skeleton style={styles.skeleton4} />
				<Skeleton style={styles.text4} />
			</View>
			<View style={styles.rowContainer3}>
				<Skeleton style={styles.skeleton5} />
			</View>
			<View style={styles.rowContainer3}>
				<Skeleton style={styles.skeleton6} />
				<Skeleton style={styles.text5} />
			</View>
			<View style={styles.rowContainer3}>
				<Skeleton style={styles.skeleton7} />
				<Skeleton style={styles.text6} />
			</View>
		</View>
	);
};

const AssetPenalty: React.FC<IAssetPenalty> = ({
	style,
	penalties,
	loading,
}) => (
	<>
		{loading ? (
			<AssetPenaltySkeleton style={style} />
		) : penalties?.length ? (
			<View style={[styles.main, style]}>
				<RNText
					style={styles.heading}
					title={strings.DEDUCTION_PENALTY}
				/>
				{penalties?.map((item, index) => (
					<View key={index} style={styles.dateView}>
						<RNText
							style={styles.penaltyDate}
							title={item?.penalty}
						/>
						<RNText
							style={styles.percentageView}
							title={`${item?.percentage}%`}
						/>
					</View>
				))}
			</View>
		) : (
			<></>
		)}
	</>
);

export default AssetPenalty;
