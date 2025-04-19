import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import RadioOption from "../../components/questionnaire/RadioOption";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const ResidenceType = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	const handleChange = (value) => {
		updateAnswer("residenceType", value);
	};

	return (
		<QuestionnaireLayout
			step={15}
			totalSteps={17}
			question="Do you live in an urban or rural area?"
			onPrevious={() => navigate("/questionnaire/work-type")}
			onNext={() => navigate("/questionnaire/diabetes-history")}
			canProceed={!!answers.residenceType}
		>
			<RadioOption
				id="residence-urban"
				name="residenceType"
				value="urban"
				label="Urban"
				selectedValue={answers.residenceType}
				onChange={handleChange}
			/>
			<RadioOption
				id="residence-rural"
				name="residenceType"
				value="rural"
				label="Rural"
				selectedValue={answers.residenceType}
				onChange={handleChange}
			/>
		</QuestionnaireLayout>
	);
};

export default ResidenceType;
