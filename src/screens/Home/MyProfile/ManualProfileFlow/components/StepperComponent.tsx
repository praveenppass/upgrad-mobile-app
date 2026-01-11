import React, { memo, useMemo } from "react";
import {
	StyleSheet,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";

import { IProfileSectionStatus } from "@screens/Home/MyProfile/ManualProfileFlow/utils/sectionBuilders/sectionBuilder.types";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { TickIconDynamic } from "@assets/icons";
import { ClockOutlineIcon } from "@assets/icons/svg/studyPlan";
import { commonStyles } from "@assets/styles";

type StepStatus = "completed" | "current" | "pending";

const { neutral, state } = colors;

const { reg, sm, medium, semiBold } = commonStyles.text;

export interface IStep {
	id: string;
	title: string;
	status: IProfileSectionStatus;
	dueDate?: string;
	isCompleted: boolean;
	isDeadlinePassed: boolean;
	type: string;
}

interface IStepperComponentProps {
	steps: IStep[];
	currentStep: number;
	onStepPress: (stepIndex: number) => void;
	showDueDate?: boolean;
}

interface IProcessedStep {
	id: string;
	number: number;
	status: StepStatus;
	title: string;
	dueDate?: string;
	showConnector: boolean;
	connectorDone: boolean;
	isCompleted: boolean;
}

interface IStepCircleProps {
	status: StepStatus;
	number: number;
	onPress: () => void;
	isCompleted: boolean;
}

const ICON_SIZE = 24;
const TOUCH_OPACITY = 0.7;

const getCircleStyles = (
	isCompleted: boolean,
	isCurrent: boolean,
): ViewStyle[] => {
	if (isCompleted) return [styles.circle, styles.done];
	if (isCurrent) return [styles.circle, styles.current];
	return [styles.circle, styles.pending];
};

const getNumberStyles = (isCurrent: boolean): TextStyle[] => {
	return isCurrent
		? [styles.num, styles.numCur]
		: [styles.num, styles.numPending];
};

const mapProfileStatusToStepStatus = (
	status: IProfileSectionStatus,
): StepStatus => {
	switch (status) {
		case IProfileSectionStatus.CURRENT:
			return "current";
		case IProfileSectionStatus.COMPLETED:
			return "completed";
		case IProfileSectionStatus.PENDING:
		default:
			return "pending";
	}
};

const StepCircle = memo(
	({ status, number, onPress, isCompleted }: IStepCircleProps) => {
		const isCurrent = status === "current";

		const circleStyle = useMemo(
			() => getCircleStyles(isCompleted, isCurrent),
			[isCompleted, isCurrent],
		);

		const numberStyle = useMemo(
			() => getNumberStyles(isCurrent),
			[isCurrent],
		);

		const content = useMemo(
			() =>
				isCompleted ? (
					<TickIconDynamic
						height={ICON_SIZE}
						width={ICON_SIZE}
						color={neutral.white}
					/>
				) : (
					<RNText style={numberStyle}>{number}</RNText>
				),
			[isCompleted, numberStyle, number],
		);

		return (
			<TouchableOpacity
				style={circleStyle}
				onPress={onPress}
				activeOpacity={TOUCH_OPACITY}
			>
				{content}
			</TouchableOpacity>
		);
	},
);

StepCircle.displayName = "StepCircle";

interface IStepConnectorProps {
	done: boolean;
}

const StepConnector = memo(({ done }: IStepConnectorProps) => {
	const connectorStyle = useMemo(
		() => [styles.connector, done ? styles.conDone : styles.conInact],
		[done],
	);

	return <View style={connectorStyle} />;
});

StepConnector.displayName = "StepConnector";

const StepperComponent = ({
	steps,
	currentStep,
	onStepPress,
	showDueDate = false,
}: IStepperComponentProps) => {
	const currentStepData = useMemo(
		() => steps[currentStep],
		[steps, currentStep],
	);

	const processedSteps = useMemo<IProcessedStep[]>(
		() =>
			steps.map((step, index) => {
				const isCurrentStep = index === currentStep;
				const stepNumber = index + 1;

				// Determine the step status - current step always shows as current
				const stepStatus: StepStatus = isCurrentStep
					? "current"
					: mapProfileStatusToStepStatus(step.status);

				// Connector is green if step is completed or is the current step
				const connectorDone = step.isCompleted || isCurrentStep;

				return {
					id: step.id,
					number: stepNumber,
					status: stepStatus,
					title: step.title,
					dueDate: step.dueDate,
					showConnector: index < steps.length - 1,
					connectorDone,
					isCompleted: step.isCompleted,
				};
			}),
		[steps, currentStep],
	);

	const dueDateStyle = useMemo(
		() => (currentStepData?.isDeadlinePassed ? styles.dueRed : styles.due),
		[currentStepData?.isDeadlinePassed],
	);

	const handleStepPress = useMemo(
		() => processedSteps.map((_, index) => () => onStepPress(index)),
		[processedSteps, onStepPress],
	);

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				{processedSteps.map((step, index) => (
					<React.Fragment key={step.id}>
						<StepCircle
							status={step.status}
							number={step.number}
							onPress={handleStepPress[index]}
							isCompleted={step.isCompleted}
						/>
						{step.showConnector && (
							<StepConnector done={step.connectorDone} />
						)}
					</React.Fragment>
				))}
			</View>
			{currentStepData?.title && (
				<RNText style={styles.heading}>{currentStepData.title}</RNText>
			)}
			{showDueDate && currentStepData?.dueDate && (
				<View style={styles.dueRow}>
					<ClockOutlineIcon
						width={horizontalScale(16)}
						height={verticalScale(16)}
						style={styles.clock}
					/>
					<RNText style={dueDateStyle}>
						{`(Due Date: ${currentStepData.dueDate})`}
					</RNText>
				</View>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	circle: {
		alignItems: "center",
		borderRadius: verticalScale(15),
		height: verticalScale(30),
		justifyContent: "center",
		width: verticalScale(30),
	},
	clock: { ...reg, marginRight: horizontalScale(4) },
	conDone: { backgroundColor: state.success_green },
	conInact: { backgroundColor: neutral.grey_05 },
	connector: {
		height: verticalScale(3),
		width: horizontalScale(36),
	},
	container: {
		alignItems: "center",
		backgroundColor: neutral.white,
		marginHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(16),
	},
	current: {
		backgroundColor: neutral.white,
		borderColor: state.success_green,
		borderWidth: 3,
	},
	done: {
		backgroundColor: state.success_green,
		borderColor: state.success_green,
		borderWidth: 3,
	},
	due: { color: neutral.grey_07, ...sm },
	dueRed: { color: state.error_red, ...sm },
	dueRow: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	heading: {
		color: neutral.black,
		...reg,
		...semiBold,
	},
	num: { ...sm, ...medium },
	numCur: { ...sm, ...medium, color: state.success_green },
	numPending: { ...sm, ...medium, color: neutral.grey_07 },
	pending: {
		backgroundColor: neutral.white,
		borderColor: neutral.grey_05,
		borderWidth: 2,
	},
	row: { alignItems: "center", flexDirection: "row", marginBottom: 16 },
});

StepperComponent.displayName = "StepperComponent";

const MemoizedStepperComponent = memo(StepperComponent);

export default MemoizedStepperComponent;
