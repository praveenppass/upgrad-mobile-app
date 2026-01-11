import {
	useFocusEffect,
	useNavigation, // useNavigation
} from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import useAspirationsModel from "@screens/Tabs/MyProfile/MyAccount/Aspirations/useAspirationsModel";

import { RootState } from "@redux/store/root.reducer";

import { LearningPathType } from "@interface/app.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

const useAspirationsController = () => {
	const { aspirationsData, getAspirationsData, refetchMyAspirationsData } =
		useAspirationsModel();
	const navigation = useNavigation<RootHomeStackList>();

	const userId = useSelector((state: RootState) => state.user.user.id);

	useEffect(() => {
		getAspirationsDetails();
	}, []);

	const getAspirationsDetails = async () => {
		const variables = {
			where: {
				user: userId,
				isWorkshopProfileQuestion: true,
				isRequiredAdditionalProfile: true,
			},
		};
		getAspirationsData({
			variables,
		});
	};

	useFocusEffect(
		useCallback(() => {
			refetchMyAspirationsData({
				where: {
					user: userId,
					isWorkshopProfileQuestion: true,
					isRequiredAdditionalProfile: true,
				},
			});
		}, []),
	);

	const aspirations = aspirationsData?.learnerCourses?.result;

	interface IOnEditNavigate {
		learningPathId: string;
		learningPathType: LearningPathType;
		learningPathCode: string;
		workshopId: string;
	}
	const onEditNavigate = ({
		learningPathId,
		learningPathType,
		learningPathCode,
		workshopId,
	}: IOnEditNavigate) => {
		navigation.navigate("MyProfileAspirations", {
			learningPathId,
			learningPathType,
			learningPathCode,
			workshopId,
		});
	};

	const data = aspirations?.map(
		({ program, course, deliveryType, workshop, courseInfo, id }) => {
			let programName = "";
			let levelName = "";
			let learningPathTypeProgram = "";
			let learningPathIdProgram = "";
			let learningPathCodeProgram = "";
			let workshopID = "";

			if (program) {
				programName = program.name || "";
				learningPathTypeProgram = LearningPathType.PROGRAM;
				learningPathIdProgram = program.id || "";
				learningPathCodeProgram = program.code || "";
				levelName = program.level?.[0]?.name || "";
				workshopID = workshop?.id || "";
			} else {
				learningPathTypeProgram = LearningPathType.COURSE;
				programName = course?.name || "";
				levelName = course?.courseLevels?.[0]?.name || "";
				learningPathIdProgram = course?.id || "";
				learningPathCodeProgram = course?.code || "";
			}

			const deliveryName = deliveryType?.name;
			const subText =
				deliveryName && levelName
					? `${deliveryName} | ${levelName}`
					: deliveryName || levelName || "";

			return {
				text: courseInfo?.name.trim() ? courseInfo?.name : programName,
				subText,
				workshopId: workshopID,
				learningPathType: learningPathTypeProgram as LearningPathType,
				learningPathCode: learningPathCodeProgram,
				learningPathId: learningPathIdProgram,
				mainId: id,
			};
		},
	);

	return {
		data,
		onEditNavigate,
	};
};

export default useAspirationsController;
