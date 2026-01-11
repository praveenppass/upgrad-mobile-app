import { useNavigation } from "@react-navigation/native";

import { type IRootStackNativeNavigationProp } from "@navigation/navigators/rootNavigator/rootNavigator.interface";

const useAppNavigation = () => useNavigation<IRootStackNativeNavigationProp>();

export default useAppNavigation;
