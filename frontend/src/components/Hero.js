import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
	HiOutlineDeviceMobile,
	HiOutlineChartBar,
	HiOutlineAnnotation,
} from "react-icons/hi";

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

						<div className="mt-10 grid grid-cols-2 gap-4">
							<div className="flex items-start gap-2">
								<HiOutlineDeviceMobile className="text-primary text-xl mt-1" />
								<p className="text-accent/80">Voice assistant support</p>
							</div>
							<div className="flex items-start gap-2">
								<HiOutlineChartBar className="text-primary text-xl mt-1" />
								<p className="text-accent/80">Risk assessment</p>
							</div>
							<div className="flex items-start gap-2">
								<HiOutlineAnnotation className="text-primary text-xl mt-1" />
								<p className="text-accent/80">Mood journaling</p>
							</div>
							<div className="flex items-start gap-2">
								<svg
									className="text-primary mt-1 w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
								<p className="text-accent/80">Quick lifestyle tips</p>
							</div>
						</div>
					</motion.div>

					{/* Right Column - App Preview */}
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
								src="https://placehold.co/600x400/E6F1FF/0075FF?text=MediMentor+App"
								alt="MediMentor Dashboard"
								className="w-full h-auto rounded-2xl"
							/>
							<div className="mt-6">
								<h3 className="text-xl font-bold text-accent">
									Personalized Health Dashboard
								</h3>
								<p className="text-accent/70 mt-2">
									Track your health metrics and get personalized recommendations
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
