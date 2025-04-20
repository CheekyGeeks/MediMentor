import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuestionnaire } from "../context/QuestionnaireContext";
import QuestionnaireLayout from "../components/questionnaire/QuestionnaireLayout";
import RadioOption from "../components/questionnaire/RadioOption";
import NumberInput from "../components/questionnaire/NumberInput";

// The main Questionnaire component that manages all steps
const Questionnaire = () => {
	const { answers, updateAnswer, resetAnswers } = useQuestionnaire();
	const navigate = useNavigate();
	const location = useLocation();

	// Extract the current step from the path
	const pathParts = location.pathname.split("/");
	const currentStep = pathParts[pathParts.length - 1];

	// Function to navigate to next step based on current step
	const goToNext = () => {
		const routes = {
			gender: "/questionnaire/age",
			age: "/questionnaire/height",
			height: "/questionnaire/weight",
			weight: "/questionnaire/systolic-bp",
			"systolic-bp": "/questionnaire/diastolic-bp",
			"diastolic-bp": "/questionnaire/heart-rate",
			"heart-rate": "/questionnaire/cigarettes",
			cigarettes: "/questionnaire/smoking-status",
			"smoking-status": "/questionnaire/cholesterol",
			cholesterol: "/questionnaire/glucose",
			glucose: "/questionnaire/marital-status",
			"marital-status": "/questionnaire/pregnancies",
			pregnancies: "/questionnaire/work-type",
			"work-type": "/questionnaire/residence",
			residence: "/questionnaire/diabetes-history",
			"diabetes-history": "/questionnaire/chest-pain",
			"chest-pain": "/questionnaire/complete",
		};

		navigate(routes[currentStep] || "/dashboard");
	};

	// Function to navigate to previous step based on current step
	const goToPrevious = () => {
		const prevRoutes = {
			age: "/questionnaire/gender",
			height: "/questionnaire/age",
			weight: "/questionnaire/height",
			"systolic-bp": "/questionnaire/weight",
			"diastolic-bp": "/questionnaire/systolic-bp",
			"heart-rate": "/questionnaire/diastolic-bp",
			cigarettes: "/questionnaire/heart-rate",
			"smoking-status": "/questionnaire/cigarettes",
			cholesterol: "/questionnaire/smoking-status",
			glucose: "/questionnaire/cholesterol",
			"marital-status": "/questionnaire/glucose",
			pregnancies: "/questionnaire/marital-status",
			"work-type": "/questionnaire/pregnancies",
			residence: "/questionnaire/work-type",
			"diabetes-history": "/questionnaire/residence",
			"chest-pain": "/questionnaire/diabetes-history",
			complete: "/questionnaire/chest-pain",
		};

		navigate(prevRoutes[currentStep] || "/signup");
	};

	// Determine if the user can proceed to the next step
	const canProceed = () => {
		switch (currentStep) {
			case "gender":
				return !!answers.gender;
			case "age":
				return !!answers.age && answers.age > 0;
			case "height":
				return !!answers.height && answers.height > 0;
			case "weight":
				return !!answers.weight && answers.weight > 0;
			case "systolic-bp":
				return !!answers.systolicBP && answers.systolicBP > 0;
			case "diastolic-bp":
				return !!answers.diastolicBP && answers.diastolicBP > 0;
			case "heart-rate":
				return !!answers.heartRate && answers.heartRate > 0;
			case "cigarettes":
				return answers.cigarettesPerDay !== undefined;
			case "smoking-status":
				return !!answers.smokingStatus;
			case "cholesterol":
				return !!answers.cholesterolIntake;
			case "glucose":
				return !!answers.glucoseIntake;
			case "marital-status":
				return !!answers.maritalStatus;
			case "pregnancies":
				return answers.pregnancies !== undefined;
			case "work-type":
				return !!answers.workType;
			case "residence":
				return !!answers.residenceType;
			case "diabetes-history":
				return answers.diabetesHistory !== undefined;
			case "chest-pain":
				return !!answers.chestPain;
			default:
				return true;
		}
	};

	// Step-specific render functions
	const renderGender = () => (
		<QuestionnaireLayout
			step={1}
			totalSteps={17}
			question="What is your gender?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="gender-male"
				name="gender"
				value="male"
				label="Male"
				selectedValue={answers.gender}
				onChange={(value) => updateAnswer("gender", value)}
			/>
			<RadioOption
				id="gender-female"
				name="gender"
				value="female"
				label="Female"
				selectedValue={answers.gender}
				onChange={(value) => updateAnswer("gender", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderAge = () => (
		<QuestionnaireLayout
			step={2}
			totalSteps={17}
			question="How old are you?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<NumberInput
				id="age"
				label="Enter your age"
				value={answers.age}
				onChange={(value) => updateAnswer("age", value)}
				placeholder="Enter your age"
				unit="years"
				min={1}
				max={120}
			/>
		</QuestionnaireLayout>
	);

	const renderHeight = () => (
		<QuestionnaireLayout
			step={3}
			totalSteps={17}
			question="What is your height in meters?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<NumberInput
				id="height"
				label="Enter your height"
				value={answers.height}
				onChange={(value) => updateAnswer("height", value)}
				placeholder="e.g., 1.75"
				unit="m"
				min={0.5}
				max={3}
			/>
		</QuestionnaireLayout>
	);

	const renderWeight = () => (
		<QuestionnaireLayout
			step={4}
			totalSteps={17}
			question="What is your weight in kilograms?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<NumberInput
				id="weight"
				label="Enter your weight"
				value={answers.weight}
				onChange={(value) => updateAnswer("weight", value)}
				placeholder="e.g., 70"
				unit="kg"
				min={20}
				max={300}
			/>
		</QuestionnaireLayout>
	);

	const renderSystolicBP = () => (
		<QuestionnaireLayout
			step={5}
			totalSteps={17}
			question="What is your systolic blood pressure?"
			description="Systolic pressure is the top number in a blood pressure reading."
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<NumberInput
				id="systolicBP"
				label="Enter your systolic blood pressure"
				value={answers.systolicBP}
				onChange={(value) => updateAnswer("systolicBP", value)}
				placeholder="e.g., 120"
				unit="mmHg"
				min={70}
				max={250}
			/>
		</QuestionnaireLayout>
	);

	const renderDiastolicBP = () => (
		<QuestionnaireLayout
			step={6}
			totalSteps={17}
			question="What is your diastolic blood pressure?"
			description="Diastolic pressure is the bottom number in a blood pressure reading."
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<NumberInput
				id="diastolicBP"
				label="Enter your diastolic blood pressure"
				value={answers.diastolicBP}
				onChange={(value) => updateAnswer("diastolicBP", value)}
				placeholder="e.g., 80"
				unit="mmHg"
				min={40}
				max={150}
			/>
		</QuestionnaireLayout>
	);

	const renderHeartRate = () => (
		<QuestionnaireLayout
			step={7}
			totalSteps={17}
			question="What is your resting heart rate?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<NumberInput
				id="heartRate"
				label="Enter your heart rate"
				value={answers.heartRate}
				onChange={(value) => updateAnswer("heartRate", value)}
				placeholder="e.g., 72"
				unit="bpm"
				min={40}
				max={200}
			/>
		</QuestionnaireLayout>
	);

	const renderCigarettesPerDay = () => (
		<QuestionnaireLayout
			step={8}
			totalSteps={17}
			question="How many cigarettes do you smoke per day?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<NumberInput
				id="cigarettesPerDay"
				label="Enter number of cigarettes"
				value={answers.cigarettesPerDay}
				onChange={(value) => updateAnswer("cigarettesPerDay", value)}
				placeholder="Enter 0 if you don't smoke"
				unit="per day"
				min={0}
				max={100}
			/>
		</QuestionnaireLayout>
	);

	const renderSmokingStatus = () => (
		<QuestionnaireLayout
			step={9}
			totalSteps={17}
			question="What is your smoking status?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="smoking-never"
				name="smokingStatus"
				value="never"
				label="Never smoked"
				selectedValue={answers.smokingStatus}
				onChange={(value) => updateAnswer("smokingStatus", value)}
			/>
			<RadioOption
				id="smoking-former"
				name="smokingStatus"
				value="former"
				label="Former smoker"
				selectedValue={answers.smokingStatus}
				onChange={(value) => updateAnswer("smokingStatus", value)}
			/>
			<RadioOption
				id="smoking-current"
				name="smokingStatus"
				value="current"
				label="Current smoker"
				selectedValue={answers.smokingStatus}
				onChange={(value) => updateAnswer("smokingStatus", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderCholesterolIntake = () => (
		<QuestionnaireLayout
			step={10}
			totalSteps={17}
			question="How would you rate your cholesterol intake?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="cholesterol-low"
				name="cholesterolIntake"
				value="low"
				label="Low (healthy diet with minimal animal fats)"
				selectedValue={answers.cholesterolIntake}
				onChange={(value) => updateAnswer("cholesterolIntake", value)}
			/>
			<RadioOption
				id="cholesterol-moderate"
				name="cholesterolIntake"
				value="moderate"
				label="Moderate (balanced diet with some animal products)"
				selectedValue={answers.cholesterolIntake}
				onChange={(value) => updateAnswer("cholesterolIntake", value)}
			/>
			<RadioOption
				id="cholesterol-high"
				name="cholesterolIntake"
				value="high"
				label="High (regular consumption of fatty meats, dairy, eggs)"
				selectedValue={answers.cholesterolIntake}
				onChange={(value) => updateAnswer("cholesterolIntake", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderGlucoseIntake = () => (
		<QuestionnaireLayout
			step={11}
			totalSteps={17}
			question="How would you rate your glucose/sugar intake?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="glucose-low"
				name="glucoseIntake"
				value="low"
				label="Low (minimal added sugars, few sweet foods)"
				selectedValue={answers.glucoseIntake}
				onChange={(value) => updateAnswer("glucoseIntake", value)}
			/>
			<RadioOption
				id="glucose-moderate"
				name="glucoseIntake"
				value="moderate"
				label="Moderate (some sweets and sugary foods/drinks)"
				selectedValue={answers.glucoseIntake}
				onChange={(value) => updateAnswer("glucoseIntake", value)}
			/>
			<RadioOption
				id="glucose-high"
				name="glucoseIntake"
				value="high"
				label="High (regular sodas, desserts, candies, etc.)"
				selectedValue={answers.glucoseIntake}
				onChange={(value) => updateAnswer("glucoseIntake", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderMaritalStatus = () => (
		<QuestionnaireLayout
			step={12}
			totalSteps={17}
			question="What is your marital status?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="marital-single"
				name="maritalStatus"
				value="single"
				label="Single"
				selectedValue={answers.maritalStatus}
				onChange={(value) => updateAnswer("maritalStatus", value)}
			/>
			<RadioOption
				id="marital-married"
				name="maritalStatus"
				value="married"
				label="Married"
				selectedValue={answers.maritalStatus}
				onChange={(value) => updateAnswer("maritalStatus", value)}
			/>
			<RadioOption
				id="marital-widowed"
				name="maritalStatus"
				value="widowed"
				label="Widowed"
				selectedValue={answers.maritalStatus}
				onChange={(value) => updateAnswer("maritalStatus", value)}
			/>
			<RadioOption
				id="marital-divorced"
				name="maritalStatus"
				value="divorced"
				label="Divorced"
				selectedValue={answers.maritalStatus}
				onChange={(value) => updateAnswer("maritalStatus", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderPregnancies = () => (
		<QuestionnaireLayout
			step={13}
			totalSteps={17}
			question="If applicable, how many pregnancies have you had?"
			description="Enter 0 if not applicable or if you've never been pregnant."
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<NumberInput
				id="pregnancies"
				label="Number of pregnancies"
				value={answers.pregnancies}
				onChange={(value) => updateAnswer("pregnancies", value)}
				placeholder="Enter number"
				min={0}
				max={20}
			/>
		</QuestionnaireLayout>
	);

	const renderWorkType = () => (
		<QuestionnaireLayout
			step={14}
			totalSteps={17}
			question="What type of work do you do?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="work-private"
				name="workType"
				value="private"
				label="Private sector employee"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
			<RadioOption
				id="work-self-employed"
				name="workType"
				value="self-employed"
				label="Self-employed"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
			<RadioOption
				id="work-government"
				name="workType"
				value="government"
				label="Government job"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
			<RadioOption
				id="work-student"
				name="workType"
				value="student"
				label="Student"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
			<RadioOption
				id="work-homemaker"
				name="workType"
				value="homemaker"
				label="Homemaker"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
			<RadioOption
				id="work-retired"
				name="workType"
				value="retired"
				label="Retired"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
			<RadioOption
				id="work-unemployed"
				name="workType"
				value="unemployed"
				label="Unemployed"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderResidenceType = () => (
		<QuestionnaireLayout
			step={15}
			totalSteps={17}
			question="What is your residence type?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="residence-urban"
				name="residenceType"
				value="urban"
				label="Urban"
				selectedValue={answers.residenceType}
				onChange={(value) => updateAnswer("residenceType", value)}
			/>
			<RadioOption
				id="residence-rural"
				name="residenceType"
				value="rural"
				label="Rural"
				selectedValue={answers.residenceType}
				onChange={(value) => updateAnswer("residenceType", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderDiabetesHistory = () => (
		<QuestionnaireLayout
			step={16}
			totalSteps={17}
			question="Do you have a history of diabetes?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="diabetes-yes"
				name="diabetesHistory"
				value={true}
				label="Yes"
				selectedValue={answers.diabetesHistory}
				onChange={(value) => updateAnswer("diabetesHistory", value)}
			/>
			<RadioOption
				id="diabetes-no"
				name="diabetesHistory"
				value={false}
				label="No"
				selectedValue={answers.diabetesHistory}
				onChange={(value) => updateAnswer("diabetesHistory", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderChestPain = () => (
		<QuestionnaireLayout
			step={17}
			totalSteps={17}
			question="Do you experience chest pain or discomfort?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="chest-pain-none"
				name="chestPain"
				value="none"
				label="None"
				selectedValue={answers.chestPain}
				onChange={(value) => updateAnswer("chestPain", value)}
			/>
			<RadioOption
				id="chest-pain-typical-angina"
				name="chestPain"
				value="typical_angina"
				label="Typical Angina"
				selectedValue={answers.chestPain}
				onChange={(value) => updateAnswer("chestPain", value)}
			/>
			<RadioOption
				id="chest-pain-atypical-angina"
				name="chestPain"
				value="atypical_angina"
				label="Atypical Angina"
				selectedValue={answers.chestPain}
				onChange={(value) => updateAnswer("chestPain", value)}
			/>
			<RadioOption
				id="chest-pain-non-anginal"
				name="chestPain"
				value="non_anginal_pain"
				label="Non-anginal Pain"
				selectedValue={answers.chestPain}
				onChange={(value) => updateAnswer("chestPain", value)}
			/>
		</QuestionnaireLayout>
	);

	// Switch between different questionnaire steps based on the URL
	const renderStep = () => {
		switch (currentStep) {
			case "gender":
				return renderGender();
			case "age":
				return renderAge();
			case "height":
				return renderHeight();
			case "weight":
				return renderWeight();
			case "systolic-bp":
				return renderSystolicBP();
			case "diastolic-bp":
				return renderDiastolicBP();
			case "heart-rate":
				return renderHeartRate();
			case "cigarettes":
				return renderCigarettesPerDay();
			case "smoking-status":
				return renderSmokingStatus();
			case "cholesterol":
				return renderCholesterolIntake();
			case "glucose":
				return renderGlucoseIntake();
			case "marital-status":
				return renderMaritalStatus();
			case "pregnancies":
				return renderPregnancies();
			case "work-type":
				return renderWorkType();
			case "residence":
				return renderResidenceType();
			case "diabetes-history":
				return renderDiabetesHistory();
			case "chest-pain":
				return renderChestPain();
			case "complete":
				return <QuestionnaireCompleteScreen />;
			default:
				return <div>Invalid questionnaire step</div>;
		}
	};

	return renderStep();
};

// Create a separate component for QuestionnaireComplete screen
const QuestionnaireCompleteScreen = () => {
	const { answers } = useQuestionnaire();
	const navigate = useNavigate();

	useEffect(() => {
		// Here you would typically send the data to your backend
		console.log("Questionnaire answers:", answers);

		// Set a flag in localStorage to indicate questionnaire is completed
		localStorage.setItem("questionnaireCompleted", "true");

		// Update the user data with questionnaire answers
		try {
			const userData = JSON.parse(localStorage.getItem("user") || "{}");
			userData.questionnaire = answers;
			localStorage.setItem("user", JSON.stringify(userData));
		} catch (error) {
			console.error("Error updating user data:", error);
		}

		// Make sure the token is set for authentication persistence
		if (!localStorage.getItem("token")) {
			console.log("Setting token because it was missing");
			localStorage.setItem("token", "mock-jwt-token");
		}

		// Redirect to dashboard after a short delay
		const timer = setTimeout(() => {
			// Force a refresh of the token before redirecting
			const currentToken = localStorage.getItem("token");
			localStorage.removeItem("token");
			localStorage.setItem("token", currentToken || "mock-jwt-token");

			console.log("Redirecting to dashboard...");
			navigate("/Dashboard");
		}, 3000);

		return () => clearTimeout(timer);
	}, [answers, navigate]);

	return (
		<div className="min-h-screen bg-secondary flex items-center justify-center p-4">
			<div className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-md p-8 text-center">
				<div className="mb-6">
					<div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-12 w-12 text-primary"
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
				</div>
				<h2 className="text-2xl font-bold text-accent mb-2">
					Questionnaire Complete!
				</h2>
				<p className="text-accent/70 mb-6">
					Thank you for completing the health questionnaire. Your responses have
					been saved.
				</p>
				<p className="text-accent/70 mb-2">Redirecting to your dashboard...</p>
				<div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
					<div className="bg-primary h-full rounded-full animate-pulse"></div>
				</div>
			</div>
		</div>
	);
};

// Export individual components for direct import
export const Gender = () => <Questionnaire />;
export const Age = () => <Questionnaire />;
export const Height = () => <Questionnaire />;
export const Weight = () => <Questionnaire />;
export const SystolicBP = () => <Questionnaire />;
export const DiastolicBP = () => <Questionnaire />;
export const HeartRate = () => <Questionnaire />;
export const CigarettesPerDay = () => <Questionnaire />;
export const SmokingStatus = () => <Questionnaire />;
export const CholesterolIntake = () => <Questionnaire />;
export const GlucoseIntake = () => <Questionnaire />;
export const MaritalStatus = () => <Questionnaire />;
export const Pregnancies = () => <Questionnaire />;
export const WorkType = () => <Questionnaire />;
export const ResidenceType = () => <Questionnaire />;
export const DiabetesHistory = () => <Questionnaire />;
export const ChestPain = () => <Questionnaire />;
export const QuestionnaireComplete = () => <Questionnaire />;

export default Questionnaire;
