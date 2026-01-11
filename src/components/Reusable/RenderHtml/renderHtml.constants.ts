import { Dimensions } from "react-native";

import { horizontalScale } from "@utils/functions";

export const MAX_ALLOWED_WIDTH =
	Dimensions.get("window").width - horizontalScale(40);
