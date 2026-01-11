import React from "react";
import { View } from "react-native";

import Speedometer from "@components/asset/assessment/postsubmission/Speedomeeter";
import styles from "@components/asset/recallQuiz/recallQuizPostSubmission/postRecall.styles";
import usePostRecallController from "@components/asset/recallQuiz/recallQuizPostSubmission/usePostRecallController";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import FullMarksRecallQuizModal from "@components/microInteractions/FullMarksRecallQuizModal";
import RNText from "@components/Reusable/RNText";

import { strings } from "@assets/strings";

interface IPostRecallResultsProps {
	attemptID: string;
	recallQuizCode: string;
	noAttemptsLeft: boolean;
}

const PostRecallScreen: React.FC<IPostRecallResultsProps> = ({
	attemptID,
	recallQuizCode,
	noAttemptsLeft,
}) => {
	const {
		percentage,
		title,
		onRetakeQuiz,
		isFullMarksRecallQuizModalOpen,
		setIsFullMarksRecallQuizModalOpen,
	} = usePostRecallController({
		attemptID,
		recallQuizCode,
	});

	return (
		<View style={styles.container}>
			<View style={styles.resultsContainer}>
				<RNText
					title={strings.HERE_IS_HOW_YOU_DID}
					style={styles.titleText}
				/>

				<View style={styles.speedometerContainer}>
					<Speedometer value={percentage} maxValue={100} />
				</View>

				<RNText title={title} style={styles.scoreText} />

				<RNText
					title={strings.ANSWERED_CORRECTLY}
					style={styles.statusText}
				/>
			</View>

			{!noAttemptsLeft ? (
				<CommonButton
					variant={IButtonVariant.Tertiary}
					title={strings.RE_TAKE_QUIZ}
					onPress={onRetakeQuiz}
					style={styles.button}
				/>
			) : (
				<></>
			)}
			<FullMarksRecallQuizModal
				isOpen={isFullMarksRecallQuizModalOpen}
				closeModal={() => setIsFullMarksRecallQuizModalOpen(false)}
			/>
		</View>
	);
};

export default PostRecallScreen;
