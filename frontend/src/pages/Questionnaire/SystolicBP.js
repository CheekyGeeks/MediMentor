import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import NumberInput from "../../components/questionnaire/NumberInput";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const SystolicBP = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	return (
		<QuestionnaireLayout
			step={5}
			totalSteps={17}
			question="What is your average systolic blood pressure?"
			description="The top number in your blood pressure reading"
			onPrevious={() => navigate("/questionnaire/weight")}
			onNext={() => navigate("/questionnaire/diastolic-bp")}
			canProceed={!!answers.systolicBP && answers.systolicBP > 0}
		>
			<NumberInput
				id="systolicBP"
				label="Enter your systolic blood pressure"
				value={answers.systolicBP}
				onChange={(value) => updateAnswer("systolicBP", value)}
				placeholder="e.g., 120"
				unit="mmHg"
				min={70}
				max={250}
			/>
		</QuestionnaireLayout>
	);
};

export default SystolicBP;
