import { type RouteProp } from "@react-navigation/native";
import { type StackNavigationProp } from "@react-navigation/stack";

export type ICourseDetailsStackParamList = {
	StudyPlan: undefined;
	ModuleScreen: undefined;
};

export type RootCourseDetailsStackParamsList =
	StackNavigationProp<ICourseDetailsStackParamList>;

export type CourseStackRouteProps<
	RouteName extends keyof ICourseDetailsStackParamList,
> = RouteProp<ICourseDetailsStackParamList, RouteName>;
