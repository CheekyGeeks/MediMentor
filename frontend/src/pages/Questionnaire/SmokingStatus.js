import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import RadioOption from "../../components/questionnaire/RadioOption";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const SmokingStatus = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	const handleChange = (value) => {
		updateAnswer("smokingStatus", value);
	};

	return (
		<QuestionnaireLayout
			step={9}
			totalSteps={17}
			question="What is your smoking status?"
			onPrevious={() => navigate("/questionnaire/cigarettes")}
			onNext={() => navigate("/questionnaire/cholesterol")}
			canProceed={!!answers.smokingStatus}
		>
			<RadioOption
				id="smoking-never"
				name="smokingStatus"
				value="never"
				label="Never smoked"
				selectedValue={answers.smokingStatus}
				onChange={handleChange}
			/>
			<RadioOption
				id="smoking-former"
				name="smokingStatus"
				value="former"
				label="Formerly smoked"
				selectedValue={answers.smokingStatus}
				onChange={handleChange}
			/>
			<RadioOption
				id="smoking-current"
				name="smokingStatus"
				value="current"
				label="Smokes"
				selectedValue={answers.smokingStatus}
				onChange={handleChange}
			/>
		</QuestionnaireLayout>
	);
};

export default SmokingStatus;
