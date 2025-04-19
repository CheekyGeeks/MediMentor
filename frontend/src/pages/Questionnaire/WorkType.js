import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../components/questionnaire/QuestionnaireLayout";
import RadioOption from "../../components/questionnaire/RadioOption";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const WorkType = () => {
	const { answers, updateAnswer } = useQuestionnaire();
	const navigate = useNavigate();

	const handleChange = (value) => {
		updateAnswer("workType", value);
	};

	// Auto-fill smoking status and cigarettes per day for children
	useEffect(() => {
		if (answers.workType === "child") {
			updateAnswer("smokingStatus", "never");
			updateAnswer("cigarettesPerDay", "0");
		}
	}, [answers.workType, updateAnswer]);

	return (
		<QuestionnaireLayout
			step={14}
			totalSteps={17}
			question="What best describes your current work type?"
			onPrevious={() => navigate("/questionnaire/pregnancies")}
			onNext={() => navigate("/questionnaire/residence")}
			canProceed={!!answers.workType}
		>
			<RadioOption
				id="work-child"
				name="workType"
				value="child"
				label="Child"
				selectedValue={answers.workType}
				onChange={handleChange}
			/>
			<RadioOption
				id="work-never"
				name="workType"
				value="never"
				label="Never worked"
				selectedValue={answers.workType}
				onChange={handleChange}
			/>
			<RadioOption
				id="work-self"
				name="workType"
				value="self"
				label="Self-employed"
				selectedValue={answers.workType}
				onChange={handleChange}
			/>
			<RadioOption
				id="work-govt"
				name="workType"
				value="government"
				label="Government job"
				selectedValue={answers.workType}
				onChange={handleChange}
			/>
			<RadioOption
				id="work-private"
				name="workType"
				value="private"
				label="Private job"
				selectedValue={answers.workType}
				onChange={handleChange}
			/>
		</QuestionnaireLayout>
	);
};

export default WorkType;
