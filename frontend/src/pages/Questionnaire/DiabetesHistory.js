import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import RadioOption from "../../components/questionnaire/RadioOption";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const DiabetesHistory = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	const handleChange = (value) => {
		updateAnswer("diabetesHistory", value);
	};

	return (
		<QuestionnaireLayout
			step={16}
			totalSteps={17}
			question="Do you have a family history of diabetes?"
			onPrevious={() => navigate("/questionnaire/residence")}
			onNext={() => navigate("/questionnaire/chest-pain")}
			canProceed={!!answers.diabetesHistory}
		>
			<RadioOption
				id="diabetes-none"
				name="diabetesHistory"
				value="none"
				label="No history"
				selectedValue={answers.diabetesHistory}
				onChange={handleChange}
			/>
			<RadioOption
				id="diabetes-low"
				name="diabetesHistory"
				value="low"
				label="Low history"
				selectedValue={answers.diabetesHistory}
				onChange={handleChange}
			/>
			<RadioOption
				id="diabetes-moderate"
				name="diabetesHistory"
				value="moderate"
				label="Moderate history"
				selectedValue={answers.diabetesHistory}
				onChange={handleChange}
			/>
			<RadioOption
				id="diabetes-high"
				name="diabetesHistory"
				value="high"
				label="High history"
				selectedValue={answers.diabetesHistory}
				onChange={handleChange}
			/>
		</QuestionnaireLayout>
	);
};

export default DiabetesHistory;
