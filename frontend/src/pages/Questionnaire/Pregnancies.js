import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import NumberInput from "../../components/questionnaire/NumberInput";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const Pregnancies = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	// Auto-skip for males by setting pregnancies to 0 and continuing to next question
	useEffect(() => {
		if (answers.gender === "male") {
			updateAnswer("pregnancies", "0");
			navigate("/questionnaire/work-type");
		}
	}, [answers.gender, navigate, updateAnswer]);

	return (
		<QuestionnaireLayout
			step={13}
			totalSteps={17}
			question="How many times have you been pregnant?"
			description="Enter 0 if never pregnant"
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
