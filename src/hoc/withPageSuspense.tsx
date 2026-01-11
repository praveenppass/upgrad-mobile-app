import { C } from "@assets/constants";
import { View, ActivityIndicator } from "react-native";
import React, {
	Suspense,
	type ComponentType,
	type LazyExoticComponent,
} from "react";

type Props = Record<string, unknown>;

const {
	commonStyles: { align },
} = C;

function PageFallBackUi(): JSX.Element {
	return (
		<View style={align.itemsCenter}>
			<ActivityIndicator size="large" color="blue" />
		</View>
	);
}

const withPageSuspense = <P extends Props>(
	Component: LazyExoticComponent<ComponentType>,
) => {
	return function (props: P) {
		return (
			<Suspense fallback={<PageFallBackUi {...props} />}>
				<Component />
			</Suspense>
		);
	};
};

export { withPageSuspense };
