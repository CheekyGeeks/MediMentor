import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";
import {
	HiOutlineLogout,
	HiOutlineUser,
	HiOutlineHome,
	HiOutlineChatAlt,
	HiOutlineBookOpen,
	HiOutlineClipboardList,
	HiOutlineDocumentReport,
	HiOutlinePlay,
	HiOutlineChartBar,
	HiOutlineInformationCircle,
	HiOutlineMenuAlt2,
	HiOutlineX,
} from "react-icons/hi";

const Dashboard = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [predictions, setPredictions] = useState({
		diabetes: { risk: "Low", score: 15 },
		heart: { risk: "Good", score: 78 },
		hypertension: { risk: "Moderate", score: 45 },
		obesity: { risk: "Low", score: 20 },
		stroke: { risk: "Low", score: 12 },
	});
	const [recentSessions, setRecentSessions] = useState([
		{
			id: 1,
			title: "Discussing dietary recommendations",
			doctor: "AI Assistant",
			duration: "45min",
		},
		{
			id: 2,
			title: "Mental health check-in",
			doctor: "AI Assistant",
			duration: "37min",
		},
		{
			id: 3,
			title: "Sleep improvement strategies",
			doctor: "AI Assistant",
			duration: "28min",
		},
	]);

	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
			try {
				// Get basic user info from localStorage
				const user = JSON.parse(localStorage.getItem("user") || '{"name":"User"}');
				
				// Fetch questionnaire data from backend
				const response = await axiosInstance.get('/api/auth/questionnaire/latest/');
				
				// Combine user info with questionnaire data
				setUserData({
					...user,
					questionnaire: response.data
				});
				
				// In a real app, you would fetch predictions based on this data
				// For now, we're using mock data set in the state
				
			} catch (err) {
				console.error("Error fetching user data:", err);
				// If we can't get the questionnaire data, just use what's in localStorage
				const user = JSON.parse(localStorage.getItem("user") || '{"name":"User"}');
				setUserData(user);
				setError("Could not fetch your latest health data");
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	const handleLogout = () => {
		// Clear localStorage
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("user");
		navigate("/");
	};

	// Extract BMI calculation
	const calculateBMI = (height, weight) => {
		if (!height || !weight) return "N/A";
		const bmi = weight / (height * height);
		return bmi.toFixed(1);
	};

	// Function to get BMI category
	const getBMICategory = (bmi) => {
		if (bmi === "N/A") return "N/A";
		const numBMI = parseFloat(bmi);
		if (numBMI < 18.5) return "Underweight";
		if (numBMI < 25) return "Healthy";
		if (numBMI < 30) return "Overweight";
		return "Obese";
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-secondary flex items-center justify-center">
				<div className="text-primary text-xl">Loading your dashboard...</div>
			</div>
		);
	}

	const questionnaire = userData?.questionnaire || {};
	const bmi = calculateBMI(questionnaire.height, questionnaire.weight);
	const bmiCategory = getBMICategory(bmi);

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Mobile menu button */}
			<button
				className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			>
				{isSidebarOpen ? (
					<HiOutlineX className="h-6 w-6 text-primary" />
				) : (
					<HiOutlineMenuAlt2 className="h-6 w-6 text-primary" />
				)}
			</button>

			{/* Sidebar */}
			<AnimatePresence>
				{isSidebarOpen && (
					<motion.div
						initial={{ x: -300 }}
						animate={{ x: 0 }}
						exit={{ x: -300 }}
						className="fixed md:static inset-y-0 left-0 w-64 bg-primary text-white flex flex-col shadow-lg z-40"
					>
						<div className="p-5 border-b border-primary-dark">
							<h2 className="text-2xl font-bold">MediMentor</h2>
						</div>

						<nav className="flex-1 overflow-y-auto py-4">
							<div className="px-4 py-2 text-primary-light text-sm">MAIN MENU</div>
							<a
								href="#"
								className="flex items-center px-6 py-3 text-white hover:bg-primary-dark"
							>
								<HiOutlineHome className="h-5 w-5 mr-3" />
								<span>Home</span>
							</a>
							<a
								href="#"
								className="flex items-center px-6 py-3 bg-primary-dark text-white"
							>
								<HiOutlineChartBar className="h-5 w-5 mr-3" />
								<span>Dashboard</span>
							</a>
							<a
								href="#"
								className="flex items-center px-6 py-3 text-white hover:bg-primary-dark"
							>
								<HiOutlineClipboardList className="h-5 w-5 mr-3" />
								<span>Health Records</span>
							</a>
							<a
								href="#"
								className="flex items-center px-6 py-3 text-white hover:bg-primary-dark"
							>
								<HiOutlineChatAlt className="h-5 w-5 mr-3" />
								<span>Chat with AI</span>
							</a>

							<div className="px-4 py-2 mt-6 text-primary-light text-sm">
								ACCOUNT
							</div>
							<a
								href="#"
								className="flex items-center px-6 py-3 text-white hover:bg-primary-dark"
							>
								<HiOutlineUser className="h-5 w-5 mr-3" />
								<span>Profile</span>
							</a>
							<button
								onClick={handleLogout}
								className="flex items-center px-6 py-3 text-white hover:bg-primary-dark w-full text-left"
							>
								<HiOutlineLogout className="h-5 w-5 mr-3" />
								<span>Logout</span>
							</button>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main content */}
			<div className="flex-1 overflow-y-auto">
				<div className="p-6 md:p-10 max-w-7xl mx-auto">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
						<div>
							<h1 className="text-2xl md:text-3xl font-bold text-gray-800">
								Hello, {userData?.name || "User"}
							</h1>
							<p className="text-gray-600 mt-1">
								Here's your health overview for today.
							</p>
						</div>
						{error && (
							<div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mt-2 md:mt-0">
								{error}
							</div>
						)}
					</div>

					{/* Health stats */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
						<div className="bg-white p-6 rounded-xl shadow-sm">
							<div className="flex justify-between items-start">
								<div>
									<p className="text-sm text-gray-500">BMI</p>
									<h3 className="text-2xl font-bold text-gray-800 mt-1">
										{bmi}
									</h3>
									<p className="text-xs text-gray-500 mt-1">
										{bmiCategory}
									</p>
								</div>
								<span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
									{questionnaire.gender || "N/A"}
								</span>
							</div>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-sm">
							<div className="flex justify-between items-start">
								<div>
									<p className="text-sm text-gray-500">Blood Pressure</p>
									<h3 className="text-2xl font-bold text-gray-800 mt-1">
										{questionnaire.systolicBP || "N/A"}/{questionnaire.diastolicBP || "N/A"}
									</h3>
									<p className="text-xs text-gray-500 mt-1">mmHg</p>
								</div>
								<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
									{questionnaire.systolicBP && questionnaire.diastolicBP && questionnaire.systolicBP < 120 && questionnaire.diastolicBP < 80
										? "Normal"
										: questionnaire.systolicBP && questionnaire.diastolicBP && questionnaire.systolicBP < 130 && questionnaire.diastolicBP < 80
										? "Elevated"
										: "High"}
								</span>
							</div>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-sm">
							<div className="flex justify-between items-start">
								<div>
									<p className="text-sm text-gray-500">Heart Rate</p>
									<h3 className="text-2xl font-bold text-gray-800 mt-1">
										{questionnaire.heartRate || "N/A"}
									</h3>
									<p className="text-xs text-gray-500 mt-1">bpm</p>
								</div>
								<span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
									{questionnaire.heartRate && questionnaire.heartRate < 60
										? "Low"
										: questionnaire.heartRate && questionnaire.heartRate > 100
										? "High"
										: "Normal"}
								</span>
							</div>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-sm">
							<div className="flex justify-between items-start">
								<div>
									<p className="text-sm text-gray-500">Age</p>
									<h3 className="text-2xl font-bold text-gray-800 mt-1">
										{questionnaire.age || "N/A"}
									</h3>
									<p className="text-xs text-gray-500 mt-1">years</p>
								</div>
							</div>
						</div>
					</div>

					{/* Risk predictions */}
					<div className="mb-8">
						<h2 className="text-xl font-bold text-gray-800 mb-4">
							Health Risk Assessment
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{Object.entries(predictions).map(([key, value]) => (
								<div key={key} className="bg-white p-6 rounded-xl shadow-sm">
									<div className="flex items-center mb-4">
										<div
											className={`w-12 h-12 rounded-full flex items-center justify-center ${
												value.risk === "Low"
													? "bg-green-100 text-green-500"
													: value.risk === "Moderate"
													? "bg-yellow-100 text-yellow-500"
													: value.risk === "Good"
													? "bg-blue-100 text-blue-500"
													: "bg-red-100 text-red-500"
											}`}
										>
											<HiOutlineInformationCircle className="h-6 w-6" />
										</div>
										<div className="ml-4">
											<h3 className="font-semibold text-gray-800 capitalize">
												{key}
											</h3>
											<p
												className={`text-sm ${
													value.risk === "Low" || value.risk === "Good"
														? "text-green-500"
														: value.risk === "Moderate"
														? "text-yellow-500"
														: "text-red-500"
												}`}
											>
												{value.risk} risk
											</p>
										</div>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2.5">
										<div
											className={`h-2.5 rounded-full ${
												value.risk === "Low" || value.risk === "Good"
													? "bg-green-500"
													: value.risk === "Moderate"
													? "bg-yellow-500"
													: "bg-red-500"
											}`}
											style={{ width: `${100 - value.score}%` }}
										></div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Health summary */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
						<div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
							<h2 className="text-xl font-bold text-gray-800 mb-4">
								Health Summary
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
									<h3 className="text-gray-500 text-sm">Height</h3>
									<p className="font-semibold mt-1">
										{questionnaire.height ? `${questionnaire.height} m` : "N/A"}
									</p>
								</div>
								<div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
									<h3 className="text-gray-500 text-sm">Weight</h3>
									<p className="font-semibold mt-1">
										{questionnaire.weight ? `${questionnaire.weight} kg` : "N/A"}
									</p>
								</div>
								<div>
									<h3 className="text-gray-500 text-sm">Smoking Status</h3>
									<p className="font-semibold mt-1 capitalize">
										{questionnaire.smokingStatus || "N/A"}
									</p>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
								<div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
									<h3 className="text-gray-500 text-sm">Cholesterol</h3>
									<p className="font-semibold mt-1 capitalize">
										{questionnaire.cholesterolIntake || "N/A"}
									</p>
								</div>
								<div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
									<h3 className="text-gray-500 text-sm">Glucose</h3>
									<p className="font-semibold mt-1 capitalize">
										{questionnaire.glucoseIntake || "N/A"}
									</p>
								</div>
								<div>
									<h3 className="text-gray-500 text-sm">Diabetes History</h3>
									<p className="font-semibold mt-1 capitalize">
										{questionnaire.diabetesHistory || "N/A"}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-sm">
							<h2 className="text-xl font-bold text-gray-800 mb-4">Lifestyle</h2>
							<div className="space-y-4">
								<div>
									<h3 className="text-gray-500 text-sm">Work Type</h3>
									<p className="font-semibold mt-1 capitalize">
										{questionnaire.workType || "N/A"}
									</p>
								</div>
								<div>
									<h3 className="text-gray-500 text-sm">Residence Type</h3>
									<p className="font-semibold mt-1 capitalize">
										{questionnaire.residenceType || "N/A"}
									</p>
								</div>
								<div>
									<h3 className="text-gray-500 text-sm">Marital Status</h3>
									<p className="font-semibold mt-1 capitalize">
										{questionnaire.maritalStatus || "N/A"}
									</p>
								</div>
								<div>
									<h3 className="text-gray-500 text-sm">Cigarettes Per Day</h3>
									<p className="font-semibold mt-1">
										{questionnaire.cigarettesPerDay !== undefined && questionnaire.cigarettesPerDay !== null
											? questionnaire.cigarettesPerDay
											: "N/A"}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Recent sessions */}
					<div>
						<h2 className="text-xl font-bold text-gray-800 mb-4">
							Recent AI Sessions
						</h2>
						<div className="bg-white rounded-xl shadow-sm overflow-hidden">
							<div className="divide-y divide-gray-200">
								{recentSessions.map((session) => (
									<div
										key={session.id}
										className="p-6 hover:bg-gray-50 transition-colors duration-150 flex justify-between items-center"
									>
										<div>
											<h3 className="font-semibold text-gray-800">
												{session.title}
											</h3>
											<p className="text-sm text-gray-500 mt-1">
												{session.doctor} • {session.duration}
											</p>
										</div>
										<button className="text-primary hover:text-primary-dark">
											<HiOutlinePlay className="h-6 w-6" />
										</button>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
