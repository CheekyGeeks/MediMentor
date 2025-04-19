import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import NumberInput from "../../components/questionnaire/NumberInput";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const Weight = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	return (
		<QuestionnaireLayout
			step={4}
			totalSteps={17}
			question="What is your weight in kilograms?"
			onPrevious={() => navigate("/questionnaire/height")}
			onNext={() => navigate("/questionnaire/systolic-bp")}
			canProceed={!!answers.weight && answers.weight > 0}
		>
			<NumberInput
				id="weight"
				label="Enter your weight"
				value={answers.weight}
				onChange={(value) => updateAnswer("weight", value)}
				placeholder="e.g., 70"
				unit="kg"
				min={20}
				max={300}
			/>
		</QuestionnaireLayout>
	);
};

export default Weight;
