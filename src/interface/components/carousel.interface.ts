import { ListRenderItem , ViewStyle , FlatListProps} from "react-native";

export interface ICarousel<T> extends Omit<FlatListProps<T>, "indicatorStyle"> {
	showIndicators?: boolean;
	showSkeleton?: boolean;
	loading?: boolean;
	skeletonItemStyle?: ViewStyle;
	renderSkeletonItem?: ListRenderItem<T> | null;
}