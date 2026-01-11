import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import RecallQuizScreen from "@screens/Tabs/Courses/Recallquiz/QuizScreen";

import RecallQuiz from "@components/asset/recallQuiz/RecallQuiz";

import { styles } from "./styles";

interface INVideoProps {
	closeModal: (response?: string) => void;
	props: any;
}
const InVideoRecallQuiz = ({ props, closeModal }: INVideoProps) => {
	const [attemptID, setAttemptId] = useState(null);
	const [previewModeKey, setPreviewMode] = useState<boolean | undefined>(
		undefined,
	);

	const pageData = {
		assetCode: props?.input?.recallQuiz,
		learningPathId: props?.input?.meta?.learnerCourse,
		attemptID: attemptID,
		learningPathType: props.learningPathType,
		parentAssetCode: props?.parentAssetCode,
		previewModeKey,
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			{attemptID ? (
				<RecallQuizScreen
					closeModal={closeModal}
					pageData={{
						...pageData,
						attemptID: attemptID,
					}}
				/>
			) : (
				<RecallQuiz
					setAttemptId={setAttemptId}
					setPreviewMode={setPreviewMode}
					{...props}
				/>
			)}
		</SafeAreaView>
	);
};

export default InVideoRecallQuiz;
