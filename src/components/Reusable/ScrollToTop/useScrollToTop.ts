import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import { verticalScale } from "@utils/functions";

interface IUseScrollToTop {
	offset?: number;
}

const useScrollToTop = ({
	offset = verticalScale(300),
}: IUseScrollToTop = {}) => {
	const [showButton, setShowButton] = useState(false);

	const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset } = event.nativeEvent;

		setShowButton(contentOffset.y > offset);
	};

	return { showButton, onScroll };
};

export default useScrollToTop;
