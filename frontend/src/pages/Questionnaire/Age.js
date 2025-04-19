import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import NumberInput from "../../components/questionnaire/NumberInput";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const Age = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	return (
		<QuestionnaireLayout
			step={2}
			totalSteps={17}
			question="How old are you?"
			onPrevious={() => navigate("/questionnaire/gender")}
			onNext={() => navigate("/questionnaire/height")}
			canProceed={!!answers.age && answers.age > 0}
		>
			<NumberInput
				id="age"
				label="Enter your age"
				value={answers.age}
				onChange={(value) => updateAnswer("age", value)}
				placeholder="Enter your age"
				unit="years"
				min={1}
				max={120}
			/>
		</QuestionnaireLayout>
	);
};

export default Age;
