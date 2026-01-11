import React, { memo } from "react";
import {
	FieldValues,
	FormProvider,
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
} from "react-hook-form";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import EditMyProfileDetailsSkeleton from "@components/MyProfile/common/EditMyProfileDetailsSkeleton";
import { IFieldConfig } from "@components/MyProfile/common/profile.interface";
import { renderFields } from "@components/MyProfile/common/profile.util";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";

interface IEditMyProfileDetails {
	loading: boolean;
	fields: IFieldConfig[];
	submitDisabled: boolean;
	methods: UseFormReturn<FieldValues>;
	onError: SubmitErrorHandler<FieldValues>;
	onSubmit: SubmitHandler<FieldValues>;
}

const EditMyProfileDetails = ({
	loading,
	fields,
	submitDisabled,
	methods,
	onError,
	onSubmit,
}: IEditMyProfileDetails) => {
	const { formState, handleSubmit } = methods;

	if (loading) return <EditMyProfileDetailsSkeleton />;

	const isButtonDisabled = submitDisabled || !formState.isDirty;
	const isPlatformIOS = Platform.OS === "ios";

	console.log("IEditMyProfileDetails : ", fields);
	return (
		<View style={styles.container}>
			<KeyboardAvoidingView
				behavior={isPlatformIOS ? "padding" : "height"}
				style={styles.container}
				keyboardVerticalOffset={
					isPlatformIOS ? verticalScale(140) : verticalScale(110)
				}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					keyboardShouldPersistTaps="handled"
					automaticallyAdjustsScrollIndicatorInsets={false}
				>
					<FormProvider {...methods}>
						<View style={styles.fields}>
							{renderFields(fields)}
						</View>
					</FormProvider>
				</ScrollView>
			</KeyboardAvoidingView>

			<View style={styles.buttonContainer}>
				<CommonButton
					title={submitDisabled ? strings.SAVING : strings.SAVE}
					isDisabled={isButtonDisabled}
					onPress={handleSubmit(onSubmit, onError)}
					variant={IButtonVariant.Secondary}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: colors.neutral.white,
		paddingHorizontal: horizontalScale(24),
		paddingTop: verticalScale(20),
	},
	container: {
		flex: 1,
	},
	fields: {
		gap: verticalScale(12),
	},
	scrollContainer: {
		paddingHorizontal: horizontalScale(24),
		paddingTop: verticalScale(20),
	},
});

export default memo(EditMyProfileDetails);
