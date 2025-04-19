import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user is logged in
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setIsLoggedIn(false);
		navigate("/");
	};

	return (
		<nav className="bg-white shadow-md sticky top-0 z-50">
			<div className="container-custom py-4">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="flex items-center"
					>
						<Link to="/" className="text-primary font-bold text-2xl">
							MediMentor
						</Link>
					</motion.div>

					{/* Desktop Menu */}
					<div className="hidden md:flex space-x-8">
						<a
							href="#features"
							className="text-accent hover:text-primary transition-colors"
						>
							Features
						</a>
						<a
							href="#about"
							className="text-accent hover:text-primary transition-colors"
						>
							About Us
						</a>
						<a
							href="#contact"
							className="text-accent hover:text-primary transition-colors"
						>
							Contact
						</a>
					</div>

					{/* Auth Buttons */}
					<div className="hidden md:flex items-center space-x-4">
						{isLoggedIn ? (
							<>
								<Link
									to="/dashboard"
									className="text-accent hover:text-primary transition-colors font-medium"
								>
									Dashboard
								</Link>
								<button onClick={handleLogout} className="btn-primary">
									Sign Out
								</button>
							</>
						) : (
							<>
								<Link
									to="/signin"
									className="text-accent hover:text-primary transition-colors font-medium"
								>
									Sign In
								</Link>
								<Link to="/signup" className="btn-primary">
									Sign Up
								</Link>
							</>
						)}
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-accent focus:outline-none"
						>
							{isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="md:hidden py-4"
					>
						<div className="flex flex-col space-y-4">
							<a
								href="#features"
								className="text-accent hover:text-primary transition-colors"
							>
								Features
							</a>
							<a
								href="#about"
								className="text-accent hover:text-primary transition-colors"
							>
								About Us
							</a>
							<a
								href="#contact"
								className="text-accent hover:text-primary transition-colors"
							>
								Contact
							</a>
							<hr className="border-gray-200 my-2" />
							{isLoggedIn ? (
								<>
									<Link
										to="/dashboard"
										className="text-accent hover:text-primary transition-colors font-medium"
									>
										Dashboard
									</Link>
									<button
										onClick={handleLogout}
										className="btn-primary self-start"
									>
										Sign Out
									</button>
								</>
							) : (
								<>
									<Link
										to="/signin"
										className="text-accent hover:text-primary transition-colors font-medium self-start"
									>
										Sign In
									</Link>
									<Link to="/signup" className="btn-primary self-start">
										Sign Up
									</Link>
								</>
							)}
						</div>
					</motion.div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
