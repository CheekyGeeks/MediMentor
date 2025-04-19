import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import NumberInput from "../../components/questionnaire/NumberInput";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const Height = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	return (
		<QuestionnaireLayout
			step={3}
			totalSteps={17}
			question="What is your height in meters?"
			onPrevious={() => navigate("/questionnaire/age")}
			onNext={() => navigate("/questionnaire/weight")}
			canProceed={!!answers.height && answers.height > 0}
		>
			<NumberInput
				id="height"
				label="Enter your height"
				value={answers.height}
				onChange={(value) => updateAnswer("height", value)}
				placeholder="e.g., 1.75"
				unit="m"
				min={0.5}
				max={3}
			/>
		</QuestionnaireLayout>
	);
};

export default Height;
