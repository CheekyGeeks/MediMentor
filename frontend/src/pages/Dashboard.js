import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
		// Get user data from localStorage
		const user = JSON.parse(localStorage.getItem("user") || '{"name":"User"}');
		// Get questionnaire answers
		const questionnaire = user.questionnaire || {};
		setUserData({ ...user, questionnaire });

		// In a real app, you would fetch predictions from the backend here
		// For now, we're using mock data set in the state
	}, []);

	const handleLogout = () => {
		// Clear localStorage
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/");
	};

	// Helper function to determine prediction color
	const getPredictionColor = (risk) => {
		return risk === "Low"
			? "text-green-500"
			: risk === "Good"
			? "text-green-500"
			: risk === "Moderate"
			? "text-yellow-500"
			: "text-red-500";
	};

	// Animation variants for staggered children
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	// Sidebar animation variants
	const sidebarVariants = {
		open: {
			x: 0,
			width: "auto",
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 30,
			},
		},
		closed: {
			x: "-100%",
			width: 0,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 30,
				delay: 0.2,
			},
		},
	};

	const sidebarContentVariants = {
		open: {
			opacity: 1,
			transition: { delay: 0.2 },
		},
		closed: {
			opacity: 0,
			transition: { duration: 0.1 },
		},
	};

	return (
		<div className="min-h-screen bg-secondary relative">
			{/* Toggle Button */}
			<motion.button
				className="fixed top-20 left-4 z-50 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				{isSidebarOpen ? (
					<HiOutlineX size={24} />
				) : (
					<HiOutlineMenuAlt2 size={24} />
				)}
			</motion.button>

			{/* Header */}
			<motion.header
				className="bg-white shadow-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="container-custom py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold text-primary">MediMentor</h1>
					<div className="flex items-center gap-4">
						<div className="text-accent">
							Welcome, {userData?.name || "User"}
						</div>
						<button
							onClick={handleLogout}
							className="flex items-center gap-2 text-accent/70 hover:text-primary transition-colors"
						>
							<HiOutlineLogout size={20} />
							<span>Logout</span>
						</button>
					</div>
				</div>
			</motion.header>

			<div className="flex">
				{/* Floating Sidebar */}
				<AnimatePresence>
					{isSidebarOpen && (
						<motion.div
							className="fixed top-24 left-4 bottom-4 z-40 bg-white rounded-xl shadow-lg overflow-hidden max-w-[250px]"
							variants={sidebarVariants}
							initial="closed"
							animate="open"
							exit="closed"
						>
							<motion.div
								className="h-full p-6 overflow-y-auto"
								variants={sidebarContentVariants}
							>
								<h2 className="text-lg font-medium text-accent mb-4">
									Navigation
								</h2>
								<ul className="space-y-2">
									<li>
										<a
											href="#"
											className="flex items-center gap-3 p-2 text-primary bg-primary/5 rounded-md"
										>
											<HiOutlineHome size={20} />
											<span>Dashboard</span>
										</a>
									</li>
									<li>
										<a
											href="#"
											className="flex items-center gap-3 p-2 text-accent/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
										>
											<HiOutlineUser size={20} />
											<span>Profile</span>
										</a>
									</li>
									<li>
										<a
											href="#"
											className="flex items-center gap-3 p-2 text-accent/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
										>
											<HiOutlineChatAlt size={20} />
											<span>AI Chatbot</span>
										</a>
									</li>
									<li>
										<a
											href="#"
											className="flex items-center gap-3 p-2 text-accent/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
										>
											<HiOutlineBookOpen size={20} />
											<span>Daily Journal</span>
										</a>
									</li>
									<li>
										<a
											href="#"
											className="flex items-center gap-3 p-2 text-accent/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
										>
											<HiOutlineClipboardList size={20} />
											<span>Diet Plan</span>
										</a>
									</li>
									<li>
										<a
											href="#"
											className="flex items-center gap-3 p-2 text-accent/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
										>
											<HiOutlineChartBar size={20} />
											<span>Health Analytics</span>
										</a>
									</li>
								</ul>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Dashboard Content */}
				<motion.div
					className={`container-custom py-10 transition-all duration-300 ${
						isSidebarOpen ? "ml-0 md:ml-56" : "ml-0"
					}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
				>
					{/* User Profile Section */}
					<motion.div
						className="bg-white rounded-xl shadow-sm p-6 mb-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<div className="flex items-center mb-4">
							<div className="flex-shrink-0 mr-4">
								<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
									<HiOutlineUser className="text-primary" size={28} />
								</div>
							</div>
							<div>
								<h2 className="text-2xl font-semibold text-accent">
									{userData?.name || "User Profile"}
								</h2>
								<p className="text-accent/70">
									{userData?.email || "No email provided"}
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
							<div className="bg-gray-50 p-4 rounded-lg">
								<h3 className="text-sm font-medium text-accent/70 mb-2 flex items-center">
									<HiOutlineInformationCircle className="mr-1" size={16} />
									Basic Information
								</h3>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-accent/70">Gender:</span>
										<span className="font-medium">
											{userData?.questionnaire?.gender || "N/A"}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-accent/70">Age:</span>
										<span className="font-medium">
											{userData?.questionnaire?.age || "N/A"} years
										</span>
									</div>
								</div>
							</div>

							<div className="bg-gray-50 p-4 rounded-lg">
								<h3 className="text-sm font-medium text-accent/70 mb-2 flex items-center">
									<HiOutlineInformationCircle className="mr-1" size={16} />
									Body Metrics
								</h3>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-accent/70">Height:</span>
										<span className="font-medium">
											{userData?.questionnaire?.height || "N/A"} m
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-accent/70">Weight:</span>
										<span className="font-medium">
											{userData?.questionnaire?.weight || "N/A"} kg
										</span>
									</div>
								</div>
							</div>

							<div className="bg-gray-50 p-4 rounded-lg">
								<h3 className="text-sm font-medium text-accent/70 mb-2 flex items-center">
									<HiOutlineInformationCircle className="mr-1" size={16} />
									Vital Signs
								</h3>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-accent/70">Blood Pressure:</span>
										<span className="font-medium">
											{userData?.questionnaire?.systolicBP || "N/A"}/
											{userData?.questionnaire?.diastolicBP || "N/A"}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-accent/70">Heart Rate:</span>
										<span className="font-medium">
											{userData?.questionnaire?.heartRate || "N/A"} bpm
										</span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Health Predictions */}
					<motion.div
						className="bg-white rounded-xl shadow-sm p-6 mb-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<h2 className="text-2xl font-semibold text-accent mb-4 flex items-center">
							<HiOutlineChartBar className="mr-2" size={24} />
							Your Health Predictions
						</h2>
						<p className="text-accent/70 mb-6">
							Based on your health profile, our AI models have generated these
							predictions. Note that these are only estimates and should not
							replace medical advice.
						</p>

						<motion.div
							className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
							variants={containerVariants}
							initial="hidden"
							animate="show"
						>
							<motion.div
								variants={itemVariants}
								className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
							>
								<h3 className="text-lg font-medium text-accent mb-2">
									Diabetes Risk
								</h3>
								<p
									className={`text-3xl font-bold ${getPredictionColor(
										predictions.diabetes.risk
									)}`}
								>
									{predictions.diabetes.risk}
								</p>
								<div className="w-full bg-white/50 rounded-full h-2.5 mt-4">
									<div
										className="bg-primary h-2.5 rounded-full"
										style={{ width: `${predictions.diabetes.score}%` }}
									></div>
								</div>
								<p className="text-accent/70 text-sm mt-2">
									Based on your BMI, diet, and family history
								</p>
							</motion.div>

							<motion.div
								variants={itemVariants}
								className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
							>
								<h3 className="text-lg font-medium text-accent mb-2">
									Heart Risk
								</h3>
								<p
									className={`text-3xl font-bold ${getPredictionColor(
										predictions.heart.risk
									)}`}
								>
									{predictions.heart.risk}
								</p>
								<div className="w-full bg-white/50 rounded-full h-2.5 mt-4">
									<div
										className="bg-primary h-2.5 rounded-full"
										style={{ width: `${predictions.heart.score}%` }}
									></div>
								</div>
								<p className="text-accent/70 text-sm mt-2">
									Based on your blood pressure, activity, and lifestyle
								</p>
							</motion.div>

							<motion.div
								variants={itemVariants}
								className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
							>
								<h3 className="text-lg font-medium text-accent mb-2">
									Hypertension Risk
								</h3>
								<p
									className={`text-3xl font-bold ${getPredictionColor(
										predictions.hypertension.risk
									)}`}
								>
									{predictions.hypertension.risk}
								</p>
								<div className="w-full bg-white/50 rounded-full h-2.5 mt-4">
									<div
										className="bg-primary h-2.5 rounded-full"
										style={{ width: `${predictions.hypertension.score}%` }}
									></div>
								</div>
								<p className="text-accent/70 text-sm mt-2">
									Based on your blood pressure readings and lifestyle
								</p>
							</motion.div>
						</motion.div>

						<motion.div
							className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
							variants={containerVariants}
							initial="hidden"
							animate="show"
							transition={{ delay: 0.3 }}
						>
							<motion.div
								variants={itemVariants}
								className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
							>
								<h3 className="text-lg font-medium text-accent mb-2">
									Obesity Risk
								</h3>
								<p
									className={`text-3xl font-bold ${getPredictionColor(
										predictions.obesity.risk
									)}`}
								>
									{predictions.obesity.risk}
								</p>
								<div className="w-full bg-white/50 rounded-full h-2.5 mt-4">
									<div
										className="bg-primary h-2.5 rounded-full"
										style={{ width: `${predictions.obesity.score}%` }}
									></div>
								</div>
								<p className="text-accent/70 text-sm mt-2">
									Based on your BMI, diet, and physical activity
								</p>
							</motion.div>

							<motion.div
								variants={itemVariants}
								className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
							>
								<h3 className="text-lg font-medium text-accent mb-2">
									Stroke Risk
								</h3>
								<p
									className={`text-3xl font-bold ${getPredictionColor(
										predictions.stroke.risk
									)}`}
								>
									{predictions.stroke.risk}
								</p>
								<div className="w-full bg-white/50 rounded-full h-2.5 mt-4">
									<div
										className="bg-primary h-2.5 rounded-full"
										style={{ width: `${predictions.stroke.score}%` }}
									></div>
								</div>
								<p className="text-accent/70 text-sm mt-2">
									Based on your blood pressure, smoking status, and family
									history
								</p>
							</motion.div>
						</motion.div>
					</motion.div>

					{/* Recent Chat Sessions */}
					<motion.div
						className="bg-white rounded-xl shadow-sm p-6 mb-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						<h2 className="text-xl font-semibold text-accent mb-4 flex items-center">
							<HiOutlineChatAlt className="mr-2" size={24} />
							Records of recent chat sessions
						</h2>
						<p className="text-accent/70 text-sm mb-6">
							View or replay your recent conversations with our AI health
							assistant
						</p>

						<motion.div
							className="space-y-4"
							variants={containerVariants}
							initial="hidden"
							animate="show"
						>
							{recentSessions.map((session) => (
								<motion.div
									key={session.id}
									className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
									variants={itemVariants}
								>
									<div className="flex-shrink-0 mr-4">
										<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
											<HiOutlineChatAlt className="text-primary" size={16} />
										</div>
									</div>
									<div className="flex-grow">
										<h4 className="font-medium">{session.title}</h4>
										<p className="text-sm text-accent/70">
											{session.doctor} • {session.duration}
										</p>
									</div>
									<div>
										<button className="text-primary hover:text-primary/80 transition-colors">
											<HiOutlinePlay size={20} />
										</button>
									</div>
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default Dashboard;
