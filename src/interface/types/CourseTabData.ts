import { type MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
// import { type MaterialBottomTabNavigationOptions } from "@react-navigation/material-bottom-tabs";
import { MaterialBottomTabNavigationOptions } from 'react-native-paper/react-navigation';

import type React from "react";

export interface CourseTabData {
	tabs: ICourseTabData[];
}

export interface CourseBottomTabData {
	courseTabs: ICourseBottomTabData[];
}

interface ICourseTabData {
	component: React.FunctionComponent;
	name: string;
	options?: MaterialTopTabNavigationOptions;
	params?: {
		data?: unknown;
	};
}

interface ICourseBottomTabData {
	name?: string;
	component?: React.FunctionComponent;
	options?: MaterialBottomTabNavigationOptions;
	params?: {
		data?: unknown;
	};
	icon?: JSX.Element;
	iconFocused?: JSX.Element;
	iconUnfocused?: JSX.Element;
}