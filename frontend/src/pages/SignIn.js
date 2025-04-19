import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const API_URL = "http://localhost:8000";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			// Real login using Django backend
			const response = await axios.post(`${API_URL}/api/auth/login/`, {
				email,
				password
			});
			
			// Store the tokens and user data
			localStorage.setItem("token", response.data.access);
			localStorage.setItem("refreshToken", response.data.refresh);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			
			// Redirect to dashboard after successful login
			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.error || "Invalid email or password");
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex bg-secondary">
			{/* Left Side - Image */}
			<div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden rounded-r-3xl">
				<div className="absolute inset-0 z-0 bg-gradient-to-br from-black to-black/70"></div>
				<div className="absolute inset-0 flex items-center justify-center z-10">
					<div className="transform -rotate-12">
						{[...Array(5)].map((_, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: { delay: 0.1 * index, duration: 0.5 },
								}}
								className="h-48 w-16 bg-primary/80 my-8 rounded-b-3xl shadow-[0_0_15px_rgba(0,117,255,0.7)]"
								style={{
									transformOrigin: "top center",
									marginLeft: `${index * 15}px`,
								}}
							/>
						))}
					</div>
				</div>

				<div className="absolute bottom-10 left-10 text-white z-20">
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.5 }}
						className="text-3xl font-bold"
					>
						MediMentor
					</motion.h3>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1, duration: 0.5 }}
						className="text-white/70"
					>
						Your smart lifestyle coach
					</motion.p>
				</div>
			</div>

			{/* Right Side - Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8">
				<div className="w-full max-w-md">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="text-3xl font-bold text-accent mb-1">
							Welcome back
						</h1>
						<p className="text-accent/70 mb-8">Please enter your details</p>

						{error && (
							<div className="bg-red-50 text-red-500 p-3 rounded-md mb-5">
								{error}
							</div>
						)}

						<form onSubmit={handleSubmit}>
							<div className="mb-5">
								<label
									htmlFor="email"
									className="block text-accent font-medium mb-2"
								>
									E-mail
								</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your e-mail"
									className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
									required
								/>
							</div>

							<div className="mb-5">
								<label
									htmlFor="password"
									className="block text-accent font-medium mb-2"
								>
									Password
								</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••••"
									className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
									required
								/>
							</div>

							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center">
									<input
										type="checkbox"
										id="remember"
										checked={rememberMe}
										onChange={() => setRememberMe(!rememberMe)}
										className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
									/>
									<label
										htmlFor="remember"
										className="ml-2 text-sm text-accent/70"
									>
										Remember me
									</label>
								</div>
								<a
									href="/forgot-password"
									className="text-sm text-primary hover:text-primary/80"
								>
									Forgot the password?
								</a>
							</div>

							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-black text-white font-medium py-3 rounded-md hover:bg-black/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black/30 focus:ring-offset-2 mb-4"
							>
								{isLoading ? "Signing in..." : "Log in"}
							</button>

							<p className="text-center text-accent/70 text-sm">
								Don't have an account?{" "}
								<a
									href="/signin"
									className="text-primary hover:text-primary/80"
								>
									Register here
								</a>
							</p>
						</form>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
