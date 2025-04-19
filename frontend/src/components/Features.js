import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
	HiOutlineChartBar,
	HiOutlineUserGroup,
	HiOutlineChatAlt2,
	HiOutlineHeart,
} from "react-icons/hi";

const featureItems = [
	{
		icon: <HiOutlineChartBar className="w-10 h-10 text-primary" />,
		title: "Disease Risk Assessment",
		description:
			"AI-powered analysis of your lifestyle data to assess risk for diabetes, hypertension, and heart disease.",
	},
	{
		icon: <HiOutlineChatAlt2 className="w-10 h-10 text-primary" />,
		title: "Mood & Stress Journaling",
		description:
			"Track your emotional well-being and identify patterns that impact your health.",
	},
	{
		icon: <HiOutlineUserGroup className="w-10 h-10 text-primary" />,
		title: "Voice Assistant Support",
		description:
			"Interact with your health coach using natural voice commands for a hands-free experience.",
	},
	{
		icon: <HiOutlineHeart className="w-10 h-10 text-primary" />,
		title: "Personalized Recommendations",
		description:
			"Get tailored lifestyle suggestions to improve your daily habits and reduce health risks.",
	},
];

const Features = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.5 },
		},
	};

	return (
		<section id="features" className="py-20 bg-white">
			<div className="container-custom">
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-primary font-semibold">FEATURES</h2>
						<h3 className="text-3xl md:text-4xl font-bold text-accent mt-2">
							Your AI-Powered Health Companion
						</h3>
						<p className="text-accent/70 mt-4 max-w-2xl mx-auto">
							MediMentor combines advanced AI with health expertise to provide a
							personalized experience that helps you stay on top of your health
							goals.
						</p>
					</motion.div>
				</div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{featureItems.map((feature, index) => (
						<motion.div
							key={index}
							className="bg-secondary rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
							variants={itemVariants}
						>
							<div className="mb-4">{feature.icon}</div>
							<h4 className="text-xl font-semibold text-accent mb-2">
								{feature.title}
							</h4>
							<p className="text-accent/70">{feature.description}</p>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					className="mt-16 bg-primary/5 p-8 rounded-2xl border border-primary/20"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<div className="flex flex-col md:flex-row md:items-center justify-between">
						<div className="mb-6 md:mb-0">
							<h4 className="text-2xl font-bold text-accent">
								Ready to take control of your health?
							</h4>
							<p className="text-accent/70 mt-2">
								Sign up for MediMentor and start your journey today.
							</p>
						</div>
						<Link
							to="/signup"
							className="btn-primary text-base px-8 py-3 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 inline-block"
						>
							Start Now
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Features;
