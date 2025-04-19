import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import {
	Gender,
	Age,
	Height,
	Weight,
	SystolicBP,
	DiastolicBP,
	HeartRate,
	CigarettesPerDay,
	SmokingStatus,
	CholesterolIntake,
	GlucoseIntake,
	MaritalStatus,
	Pregnancies,
	WorkType,
	ResidenceType,
	DiabetesHistory,
	ChestPain,
	QuestionnaireComplete,
} from "./pages/Questionnaire";

// Context
import { QuestionnaireProvider } from "./context/QuestionnaireContext";

function App() {
	return (
		<QuestionnaireProvider>
			<Router>
				<Routes>
					{/* Public routes */}
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />

					{/* Questionnaire routes */}
					<Route path="/questionnaire/gender" element={<Gender />} />
					<Route path="/questionnaire/age" element={<Age />} />
					<Route path="/questionnaire/height" element={<Height />} />
					<Route path="/questionnaire/weight" element={<Weight />} />
					<Route path="/questionnaire/systolic-bp" element={<SystolicBP />} />
					<Route path="/questionnaire/diastolic-bp" element={<DiastolicBP />} />
					<Route path="/questionnaire/heart-rate" element={<HeartRate />} />
					<Route
						path="/questionnaire/cigarettes"
						element={<CigarettesPerDay />}
					/>
					<Route
						path="/questionnaire/smoking-status"
						element={<SmokingStatus />}
					/>
					<Route
						path="/questionnaire/cholesterol"
						element={<CholesterolIntake />}
					/>
					<Route path="/questionnaire/glucose" element={<GlucoseIntake />} />
					<Route
						path="/questionnaire/marital-status"
						element={<MaritalStatus />}
					/>
					<Route path="/questionnaire/pregnancies" element={<Pregnancies />} />
					<Route path="/questionnaire/work-type" element={<WorkType />} />
					<Route path="/questionnaire/residence" element={<ResidenceType />} />
					<Route
						path="/questionnaire/diabetes-history"
						element={<DiabetesHistory />}
					/>
					<Route path="/questionnaire/chest-pain" element={<ChestPain />} />
					<Route
						path="/questionnaire/complete"
						element={<QuestionnaireComplete />}
					/>

					{/* Protected dashboard route */}
					<Route
						path="/dashboard"
						element={
							localStorage.getItem("token") ? (
								<Dashboard />
							) : (
								<Navigate to="/signin" />
							)
						}
					/>

					{/* Fallback route */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</QuestionnaireProvider>
	);
}

export default App;
