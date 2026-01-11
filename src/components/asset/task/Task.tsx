import React from "react";
import { ScrollView, View } from "react-native";

import AssetPenalty from "@components/asset/AssetPenalty/AssetPenalty";
import AssetInstructions from "@components/asset/common/AssetInstructions";
import AssetSkillsList from "@components/asset/common/AssetSkillsList";
import ReferenceLinks from "@components/asset/common/ReferenceLinks";
import DeadlineExtension from "@components/asset/deadlineExtension";
import GroupSubmissionDetails from "@components/asset/task/common/groupSubmission/GroupSubmissionDetails";
import UploadTask from "@components/asset/task/common/SubmitTask";
import TaskSubmissionCard from "@components/asset/task/common/TaskSubmissionCard";
import styles from "@components/asset/task/task.styles";
import useTaskController from "@components/asset/task/useTaskController";
import AssignmentSubmissionModal from "@components/microInteractions/AssignmentSubmissionModal";
import DownloadsourcecodeFile from "@components/Reusable/DownloadsourcecodeFile";

import { LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";

import { strings } from "@assets/strings";

interface ITask {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
	assetType: IAssetType.ASSIGNMENT | IAssetType.PROJECT;
}

const Task = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
	assetType,
}: ITask) => {
	const {
		onUploadTask,
		closeUploadTask,
		evaluationReport,
		requestedReEvaluationDate,
		progress,
		onResubmit,
		taskDownloading,
		downloadingFileName,
		openUploadTaskModal,
		uploadedTask,
		task,
		taskDuration,
		groupMembers,
		isGroupSubmission,
		groupSubmissionLoading,
		loading,
		uploadTask,
		groupTaskSubmittedByName,
		assetDetails,
		totalExtensionsAllowed,
		totalExtensionsTaken,
		hardDeadlineDays,
		dueDateExtensionMode,
		isTaskSubmitted,
		taskDownload,
		submitTask,
		taskSubmissionTypeUrl,
		taskSubmissionType,
		taskSubmittedDate,
		refetchQueries,
		skills,
		subSkills,
		referenceLinks,
		extensionRequests,
		isDeadlineExtensionRegained,
		handleEvaluationSubmit,
		learnerRevaluationRequestDate,
		isRevaluationCompleted,
		isEvaluationCompleted,
		isRevaluationBtnVisible,
		showSubmissionReview,
		evaluationStatus,
		onUploadURL,
		url,
		handleInputChange,
		penalties,
		loadingAssetPenalty,
		originalDueDate,
		extendedDueDate,
		revertedPenalties,
		setOpenUploadTaskModal,
		uploadLimit,
		urlLimit,
		onDeleteFile,
		isResubmissionButtonVisible,
		uploadedFilesArray,
		answerFilesArray,
		fileValidationError,
		isResubmit,
		errorMessage,
		submissionTemplate,
		isAssignmentSubmissionModalOpen,
		handleAssignmentSubmissionModalClose,
	} = useTaskController({
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		learningPathId,
		learningPathType,
		assetType,
	});

	return (
		<>
			<ScrollView style={styles.main}>
				{isGroupSubmission ? (
					<GroupSubmissionDetails
						data={groupMembers || []}
						loading={groupSubmissionLoading}
						style={[
							styles.component,
							styles.groupSubmissionDetails,
						]}
					/>
				) : (
					<></>
				)}

				<UploadTask
					marks={task?.marks ?? 0}
					duration={taskDuration ?? 0}
					upload={onUploadTask}
					uploadUrl={onUploadURL}
					uploadTaskEnterUrl={url}
					setOpenUploadTaskModal={setOpenUploadTaskModal}
					isTaskSubmitTypeUrl={taskSubmissionTypeUrl}
					handleInputChange={handleInputChange}
					uploadFileTitle={uploadTask || ""}
					disabled={isGroupSubmission && !groupMembers.length}
					assetType={assetType}
					loading={loading}
					dueDate={assetDetails?.endsAt || null}
					onSubmit={submitTask}
					modalVisible={openUploadTaskModal}
					onModalClose={closeUploadTask}
					progressPercent={progress}
					submissionFileName={uploadedFilesArray}
					isUploaded={uploadedTask}
					onDeleteFile={onDeleteFile}
					downloading={taskDownloading}
					uploadLimit={uploadLimit || 0}
					urlLimit={urlLimit}
					downloadingFileName={downloadingFileName || undefined}
					onDownload={taskDownload}
					isGroupSubmission={isGroupSubmission}
					hardDeadlineDays={hardDeadlineDays || 0}
					style={[
						styles.component,
						!isGroupSubmission && styles.topComponent,
					]}
					isTaskSubmitted={isTaskSubmitted}
					fileValidationError={fileValidationError}
					errorMessage={errorMessage}
				/>

				{isTaskSubmitted ? (
					<TaskSubmissionCard
						assetType={assetType}
						handleEvaluationSubmit={handleEvaluationSubmit}
						submittedDate={taskSubmittedDate}
						evaluationReport={evaluationReport}
						requestedReEvaluationDate={requestedReEvaluationDate}
						learnerRevaluationRequestDate={
							learnerRevaluationRequestDate
						}
						isRevaluationCompleted={isRevaluationCompleted}
						isEvaluationCompleted={isEvaluationCompleted}
						isRevaluationBtnVisible={isRevaluationBtnVisible}
						showSubmissionReview={showSubmissionReview}
						title={answerFilesArray || []}
						submitUrl={taskSubmissionTypeUrl || false}
						taskSubmissionType={taskSubmissionType}
						downloading={taskDownloading}
						downloadingFileName={downloadingFileName || undefined}
						submittedBy={groupTaskSubmittedByName}
						download={taskDownload}
						isResubmissionButtonVisible={
							isResubmissionButtonVisible
						}
						onResubmit={onResubmit}
						hardDeadlineDays={hardDeadlineDays || 0}
						evaluationStatus={evaluationStatus}
						style={[
							styles.component,
							!isGroupSubmission && styles.topComponent,
						]}
						isResubmit={isResubmit}
					/>
				) : (
					<></>
				)}

				<DeadlineExtension
					originalDueDate={originalDueDate}
					extendedDueDate={extendedDueDate}
					extensionRequests={extensionRequests ?? []}
					loading={loading}
					courseId={courseId}
					moduleId={moduleId}
					learningPathId={learningPathId}
					dueDateExtensionMode={dueDateExtensionMode || null}
					totalExtensionsAllowed={totalExtensionsAllowed || null}
					totalExtensionsTaken={totalExtensionsTaken || null}
					onSubmit={refetchQueries}
					style={styles.component}
					submittedDate={taskSubmittedDate}
					isExtensionRegained={isDeadlineExtensionRegained ?? false}
					penalties={revertedPenalties}
				/>

				<AssetPenalty
					style={styles.component}
					penalties={penalties}
					loading={loadingAssetPenalty}
				/>

				<AssetInstructions
					html={task?.instructions ?? ""}
					loading={loading}
					style={styles.component}
				/>
				{submissionTemplate ? (
					<View style={styles.submissionTemplateContainer}>
						<DownloadsourcecodeFile
							filePath={submissionTemplate}
							fileTitle={strings.SUBMISSION_TEMPLATE}
						/>
					</View>
				) : null}

				<AssetSkillsList
					data={skills ?? []}
					title={strings.SKILLS}
					loading={loading}
					style={styles.component}
				/>

				<AssetSkillsList
					data={subSkills ?? []}
					title={strings.SUB_SKILLS}
					loading={loading}
					style={styles.component}
				/>

				<ReferenceLinks
					style={styles.endComponent}
					links={referenceLinks ?? []}
					loading={loading}
				/>
				<AssignmentSubmissionModal
					isOpen={isAssignmentSubmissionModalOpen}
					closeModal={handleAssignmentSubmissionModalClose}
				/>
			</ScrollView>
		</>
	);
};

export default Task;
