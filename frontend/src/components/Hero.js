import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
	HiOutlineDeviceMobile,
	HiOutlineChartBar,
	HiOutlineAnnotation,
} from "react-icons/hi";
import medicalTeamImage from "../assets/images/medical-team.jpg";

const Hero = () => {
	return (
		<section className="pt-20 pb-20 bg-secondary">
			<div className="container-custom">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					{/* Left Column - Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="flex items-center text-primary mb-4">
							<span className="text-sm font-semibold bg-blue-100 py-1 px-3 rounded-full">
								AI-POWERED HEALTH ASSISTANT
							</span>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-6">
							MediMentor
						</h1>

						<h2 className="text-2xl md:text-3xl text-accent/80 font-light mb-8">
							Your Smart Lifestyle Coach
						</h2>

						<p className="text-lg text-accent/70 mb-8">
							Personalized AI health assistant that assesses lifestyle disease
							risks and provides actionable insights to improve your daily
							habits.
						</p>

						<div>
							<Link
								to="/signup"
								className="btn-primary text-base px-10 py-3 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 inline-block"
							>
								Start Now
							</Link>
						</div>

						<div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
							<div className="flex items-center text-accent/70 gap-2">
								<HiOutlineDeviceMobile className="text-primary" size={20} />
								<span>Access Anywhere</span>
							</div>
							<div className="flex items-center text-accent/70 gap-2">
								<HiOutlineChartBar className="text-primary" size={20} />
								<span>Data-Driven</span>
							</div>
							<div className="flex items-center text-accent/70 gap-2">
								<HiOutlineAnnotation className="text-primary" size={20} />
								<span>24/7 Support</span>
							</div>
						</div>
					</motion.div>

					{/* Right Column - Image */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="relative"
					>
						<div className="relative z-10 bg-white p-6 rounded-3xl shadow-xl">
							<div className="absolute -right-3 -top-3 bg-primary text-white text-sm font-medium py-1 px-3 rounded-full">
								15 min setup
							</div>
							<img
								src={medicalTeamImage}
								alt="Medical Team"
								className="w-full h-auto rounded-2xl"
							/>
							<div className="mt-6">
								<h3 className="text-xl font-bold text-accent">
									Expert Medical Team
								</h3>
								<p className="text-accent/70 mt-2">
									Our AI is backed by healthcare professionals to provide
									accurate health insights
								</p>
							</div>
						</div>

						<div className="absolute bg-primary/10 w-full h-full rounded-3xl -top-6 -right-6 z-0"></div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
