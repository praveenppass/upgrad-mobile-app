import React, { lazy, useCallback } from "react";
import { FlatList, Image, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";

import {
	styles,
	useClassOpinionController,
} from "@components/asset/classOpinion";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import CustomChip from "@components/Reusable/CustomChip";
import EmptyCard from "@components/Reusable/EmptyCard";
import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";

import { IClassOpinionResponse } from "@graphql/query/asset/classOpinion/getClassOpinionResponses";

import { RootState } from "@redux/store/root.reducer";

import { LearningPathType } from "@interface/app.interface";

import { NoResponseIcon } from "@assets/icons";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";

const CommonTextInputForm = lazy(() => import("./common/CommonTextInputForm"));
const OpinionListItem = lazy(() => import("./common/classOpinionListItem"));
const ClassOpinionSkeleton = lazy(() => import("./classOpinionSkeleton"));

interface ClassOpinionAsset {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
	modalPageData?: any;
	closeModal?: (response?: string) => void;
}

const ClassOpinion: React.FC<ClassOpinionAsset> = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
	modalPageData,
	closeModal,
}) => {
	const {
		control,
		handleSubmit,
		errors,
		isValid,
		getValues,
		handleResponseEdit,
		loadingClassOpinionCourseData,
		loadingClassOpinionProgramData,
		loadingClassOpinionResponseData,
		responseCount,
		showOthersOpinion,
		editResponseModalVisible,
		toggleEditResponseModal,
		submitClassOpinionResponse,
		question,
		minLength,
		maxLength,
		sortedOpinions,
		isOpinionAdded,
		minMaxWordLimitMessage,
	} = useClassOpinionController({
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		learningPathId,
		learningPathType,
		modalPageData,
		closeModal,
	});

	const {
		user: { id },
	} = useSelector((state: RootState) => state.user);

	const renderItem = useCallback(
		({ item }: { item: IClassOpinionResponse }) => {
			const editable = item.createdBy.id === id;

			return (
				<OpinionListItem
					item={item}
					editable={editable}
					onEditIconPress={() => {
						if (editable) {
							handleResponseEdit(item.response);
						}
						toggleEditResponseModal();
					}}
				/>
			);
		},
		[id, toggleEditResponseModal],
	);

	const renderListEmptyComponent = () => {
		if (responseCount === 0) {
			return (
				<View style={styles.emptyCardContainer}>
					<EmptyCard
						title={strings.BE_THE_FIRST_ONE_TO_RESPOND}
						titleStyle={styles.emptyCardTitleStyle}
						icon={<NoResponseIcon />}
					/>
				</View>
			);
		}

		if (!showOthersOpinion) {
			return (
				<View style={styles.hiddenImageContainer}>
					<Image
						source={{ uri: IMAGE_URLS.HIDEN_OPINION_ICON }}
						style={styles.hideBlurImage}
						resizeMode="contain"
					/>
				</View>
			);
		}

		return null;
	};

	if (
		loadingClassOpinionCourseData ||
		loadingClassOpinionProgramData ||
		loadingClassOpinionResponseData
	) {
		return <ClassOpinionSkeleton />;
	}

	const headerComponent = () => (
		<View style={styles.headerContainer}>
			<RNText style={styles.title}>{strings.ALL_RESPONSES}</RNText>
			<CustomChip
				customStyle={[styles.chipStyle]}
				customTextCss={styles.chipText}
				title={`${responseCount || 0} responses`}
				handleChipPress={() => {}}
				disabled={true}
			/>
		</View>
	);

	return (
		<>
			<ScrollView
				style={styles.mainContainer}
				contentContainerStyle={styles.contentContainer}
			>
				<View>
					<RenderHtml content={question ?? ""} />

					{(!responseCount || !isOpinionAdded) && (
						<CommonTextInputForm
							control={control}
							name="description"
							errors={errors}
							onSubmit={handleSubmit(submitClassOpinionResponse)}
							minLength={minLength}
							maxLength={maxLength}
							isLoading={loadingClassOpinionResponseData}
							isValid={isValid}
							placeHolder={strings.ENTER_YOUR_RESPONSE}
							minMaxWordLimitMessage={minMaxWordLimitMessage}
						/>
					)}

					<View style={styles.divider} />
					<FlatList
						data={sortedOpinions}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						removeClippedSubviews
						maxToRenderPerBatch={10}
						ListEmptyComponent={renderListEmptyComponent}
						ListHeaderComponent={headerComponent}
						contentContainerStyle={{ marginBottom: 30 }}
					/>
				</View>
			</ScrollView>

			<ActionModal
				isOpen={editResponseModalVisible}
				closeModal={toggleEditResponseModal}
				onBackPress={toggleEditResponseModal}
				style={styles.modalStyle}
			>
				<ScrollView style={{ flexGrow: 1 }}>
					<View style={{}}>
						<View style={styles.containerView}>
							<View style={styles.centerSlider}>
								<View style={styles.slider} />
							</View>
						</View>
						<CommonTextInputForm
							control={control}
							name="description"
							errors={errors}
							onSubmit={handleSubmit(submitClassOpinionResponse)}
							minLength={minLength}
							maxLength={maxLength}
							currentResponse={getValues("description")}
							textInputStyle={styles.modalTextInputStyle}
							isLoading={loadingClassOpinionResponseData}
							isValid={isValid}
							isModal
							minMaxWordLimitMessage={minMaxWordLimitMessage}
						/>
					</View>
				</ScrollView>
			</ActionModal>
		</>
	);
};

export default ClassOpinion;
