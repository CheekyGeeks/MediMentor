import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import NumberInput from "../../components/questionnaire/NumberInput";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const Pregnancies = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	return (
		<QuestionnaireLayout
			step={13}
			totalSteps={17}
			question="If applicable, how many times have you been pregnant?"
			description="If not applicable, enter 0"
			onPrevious={() => navigate("/questionnaire/marital-status")}
			onNext={() => navigate("/questionnaire/work-type")}
			canProceed={
				answers.pregnancies !== undefined && answers.pregnancies !== ""
			}
		>
			<NumberInput
				id="pregnancies"
				label="Enter number of pregnancies"
				value={answers.pregnancies}
				onChange={(value) => updateAnswer("pregnancies", value)}
				placeholder="e.g., 0"
				min={0}
				max={20}
			/>
		</QuestionnaireLayout>
	);
};

export default Pregnancies;
