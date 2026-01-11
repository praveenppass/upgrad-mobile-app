import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";

import useWorkExperienceModel from "@screens/Tabs/MyProfile/MyAccount/WorkExperience/useWorkExperienceModel";

import {
	ICPSEmploymentStatus,
	ICPSWorkExperienceDetailsItem,
} from "@services/cpsService";

import {
	IProfessionalInformation,
	IProfileType,
} from "@interface/myAccount.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

const useWorkExperienceController = () => {
	const { getWorkExperienceData, myWorkExperienceData } =
		useWorkExperienceModel();

	const navigation = useNavigation<RootHomeStackList>();
	useEffect(() => {
		getWorkExperienceData();
	}, []);

	useFocusEffect(
		useCallback(() => {
			getWorkExperienceData();
		}, []),
	);

	const workExperienceArray = myWorkExperienceData?.workExperiences || [];
	const isFresher =
		myWorkExperienceData?.currentlyWorking === ICPSEmploymentStatus.FRESHER;

	const detailsConfigMapper = ({
		details,
	}: {
		details?: IProfessionalInformation[];
	}): IProfileType[] => {
		if (!details) return [];
		return details?.filter((d) => !!d.subText && !!d.text);
	};

	const onEditNavigate = (index: number) =>
		navigation.navigate("MyProfileWorkExperience", {
			workExperienceIndex: index,
		});

	const mapWorkExperienceDetails = (
		workExperiencesData?: ICPSWorkExperienceDetailsItem[] | null,
		isUserFresher?: boolean,
	): IProfessionalInformation[] => {
		return (
			workExperiencesData?.map(
				({
					currentWorkExperience,
					industry,
					designation,
					startYear,
					endYear,
					org,
				}) => {
					let text = "";
					let subText = "";
					let description = "";

					if (currentWorkExperience) {
						text = `${designation || ""}, ${industry || ""}`;
						subText = org || "";
						description = `${startYear} - ${
							endYear ? endYear : strings.PRESENT
						}`;
					} else if (isUserFresher) {
						text = strings.NOT_EMPLOYED;
						subText = strings.NOT_ASSIGNED;
						description = "";
					} else {
						text = `${designation || ""}, ${industry || ""}`;
						subText = org || "";
						description = `${startYear} - ${
							endYear ? endYear : strings.PRESENT
						}`;
					}

					return { text, subText, description };
				},
			) || []
		);
	};

	const data = detailsConfigMapper({
		details: mapWorkExperienceDetails(workExperienceArray, isFresher),
	});

	return {
		data,
		onEditNavigate,
		isFresher,
	};
};

export default useWorkExperienceController;
