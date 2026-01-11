import React, { memo } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import LocalBottomSheetWrapper from "@components/Modals/LocalBottomSheetWrapper";
import DropDownModal from "@components/Modals/Profile/DropDownModal";
import CustomButton from "@components/Reusable/Buttons/CustomButton";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { strings } from "@assets/strings";

import RaiseATicketController from "./RaiseATicketController";
import { MyAccountStyles as styles } from "./RaiseATicketStyles";
import RaiseTicketForm from "./RaiseTicketForm/RaiseTicketForm";

const {
	themes: { bg },
	commonStyles: {
		align: { flex1 },
		spacing: { mh20 },
	},
} = C;

const BodyComponent = () => {
	const {
		createTicketFormData,
		onChangeSubject,
		onChangeDescription,
		createTicketFormError,
		addAttachments,
		removeAttachment,
		onSubmit,
		bottomSheetRef,
		openCourseSheet,
		modalData,
		openCategorySheet,
		onChooseItem,
		modalOptions,
		onSubmitSubject,
		onViewAttachment,
		onSubmitDescription,
		isDropDownItemLoading,
	} = RaiseATicketController();
	return (
		<>
			<KeyboardAwareScrollView
				enableOnAndroid
				enableAutomaticScroll
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.flg}
				resetScrollToCoords={{ x: 0, y: 0 }}
				automaticallyAdjustContentInsets={false}
				style={[flex1, mh20]}
			>
				<RaiseTicketForm
					formData={createTicketFormData}
					onChangeSubject={onChangeSubject}
					onChangeDescription={onChangeDescription}
					openCategorySheet={openCategorySheet}
					openCourseSheet={openCourseSheet}
					addAttachments={addAttachments}
					onViewAttachment={onViewAttachment}
					removeAttachment={removeAttachment}
					onSubmitSubject={onSubmitSubject}
					onSubmitDescription={onSubmitDescription}
					createTicketFormError={createTicketFormError}
				/>
			</KeyboardAwareScrollView>
			<CustomButton
				title={strings.SUBMIT}
				onBtnHandler={onSubmit}
				btnStyle={styles.btmButtonStyle}
			/>
			<LocalBottomSheetWrapper
				indicatorColor={bg.disabled}
				snapPoints={["70%"]}
				useSnapPoints={false}
				bottomSheetRef={bottomSheetRef}
			>
				<DropDownModal
					dataLoading={isDropDownItemLoading}
					data={modalData}
					{...modalOptions}
					onChooseItem={onChooseItem}
				/>
			</LocalBottomSheetWrapper>
		</>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const RaiseATicketView = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		title={strings.RAISE_A_ISSUE}
		backgroundColor={colors.neutral.grey_02}
	/>
);

export default RaiseATicketView;
