import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout, HiOutlineUser, HiOutlineHome } from "react-icons/hi";

const Dashboard = () => {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user") || '{"name":"User"}');

	const handleLogout = () => {
		// Clear localStorage
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/");
	};

	return (
		<div className="min-h-screen bg-secondary">
			{/* Header */}
			<header className="bg-white shadow-md">
				<div className="container-custom py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold text-primary">MediMentor</h1>
					<div className="flex items-center gap-4">
						<div className="text-accent">Welcome, {user?.name || "User"}</div>
						<button
							onClick={handleLogout}
							className="flex items-center gap-2 text-accent/70 hover:text-primary transition-colors"
						>
							<HiOutlineLogout size={20} />
							<span>Logout</span>
						</button>
					</div>
				</div>
			</header>

			{/* Dashboard Content */}
			<div className="container-custom py-10">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* Sidebar */}
					<div className="bg-white rounded-xl shadow-sm p-6">
						<h2 className="text-lg font-medium text-accent mb-4">Navigation</h2>
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
						</ul>
					</div>

					{/* Main Content */}
					<div className="col-span-3">
						<div className="bg-white rounded-xl shadow-sm p-6 mb-6">
							<h2 className="text-2xl font-semibold text-accent mb-4">
								Your Health Dashboard
							</h2>
							<p className="text-accent/70 mb-6">
								Welcome to MediMentor! Your AI-powered health assistant is ready
								to help you track and improve your health metrics.
							</p>

							<div className="bg-primary/5 p-4 rounded-lg">
								<p className="text-primary font-medium">
									Complete your health profile to get personalized
									recommendations.
								</p>
							</div>
						</div>

						{/* Health Metrics */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="bg-white rounded-xl shadow-sm p-6">
								<h3 className="text-lg font-medium text-accent mb-2">
									Diabetes Risk
								</h3>
								<p className="text-3xl font-bold text-green-500">Low</p>
								<p className="text-accent/70 text-sm mt-2">
									Based on your current lifestyle data
								</p>
							</div>

							<div className="bg-white rounded-xl shadow-sm p-6">
								<h3 className="text-lg font-medium text-accent mb-2">
									Heart Health
								</h3>
								<p className="text-3xl font-bold text-green-500">Good</p>
								<p className="text-accent/70 text-sm mt-2">
									Continue your healthy habits
								</p>
							</div>

							<div className="bg-white rounded-xl shadow-sm p-6">
								<h3 className="text-lg font-medium text-accent mb-2">
									Stress Level
								</h3>
								<p className="text-3xl font-bold text-yellow-500">Moderate</p>
								<p className="text-accent/70 text-sm mt-2">
									Try our relaxation exercises
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
