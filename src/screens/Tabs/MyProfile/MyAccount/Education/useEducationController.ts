import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import useEducationModel from "@screens/Tabs/MyProfile/MyAccount/Education/useEducationModel";

import { ICPSEducationDetails } from "@services/cpsService";

import { RootState } from "@redux/store/root.reducer";

import {
	IPersonalInformation,
	IProfessionalInformation,
	IProfileComponentType,
	IProfileType,
} from "@interface/myAccount.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

const useEducationController = () => {
	const {
		getEducationData,
		myEducationData: educationArray,
		refetchMyEducationData,
	} = useEducationModel();
	const id = useSelector((state: RootState) => state.user.user.id);
	const navigation = useNavigation<RootHomeStackList>();

	useEffect(() => {
		if (!id) return;
		getEducationData();
	}, [id]);

	useFocusEffect(
		useCallback(() => {
			if (!id) return;
			refetchMyEducationData();
		}, [id]),
	);

	const onEditNavigate = (index: number) => {
		navigation.navigate("MyProfileEducationDetails", {
			educationDetailsIndex: index,
		});
	};

	const detailsConfigMapper = ({
		details,
		type,
	}: {
		details?: IProfileType[];
		type: IProfileComponentType;
	}): IProfileType[] => {
		if (!details) return [];
		switch (type) {
			case IProfileComponentType.PERSONAL_INFO:
			case IProfileComponentType.PROFESSIONAL_INFO: {
				const newDetails = details as (
					| IPersonalInformation
					| IProfessionalInformation
				)[];
				return newDetails?.filter((d) => !!d.subText && !!d.text);
			}
			default:
				return details;
		}
	};

	const mapEducationDetails = (
		educationsData?: ICPSEducationDetails[] | null,
	): IProfessionalInformation[] => {
		return (
			educationsData?.map((education) => {
				const text = `${education?.educationType || ""}${
					education?.branch || education?.stream
						? `, ${education?.branch || education?.stream || ""}`
						: ""
				}`;
				const subText = education?.university || "";
				const description =
					education?.graduatingYearFrom && education?.graduatingYearTo
						? `${education.graduatingYearFrom} - ${education.graduatingYearTo}`
						: education?.graduatingYearFrom ||
							education?.graduatingYearTo ||
							"";

				return { text, subText, description };
			}) || []
		);
	};

	const data = detailsConfigMapper({
		details: mapEducationDetails(educationArray),
		type: IProfileComponentType.PROFESSIONAL_INFO,
	});

	return {
		data,
		onEditNavigate,
	};
};

export default useEducationController;
