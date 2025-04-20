import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
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

// Protected route component
const ProtectedRoute = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const location = useLocation();

	useEffect(() => {
		// Check for token in localStorage
		const token = localStorage.getItem("token");
		setIsAuthenticated(!!token);
		setLoading(false);
	}, [location]);

	if (loading) {
		return (
			<div className="min-h-screen bg-secondary flex items-center justify-center">
				Loading...
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/signin" replace />;
	}

	return children;
};

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
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>

					{/* Protected chatbot route */}
					<Route
						path="/chatbot"
						element={
							<ProtectedRoute>
								<Chatbot />
							</ProtectedRoute>
						}
					/>

					{/* Fallback route */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Router>
		</QuestionnaireProvider>
	);
}

export default App;
