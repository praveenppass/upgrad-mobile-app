import { type RouteProp } from "@react-navigation/native";
import { type StackNavigationProp } from "@react-navigation/stack";

export type ICourseStackParamList = {
	Skills: undefined;
	Session: undefined;
	StudyPlan: undefined;
	Bookmarks: undefined;
};

export type RootCourseStackParamsList =
	StackNavigationProp<ICourseStackParamList>;

export type CourseStackRouteProps<
	RouteName extends keyof ICourseStackParamList,
> = RouteProp<ICourseStackParamList, RouteName>;
