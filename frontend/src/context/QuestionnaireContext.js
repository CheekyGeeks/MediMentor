import React, { createContext, useContext, useState } from "react";

const QuestionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
	const [answers, setAnswers] = useState({
		gender: "",
		age: "",
		height: "",
		weight: "",
		systolicBP: "",
		diastolicBP: "",
		heartRate: "",
		cigarettesPerDay: "",
		smokingStatus: "",
		cholesterolIntake: "",
		glucoseIntake: "",
		maritalStatus: "",
		pregnancies: "",
		workType: "",
		residenceType: "",
		diabetesHistory: "",
		chestPain: "",
	});

	const updateAnswer = (questionId, value) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: value,
		}));
	};

	const resetAnswers = () => {
		setAnswers({
			gender: "",
			age: "",
			height: "",
			weight: "",
			systolicBP: "",
			diastolicBP: "",
			heartRate: "",
			cigarettesPerDay: "",
			smokingStatus: "",
			cholesterolIntake: "",
			glucoseIntake: "",
			maritalStatus: "",
			pregnancies: "",
			workType: "",
			residenceType: "",
			diabetesHistory: "",
			chestPain: "",
		});
	};

	return (
		<QuestionnaireContext.Provider
			value={{ answers, updateAnswer, resetAnswers }}
		>
			{children}
		</QuestionnaireContext.Provider>
	);
};

export const useQuestionnaire = () => useContext(QuestionnaireContext);
