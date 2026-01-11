import { AssestQuiz, PageData } from "@interface/assessment.interface";
import { IAssetType } from "@interface/asset.interface";
import { useEffect, useState } from "react";
enum FrameEnum {
    QUESTION = "question"
}
interface IAssessmentFrameProps {
    assestData: object | undefined;
    assetType?: string
}

const AssetFrameController = ({
    assestData,
    assetType
}: IAssessmentFrameProps) => {
    const [assetFrameData, setAssetFrame] = useState<{
        totalQuestion: number;
        duration: number;
        passPercentage: number;
        titleText: string;
    }>({
        totalQuestion: 0,
        duration: 0,
        passPercentage: 0,
        titleText: "",
    });
    useEffect(() => {
        switch (assetType) {
            case IAssetType.ASSESSMENT:
                assesmentRender();
                break;
            case IAssetType.RECALL_QUIZ:
                recallQuizRender();
                break;
        }
    }, [assestData]);
    const assesmentRender = async () => {
        const assessmentData: PageData = assestData || {};
        const totalQuestion: number = assessmentData?.extraData?.totalQuestions || 0;
        const status: string = assessmentData?.attempt?.status || "";
        const attemptNumber: number = assessmentData?.attempt?.attemptNumber || 0;
        const duration: number = assessmentData?.settings?.generalSettings?.duration || 0;
        const passPercentage: number = assessmentData?.settings?.generalSettings?.passPercentage || 0;
        const currentAttempt = [AssestQuiz.IN_PROGRESS, AssestQuiz.NOT_STARTED].includes(status) && attemptNumber > 0 ? attemptNumber - 1 : [AssestQuiz.COMPLETED].includes(status) ? attemptNumber : 0;
        const limit: number = assessmentData?.settings?.generalSettings?.attemptLimit || 0;
        const textCount = limit - currentAttempt >= 0 ? limit - currentAttempt : 0;
        const titleText: string = limit ? `${[AssestQuiz.COMPLETED].includes(status) && attemptNumber === limit ? 0 : textCount}/${limit} Attempts Left` :
            assessmentData?.settings?.generalSettings?.attemptLevel === FrameEnum?.QUESTION ? `Limited Attempt` : "Unlimited Attempt";
        setAssetFrame({
            totalQuestion,
            duration,
            passPercentage,
            titleText
        })
    }
    const recallQuizRender = async () => {
        const recallQuizData: PageData = assestData || {};
        const totalQuestion: number = recallQuizData?.extraData?.totalQuestions || 0;
        const titleText: string = recallQuizData?.attemptQuiz?.attemptLeft >= 0 && recallQuizData?.quiz?.generalSettings?.attemptLimit ? `${recallQuizData?.attemptQuiz?.attemptLeft}/${recallQuizData?.quiz?.generalSettings?.attemptLimit} Attempts Left` : "Unlimited Attempt"
        setAssetFrame({
            totalQuestion,
            titleText,
            passPercentage: 0,
            duration: 0
        })
    }
    return {
        assetFrameData
    };
};

export default AssetFrameController;
