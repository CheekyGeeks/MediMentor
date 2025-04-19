import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import NumberInput from "../../components/questionnaire/NumberInput";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const CigarettesPerDay = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	// Skip this question for children
	useEffect(() => {
		if (answers.workType === "child") {
			navigate("/questionnaire/smoking-status");
		}
	}, [answers.workType, navigate]);

	return (
		<QuestionnaireLayout
			step={8}
			totalSteps={17}
			question="How many cigarettes do you smoke per day on average?"
			description="If you don't smoke, enter 0"
			onPrevious={() => navigate("/questionnaire/heart-rate")}
			onNext={() => navigate("/questionnaire/smoking-status")}
			canProceed={
				answers.cigarettesPerDay !== undefined &&
				answers.cigarettesPerDay !== ""
			}
		>
			<NumberInput
				id="cigarettesPerDay"
				label="Enter number of cigarettes"
				value={answers.cigarettesPerDay}
				onChange={(value) => updateAnswer("cigarettesPerDay", value)}
				placeholder="e.g., 0"
				min={0}
				max={100}
			/>
		</QuestionnaireLayout>
	);
};

export default CigarettesPerDay;
