import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { setSafeAreaInsets } from "@utils/inset.utils";

const useUpdateSafeAreaInsets = () => {
	const insets = useSafeAreaInsets();
	useEffect(() => setSafeAreaInsets(insets), [insets]);
};

export default useUpdateSafeAreaInsets;
