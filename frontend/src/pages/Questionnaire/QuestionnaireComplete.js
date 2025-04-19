import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

const QuestionnaireComplete = () => {
	const { answers } = useQuestionnaire();
	const navigate = useNavigate();

	useEffect(() => {
		// Here you would typically send the data to your backend
		console.log("Questionnaire answers:", answers);

		// Set a flag in localStorage to indicate questionnaire is completed
		localStorage.setItem("questionnaireCompleted", "true");

		// Redirect to home page after 3 seconds
		const timer = setTimeout(() => {
			navigate("/");
		}, 3000);

		return () => clearTimeout(timer);
	}, [answers, navigate]);

	return (
		<div className="min-h-screen bg-secondary flex items-center justify-center p-4">
			<div className="bg-white rounded-3xl shadow-lg p-10 max-w-lg w-full text-center">
				<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 text-green-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>

				<h1 className="text-3xl font-bold text-accent mb-4">Thank You!</h1>
				<p className="text-accent/70 mb-6">
					Your health assessment has been completed successfully. We're now
					analyzing your data to provide personalized insights.
				</p>

				<div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
					<div className="bg-primary h-2.5 rounded-full w-full animate-pulse"></div>
				</div>

				<p className="text-sm text-accent/60">
					You'll be redirected to the home page automatically...
				</p>
			</div>
		</div>
	);
};

export default QuestionnaireComplete;
