import React, { Suspense } from "react";
import { type SvgProps } from "react-native-svg";

function FallBackUi() {
	return null;
}

const withIconSuspense = (
	Icon: React.LazyExoticComponent<React.FC<SvgProps>>,
) => {
	return function (props: SvgProps) {
		return (
			<Suspense fallback={<FallBackUi />}>
				<Icon {...props} />
			</Suspense>
		);
	};
};

export default withIconSuspense;
