import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import RadioOption from "../../components/questionnaire/RadioOption";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const ChestPain = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	const handleChange = (value) => {
		updateAnswer("chestPain", value);
	};

	return (
		<QuestionnaireLayout
			step={17}
			totalSteps={17}
			question="Do you experience chest pain during physical activity or exercise?"
			onPrevious={() => navigate("/questionnaire/diabetes-history")}
			onNext={() => navigate("/questionnaire/complete")}
			canProceed={!!answers.chestPain}
		>
			<RadioOption
				id="chest-pain-yes"
				name="chestPain"
				value="yes"
				label="Yes"
				selectedValue={answers.chestPain}
				onChange={handleChange}
			/>
			<RadioOption
				id="chest-pain-no"
				name="chestPain"
				value="no"
				label="No"
				selectedValue={answers.chestPain}
				onChange={handleChange}
			/>
		</QuestionnaireLayout>
	);
};

export default ChestPain;
