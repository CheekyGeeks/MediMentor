import React from "react";
import { Link, useNavigate } from "react-router-dom";

const QuestionnaireLayout = ({
	step,
	totalSteps,
	question,
	description,
	children,
	onPrevious,
	onNext,
	canProceed = true,
}) => {
	const navigate = useNavigate();

	const handlePrevious = () => {
		if (onPrevious) {
			onPrevious();
		}
	};

	const handleNext = () => {
		if (onNext && canProceed) {
			onNext();
		}
	};

	const day = new Date()
		.toLocaleDateString("en-US", { weekday: "long" })
		.toLowerCase();

	return (
		<div className="min-h-screen bg-secondary flex items-center justify-center p-4">
			<div className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-6xl flex flex-col md:flex-row">
				{/* Left Side */}
				<div className="w-full md:w-2/5 bg-secondary p-10 flex flex-col">
					<Link
						to="/"
						className="flex items-center text-primary mb-16 hover:opacity-80 transition"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 19.5L8.25 12l7.5-7.5"
							/>
						</svg>
						Homepage
					</Link>

					<div className="mt-auto">
						<div className="text-primary/80 font-medium mb-2">
							step {step}/{totalSteps}
						</div>
						<h1 className="text-3xl font-bold text-primary mb-2">{question}</h1>
						{description && <p className="text-primary/70">{description}</p>}
					</div>

					<div className="mt-auto">
						<div className="text-primary/70 font-medium">{day}</div>
					</div>
				</div>

				{/* Right Side */}
				<div className="w-full md:w-3/5 p-10 bg-white flex flex-col">
					<div className="flex-grow flex flex-col justify-center">
						<div className="mb-10">
							<img
								src="https://i.ibb.co/f9vNVyd/health-illustration.png"
								alt="Illustration"
								className="w-full max-w-xs mx-auto"
								onError={(e) => {
									e.target.onerror = null;
									e.target.src = "https://placekitten.com/300/200"; // Fallback image
								}}
							/>
						</div>

						<div className="space-y-4">{children}</div>
					</div>

					<div className="mt-8 flex justify-between">
						<button
							onClick={handlePrevious}
							className="px-6 py-2 border border-primary/30 text-primary rounded-md hover:bg-primary/5 transition"
						>
							Previous
						</button>
						<button
							onClick={handleNext}
							disabled={!canProceed}
							className={`px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition ${
								!canProceed ? "opacity-50 cursor-not-allowed" : ""
							}`}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionnaireLayout;
