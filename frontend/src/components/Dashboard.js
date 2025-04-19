import React from "react";
import { motion } from "framer-motion";
import {
	HiOutlineChartPie,
	HiOutlineHeart,
	HiOutlineClock,
	HiOutlineChat,
	HiArrowSmRight,
} from "react-icons/hi";

const Dashboard = () => {
	return (
		<section id="dashboard" className="py-20 bg-secondary/50">
			<div className="container-custom">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left Column - Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-primary font-semibold">HEALTH DASHBOARD</h2>
						<h3 className="text-3xl md:text-4xl font-bold text-accent mt-2 mb-6">
							Monitor Your Health Metrics in Real-Time
						</h3>

						<p className="text-accent/70 mb-8">
							Our intuitive dashboard provides a comprehensive overview of your
							health status, risk assessments, and personalized recommendations
							to help you make informed decisions.
						</p>

						<div className="space-y-4">
							<div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
								<div className="bg-primary/10 p-2 rounded-md mr-4">
									<HiOutlineChartPie className="text-primary w-6 h-6" />
								</div>
								<div>
									<h4 className="font-semibold text-accent">
										Comprehensive Health Analysis
									</h4>
									<p className="text-accent/70 text-sm">
										AI-powered insights based on your daily activities and
										inputs
									</p>
								</div>
							</div>

							<div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
								<div className="bg-primary/10 p-2 rounded-md mr-4">
									<HiOutlineHeart className="text-primary w-6 h-6" />
								</div>
								<div>
									<h4 className="font-semibold text-accent">
										Lifestyle Disease Prevention
									</h4>
									<p className="text-accent/70 text-sm">
										Early detection and prevention strategies for diabetes,
										hypertension, and heart disease
									</p>
								</div>
							</div>

							<div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
								<div className="bg-primary/10 p-2 rounded-md mr-4">
									<HiOutlineClock className="text-primary w-6 h-6" />
								</div>
								<div>
									<h4 className="font-semibold text-accent">
										Progress Tracking
									</h4>
									<p className="text-accent/70 text-sm">
										Monitor your improvements and stay motivated with
										achievement badges
									</p>
								</div>
							</div>
						</div>

						<div className="mt-8">
							<a
								href="#"
								className="inline-flex items-center text-primary font-medium"
							>
								Explore all dashboard features{" "}
								<HiArrowSmRight className="ml-2" />
							</a>
						</div>
					</motion.div>

					{/* Right Column - Dashboard Mockup */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="relative"
					>
						<div className="bg-white p-6 rounded-3xl shadow-xl">
							<div className="bg-primary text-white p-4 rounded-2xl">
								<div className="flex justify-between items-center mb-4">
									<h4 className="font-semibold">Health Dashboard</h4>
									<div className="flex space-x-2">
										<div className="w-2 h-2 bg-white/30 rounded-full"></div>
										<div className="w-2 h-2 bg-white/30 rounded-full"></div>
										<div className="w-2 h-2 bg-white/30 rounded-full"></div>
									</div>
								</div>

								<div className="bg-white/10 rounded-xl p-4 mb-4">
									<div className="flex justify-between items-center">
										<div>
											<p className="text-white/70 text-sm">
												Current Health Score
											</p>
											<h5 className="text-2xl font-bold">86/100</h5>
										</div>
										<div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center">
											<span className="text-xl font-bold">86%</span>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-2">
									<div className="bg-white/10 rounded-lg p-2 text-center">
										<p className="text-xs text-white/70">Diabetes Risk</p>
										<p className="font-semibold">Low</p>
									</div>
									<div className="bg-white/10 rounded-lg p-2 text-center">
										<p className="text-xs text-white/70">Heart Risk</p>
										<p className="font-semibold">Low</p>
									</div>
									<div className="bg-white/10 rounded-lg p-2 text-center">
										<p className="text-xs text-white/70">BP Risk</p>
										<p className="font-semibold">Medium</p>
									</div>
								</div>
							</div>

							<div className="mt-6">
								<h4 className="font-semibold text-accent">
									Today's Recommendations
								</h4>

								<div className="mt-4 space-y-3">
									<div className="flex items-center p-3 border border-gray-100 rounded-lg">
										<div className="bg-blue-100 p-2 rounded-full mr-3">
											<HiOutlineHeart className="text-primary w-5 h-5" />
										</div>
										<div>
											<p className="text-accent text-sm font-medium">
												Take a 20-minute walk
											</p>
											<p className="text-xs text-accent/60">
												Helps lower your blood pressure
											</p>
										</div>
									</div>

									<div className="flex items-center p-3 border border-gray-100 rounded-lg">
										<div className="bg-blue-100 p-2 rounded-full mr-3">
											<HiOutlineChat className="text-primary w-5 h-5" />
										</div>
										<div>
											<p className="text-accent text-sm font-medium">
												Log your stress level
											</p>
											<p className="text-xs text-accent/60">
												Track your emotional wellbeing
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="absolute -z-10 bg-primary/5 w-full h-full rounded-3xl -bottom-6 -left-6"></div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
