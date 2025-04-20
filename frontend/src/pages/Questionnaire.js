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

	// Skip pregnancies question if user is male
	useEffect(() => {
		if (currentStep === "pregnancies" && answers.gender === "male") {
			// Auto set pregnancies to 0 for males and skip to next question
			updateAnswer("pregnancies", 0);
			navigate("/questionnaire/work-type");
		}
	}, [currentStep, answers.gender, navigate, updateAnswer]);

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
			"work-type":
				answers.gender === "male"
					? "/questionnaire/marital-status"
					: "/questionnaire/pregnancies",
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
				return (
					answers.cigarettesPerDay !== undefined &&
					answers.cigarettesPerDay >= 0
				);
			case "smoking-status":
				return !!answers.smokingStatus;
			case "cholesterol":
				return !!answers.cholesterolIntake;
			case "glucose":
				return !!answers.glucoseIntake;
			case "marital-status":
				return !!answers.maritalStatus;
			case "pregnancies":
				return answers.pregnancies !== undefined && answers.pregnancies >= 0;
			case "work-type":
				return !!answers.workType;
			case "residence":
				return !!answers.residenceType;
			case "diabetes-history":
				return !!answers.diabetesHistory;
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
			question="What is your average systolic blood pressure (the top number)?"
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
				max={230}
			/>
		</QuestionnaireLayout>
	);

	const renderDiastolicBP = () => (
		<QuestionnaireLayout
			step={6}
			totalSteps={17}
			question="What is your average diastolic blood pressure (the bottom number)?"
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
				max={140}
			/>
		</QuestionnaireLayout>
	);

	const renderHeartRate = () => (
		<QuestionnaireLayout
			step={7}
			totalSteps={17}
			question="What is your resting heart rate (beats per minute)?"
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

	const renderCigarettesPerDay = () => {
		// Skip cigarette question if work type is "child"
		if (answers.workType === "child") {
			updateAnswer("cigarettesPerDay", 0);
			updateAnswer("smokingStatus", "never_smoked");
			goToNext();
			return null;
		}

		return (
			<QuestionnaireLayout
				step={8}
				totalSteps={17}
				question="How many cigarettes do you smoke per day on average?"
				onPrevious={goToPrevious}
				onNext={goToNext}
				canProceed={canProceed()}
			>
				<NumberInput
					id="cigarettesPerDay"
					label="Enter number of cigarettes"
					value={answers.cigarettesPerDay}
					onChange={(value) => updateAnswer("cigarettesPerDay", value)}
					placeholder="If none, enter 0"
					unit="per day"
					min={0}
					max={100}
				/>
			</QuestionnaireLayout>
		);
	};

	const renderSmokingStatus = () => {
		// Skip smoking status if work type is "child"
		if (answers.workType === "child") {
			goToNext();
			return null;
		}

		return (
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
					value="never_smoked"
					label="Never smoked"
					selectedValue={answers.smokingStatus}
					onChange={(value) => updateAnswer("smokingStatus", value)}
				/>
				<RadioOption
					id="smoking-former"
					name="smokingStatus"
					value="formerly_smoked"
					label="Formerly smoked"
					selectedValue={answers.smokingStatus}
					onChange={(value) => updateAnswer("smokingStatus", value)}
				/>
				<RadioOption
					id="smoking-current"
					name="smokingStatus"
					value="smokes"
					label="Smokes"
					selectedValue={answers.smokingStatus}
					onChange={(value) => updateAnswer("smokingStatus", value)}
				/>
			</QuestionnaireLayout>
		);
	};

	const renderCholesterolIntake = () => (
		<QuestionnaireLayout
			step={10}
			totalSteps={17}
			question="How would you describe your daily cholesterol intake?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="cholesterol-low"
				name="cholesterolIntake"
				value="low_intake"
				label="Low intake"
				selectedValue={answers.cholesterolIntake}
				onChange={(value) => updateAnswer("cholesterolIntake", value)}
			/>
			<RadioOption
				id="cholesterol-moderate"
				name="cholesterolIntake"
				value="moderate_intake"
				label="Moderate intake"
				selectedValue={answers.cholesterolIntake}
				onChange={(value) => updateAnswer("cholesterolIntake", value)}
			/>
			<RadioOption
				id="cholesterol-high"
				name="cholesterolIntake"
				value="high_intake"
				label="High intake"
				selectedValue={answers.cholesterolIntake}
				onChange={(value) => updateAnswer("cholesterolIntake", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderGlucoseIntake = () => (
		<QuestionnaireLayout
			step={11}
			totalSteps={17}
			question="How would you describe your daily glucose or carbohydrate intake?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="glucose-low"
				name="glucoseIntake"
				value="low_intake"
				label="Low intake"
				selectedValue={answers.glucoseIntake}
				onChange={(value) => updateAnswer("glucoseIntake", value)}
			/>
			<RadioOption
				id="glucose-moderate"
				name="glucoseIntake"
				value="moderate_intake"
				label="Moderate intake"
				selectedValue={answers.glucoseIntake}
				onChange={(value) => updateAnswer("glucoseIntake", value)}
			/>
			<RadioOption
				id="glucose-high"
				name="glucoseIntake"
				value="high_intake"
				label="High intake"
				selectedValue={answers.glucoseIntake}
				onChange={(value) => updateAnswer("glucoseIntake", value)}
			/>
			<RadioOption
				id="glucose-very-high"
				name="glucoseIntake"
				value="very_high_intake"
				label="Very high intake"
				selectedValue={answers.glucoseIntake}
				onChange={(value) => updateAnswer("glucoseIntake", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderMaritalStatus = () => (
		<QuestionnaireLayout
			step={12}
			totalSteps={17}
			question="Have you ever been married?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="marital-yes"
				name="maritalStatus"
				value="yes"
				label="Yes"
				selectedValue={answers.maritalStatus}
				onChange={(value) => updateAnswer("maritalStatus", value)}
			/>
			<RadioOption
				id="marital-no"
				name="maritalStatus"
				value="no"
				label="No"
				selectedValue={answers.maritalStatus}
				onChange={(value) => updateAnswer("maritalStatus", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderPregnancies = () => {
		// Only show for females
		if (answers.gender === "male") {
			return null;
		}

		return (
			<QuestionnaireLayout
				step={13}
				totalSteps={17}
				question="How many times have you been pregnant?"
				description="Enter 0 if you've never been pregnant."
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
	};

	const renderWorkType = () => (
		<QuestionnaireLayout
			step={14}
			totalSteps={17}
			question="What best describes your current work type?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="work-child"
				name="workType"
				value="child"
				label="Child"
				selectedValue={answers.workType}
				onChange={(value) => {
					updateAnswer("workType", value);
					// If child is selected, auto-set smoking related fields
					if (value === "child") {
						updateAnswer("cigarettesPerDay", 0);
						updateAnswer("smokingStatus", "never_smoked");
						updateAnswer("chestPain", "no");
					}
				}}
			/>
			<RadioOption
				id="work-never"
				name="workType"
				value="never_worked"
				label="Never worked"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
			<RadioOption
				id="work-self-employed"
				name="workType"
				value="self_employed"
				label="Self-employed"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
			<RadioOption
				id="work-govt"
				name="workType"
				value="govt_job"
				label="Government job"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
			<RadioOption
				id="work-private"
				name="workType"
				value="private"
				label="Private job"
				selectedValue={answers.workType}
				onChange={(value) => updateAnswer("workType", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderResidenceType = () => (
		<QuestionnaireLayout
			step={15}
			totalSteps={17}
			question="Do you live in an urban or rural area?"
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
			question="Do you have a family history of diabetes?"
			onPrevious={goToPrevious}
			onNext={goToNext}
			canProceed={canProceed()}
		>
			<RadioOption
				id="diabetes-none"
				name="diabetesHistory"
				value="no_history"
				label="No history"
				selectedValue={answers.diabetesHistory}
				onChange={(value) => updateAnswer("diabetesHistory", value)}
			/>
			<RadioOption
				id="diabetes-low"
				name="diabetesHistory"
				value="low_history"
				label="Low history"
				selectedValue={answers.diabetesHistory}
				onChange={(value) => updateAnswer("diabetesHistory", value)}
			/>
			<RadioOption
				id="diabetes-moderate"
				name="diabetesHistory"
				value="moderate_history"
				label="Moderate history"
				selectedValue={answers.diabetesHistory}
				onChange={(value) => updateAnswer("diabetesHistory", value)}
			/>
			<RadioOption
				id="diabetes-high"
				name="diabetesHistory"
				value="high_history"
				label="High history"
				selectedValue={answers.diabetesHistory}
				onChange={(value) => updateAnswer("diabetesHistory", value)}
			/>
		</QuestionnaireLayout>
	);

	const renderChestPain = () => {
		// Skip chest pain question if work type is "child"
		if (answers.workType === "child") {
			updateAnswer("chestPain", "no");
			goToNext();
			return null;
		}

		return (
			<QuestionnaireLayout
				step={17}
				totalSteps={17}
				question="Do you experience chest pain during exercise?"
				onPrevious={goToPrevious}
				onNext={goToNext}
				canProceed={canProceed()}
			>
				<RadioOption
					id="chest-yes"
					name="chestPain"
					value="yes"
					label="Yes"
					selectedValue={answers.chestPain}
					onChange={(value) => updateAnswer("chestPain", value)}
				/>
				<RadioOption
					id="chest-no"
					name="chestPain"
					value="no"
					label="No"
					selectedValue={answers.chestPain}
					onChange={(value) => updateAnswer("chestPain", value)}
				/>
			</QuestionnaireLayout>
		);
	};

	// Function to render the appropriate step
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
				return null;
		}
	};

	return renderStep();
};

// Summary screen shown when questionnaire is complete
const QuestionnaireCompleteScreen = () => {
	const navigate = useNavigate();
	const { answers } = useQuestionnaire();

	// Store the questionnaire data in localStorage
	useEffect(() => {
		try {
			// Get the existing user data from localStorage
			const existingUserData = JSON.parse(localStorage.getItem("user") || "{}");

			// Add the questionnaire answers to the user data
			const updatedUserData = {
				...existingUserData,
				questionnaire: answers,
			};

			// Save the updated user data back to localStorage
			localStorage.setItem("user", JSON.stringify(updatedUserData));
		} catch (error) {
			console.error("Error saving questionnaire data:", error);
		}
	}, [answers]);

	return (
		<div className="min-h-screen bg-secondary flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
				<div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 text-primary"
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
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					Questionnaire Complete!
				</h1>
				<p className="text-gray-600 mb-8">
					Thank you for providing your health information. Your personalized
					health predictions are now ready.
				</p>
				<button
					onClick={() => navigate("/dashboard")}
					className="bg-primary text-white font-semibold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors w-full"
				>
					Go to Dashboard
				</button>
			</div>
		</div>
	);
};

// Export individual steps as components
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
