import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ManualProfileFlow from "@screens/Home/MyProfile/ManualProfileFlow";
import FieldsModal from "@screens/Home/MyProfile/ManualProfileFlow/components/FieldsModal";
import ProfileMethods from "@screens/Home/MyProfile/ProfileMethods";
import ViewResourcesScreen from "@screens/Home/Resources/ViewResourcesScreen";
// Search & Exploration Screens
import SearchCoursesScreen from "@screens/Home/SearchCourses/SearchCoursesScreen";
import Container1Screen from "@screens/Home/StudyPlan/Container1";
import Container2Screen from "@screens/Home/StudyPlan/Container2";
import Container3Screen from "@screens/Home/StudyPlan/Container3";
import Container6Screen from "@screens/Home/StudyPlan/Container6";
// Lecture Details Screen
import LectureDetailsScreen from "@screens/LectureDetails/LectureDetailsScreen";
// Media & Web View Screens
// Quiz & Assessment Screens
import AssessmentQuizScreen from "@screens/Tabs/Courses/AssessmentQuiz/QuizScreen";
// Asset & Content Screens
// import CourseDetailsScreen from "@screens/Tabs/Courses/CourseDetails/CourseDetailsScreen";
import RecallQuizScreen from "@screens/Tabs/Courses/Recallquiz/QuizScreen";
// Profile Management Screens
import Aspirations from "@screens/Tabs/MyProfile/Aspirations";
import ContactDetails from "@screens/Tabs/MyProfile/ContactDetails";
import EducationDetails from "@screens/Tabs/MyProfile/EducationDetails";
// Profile View Screens
import AspirationsViewScreen from "@screens/Tabs/MyProfile/MyAccount/Aspirations/AspirationsViewScreen";
import CertificateViewScreen from "@screens/Tabs/MyProfile/MyAccount/Certificates/CertificateViewScreen";
import EducationViewScreen from "@screens/Tabs/MyProfile/MyAccount/Education/EducationViewScreen";
import MyAccount from "@screens/Tabs/MyProfile/MyAccount/MyAccount";
import WorkExperienceViewScreen from "@screens/Tabs/MyProfile/MyAccount/WorkExperience/WorkExperienceViewScreen";
import MyProfileScreen from "@screens/Tabs/MyProfile/MyProfileScreen";
import MyTimezone from "@screens/Tabs/MyProfile/MyTimezone";
import PersonalDetails from "@screens/Tabs/MyProfile/PersonalDetails";
import WorkExperience from "@screens/Tabs/MyProfile/WorkExperience";
// Support & Help Screens
import HelpSupport from "@screens/Tabs/Profile/HelpAndSupport/HelpSupport/HelpSupport";
import RaiseATicketView from "@screens/Tabs/Profile/HelpAndSupport/RaiseATicketScreen/RaiseATicketView";
import TicketDetailsView from "@screens/Tabs/Profile/HelpAndSupport/TicketDetailsScreen/TicketDetailsView";
import TicketTab from "@screens/Tabs/Profile/HelpAndSupport/TicketScreen/TicketTab";
import PlayVideoLandscape from "@screens/Video/VideoScreenPlayer";
import ProfileWebViewScreen from "@screens/Web/ProfileWebViewScreen";

// Navigation Types & Routes
import { type IHomeStackNativeParamList } from "@navigation/navigators/homeNavigator/homeNavigator.interface";
// Main Tab Navigator
import HomeTabNavigator from "@navigation/navigators/homeTabNavigator";
import { HOME_ROUTES } from "@navigation/routes";

const HomeStack = createNativeStackNavigator<IHomeStackNativeParamList>();

const HOME_STACK_SCREEN_OPTIONS = {
	headerShown: false,
	gestureEnabled: true,
	animation: "slide_from_right" as const,
};

const HomeNavigator = () => (
	<HomeStack.Navigator
		initialRouteName={HOME_ROUTES.MainTabs}
		screenOptions={HOME_STACK_SCREEN_OPTIONS}
	>
		{/* Main Tab Navigation */}
		<HomeStack.Screen
			name={HOME_ROUTES.MainTabs}
			component={HomeTabNavigator}
		/>

		{/* Asset & Content Screens */}
		{/* <HomeStack.Screen
			name={HOME_ROUTES.CourseDetailsScreen}
			component={CourseDetailsScreen}
		/> */}
		<HomeStack.Screen
			name={HOME_ROUTES.PlayVideoLandscape}
			component={PlayVideoLandscape}
		/>

		<HomeStack.Screen
			name={HOME_ROUTES.ViewResourcesScreen}
			component={ViewResourcesScreen}
		/>

		{/* Quiz & Assessment Screens */}
		<HomeStack.Screen
			name={HOME_ROUTES.AssessmentQuizScreen}
			component={AssessmentQuizScreen}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.RecallQuizScreen}
			component={RecallQuizScreen}
		/>

		{/* Profile Management Screens */}
		<HomeStack.Screen
			name={HOME_ROUTES.MyProfileWorkExperience}
			component={WorkExperience}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.MyProfilePersonalDetails}
			component={PersonalDetails}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.ProfileMethods}
			component={ProfileMethods}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.ManualProfileFlow}
			component={ManualProfileFlow}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.ManualProfileFieldsModal}
			component={FieldsModal}
			options={{
				presentation: "modal",
				animation: "slide_from_bottom",
			}}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.MyProfileEducationDetails}
			component={EducationDetails}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.MyProfileContactDetails}
			component={ContactDetails}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.MyProfileTimezone}
			component={MyTimezone}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.MyProfileAspirations}
			component={Aspirations}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.MyProfileScreen}
			component={MyProfileScreen}
		/>
		<HomeStack.Screen name={HOME_ROUTES.MyAccount} component={MyAccount} />

		{/* Profile View Screens */}
		<HomeStack.Screen
			name={HOME_ROUTES.CertificateViewScreen}
			component={CertificateViewScreen}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.WorkExperienceViewScreen}
			component={WorkExperienceViewScreen}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.EducationViewScreen}
			component={EducationViewScreen}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.AspirationsViewScreen}
			component={AspirationsViewScreen}
		/>

		{/* Support & Help Screens */}
		<HomeStack.Screen
			name={HOME_ROUTES.HelpSupport}
			component={HelpSupport}
		/>
		<HomeStack.Screen name={HOME_ROUTES.TicketTab} component={TicketTab} />
		<HomeStack.Screen
			name={HOME_ROUTES.TicketDetails}
			component={TicketDetailsView}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.RaiseATicketView}
			component={RaiseATicketView}
		/>

		{/* Search & Exploration Screens */}
		<HomeStack.Screen
			name={HOME_ROUTES.SearchCourses}
			component={SearchCoursesScreen}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.Container1Screen}
			component={Container1Screen}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.Container2Screen}
			component={Container2Screen}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.Container3Screen}
			component={Container3Screen}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.Container6Screen}
			component={Container6Screen}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.LectureDetailsScreen}
			component={LectureDetailsScreen}
		/>
		<HomeStack.Screen
			name={HOME_ROUTES.ProfileWebView}
			component={ProfileWebViewScreen}
		/>
	</HomeStack.Navigator>
);

export default HomeNavigator;
