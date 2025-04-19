import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import RadioOption from "../../components/questionnaire/RadioOption";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const MaritalStatus = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	const handleChange = (value) => {
		updateAnswer("married", value);
	};

	return (
		<QuestionnaireLayout
			step={12}
			totalSteps={17}
			question="Have you ever been married?"
			onPrevious={() => navigate("/questionnaire/glucose")}
			onNext={() => navigate("/questionnaire/pregnancies")}
			canProceed={!!answers.married}
		>
			<RadioOption
				id="married-yes"
				name="married"
				value="yes"
				label="Yes"
				selectedValue={answers.married}
				onChange={handleChange}
			/>
			<RadioOption
				id="married-no"
				name="married"
				value="no"
				label="No"
				selectedValue={answers.married}
				onChange={handleChange}
			/>
		</QuestionnaireLayout>
	);
};

export default MaritalStatus;
