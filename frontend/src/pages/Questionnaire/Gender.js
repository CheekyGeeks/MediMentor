import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import RadioOption from "../../components/questionnaire/RadioOption";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const Gender = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	const handleChange = (value) => {
		updateAnswer("gender", value);
	};

	return (
		<QuestionnaireLayout
			step={1}
			totalSteps={17}
			question="What is your gender?"
			onPrevious={() => navigate("/signup")}
			onNext={() => navigate("/questionnaire/age")}
			canProceed={!!answers.gender}
		>
			<RadioOption
				id="gender-male"
				name="gender"
				value="male"
				label="Male"
				selectedValue={answers.gender}
				onChange={handleChange}
			/>
			<RadioOption
				id="gender-female"
				name="gender"
				value="female"
				label="Female"
				selectedValue={answers.gender}
				onChange={handleChange}
			/>
		</QuestionnaireLayout>
	);
};

export default Gender;
