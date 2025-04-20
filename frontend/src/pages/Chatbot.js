import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
	HiOutlineArrowLeft,
	HiOutlineChartBar,
	HiOutlinePaperAirplane,
	HiOutlineMicrophone,
	HiOutlineCamera,
	HiOutlineDocumentText,
	HiOutlinePlus,
	HiOutlineInformationCircle,
	HiOutlineEmojiHappy,
	HiOutlineSparkles,
	HiOutlineLightningBolt,
	HiOutlineHeart,
	HiOutlineX,
} from "react-icons/hi";

const ChatMessage = ({ message, isUser }) => {
	return (
		<motion.div
			className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			{!isUser && (
				<div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex-shrink-0 mr-2 flex items-center justify-center shadow-md">
					<HiOutlineSparkles className="text-white" size={14} />
				</div>
			)}
			<div
				className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
					isUser
						? "bg-gradient-to-r from-primary to-primary/80 text-white rounded-tr-none"
						: "bg-white text-gray-800 rounded-tl-none"
				}`}
			>
				<p className={`${isUser ? "text-white" : "text-gray-800"}`}>
					{message.text}
				</p>
			</div>
			{isUser && (
				<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex-shrink-0 ml-2 flex items-center justify-center shadow-md">
					<HiOutlineHeart className="text-white" size={14} />
				</div>
			)}
		</motion.div>
	);
};

// Voice Recording Animation Component
const VoiceRecordingAnimation = ({ onCancel }) => {
	return (
		<motion.div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className="bg-white rounded-2xl p-8 flex flex-col items-center max-w-md w-full mx-4"
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0.9 }}
			>
				<h3 className="text-lg font-semibold text-gray-800 mb-6">
					Listening...
				</h3>

				<div className="relative mb-8">
					{/* Microphone Icon with Pulsing Rings */}
					<div className="relative">
						{[1, 2, 3].map((ring) => (
							<motion.div
								key={ring}
								className="absolute rounded-full border border-primary/60"
								initial={{ width: 60, height: 60, opacity: 0 }}
								animate={{
									width: [60, 120],
									height: [60, 120],
									opacity: [0.7, 0],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									delay: ring * 0.5,
									ease: "easeOut",
								}}
								style={{
									top: "50%",
									left: "50%",
									x: "-50%",
									y: "-50%",
								}}
							/>
						))}

						<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10 relative shadow-md">
							<HiOutlineMicrophone className="text-white" size={28} />
						</div>
					</div>
				</div>

				{/* Sound Wave Visualization */}
				<div className="flex items-center space-x-1 mb-8">
					{[...Array(14)].map((_, i) => (
						<motion.div
							key={i}
							className="w-1 bg-primary rounded-full"
							animate={{
								height: [8, 24, 8],
							}}
							transition={{
								duration: 0.8,
								repeat: Infinity,
								delay: i * 0.05,
								repeatType: "reverse",
							}}
						/>
					))}
				</div>

				<button
					onClick={onCancel}
					className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-full transition-colors flex items-center"
				>
					<HiOutlineX className="mr-1" />
					Cancel
				</button>
			</motion.div>
		</motion.div>
	);
};

const Chatbot = () => {
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [inputText, setInputText] = useState("");
	const endOfMessagesRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isRecording, setIsRecording] = useState(false);

	const welcomeMessage = {
		text: "Hello! I'm your AI Health Assistant. I can help you with health advice, lifestyle recommendations, and answer questions about your health metrics. How can I assist you today?",
	};

	useEffect(() => {
		// Add welcome message when component mounts
		setTimeout(() => {
			setMessages([
				{
					text: welcomeMessage.text,
					isUser: false,
				},
			]);
		}, 500);
	}, []);

	useEffect(() => {
		// Scroll to bottom when messages change
		scrollToBottom();
	}, [messages]);

	const scrollToBottom = () => {
		endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (!inputText.trim() || isLoading) return;

		// Add user message
		const newMessages = [...messages, { text: inputText, isUser: true }];
		setMessages(newMessages);
		setInputText("");

		// Simulate bot thinking
		setIsLoading(true);

		// Simulate bot response after a delay
		setTimeout(() => {
			botResponse(inputText);
			setIsLoading(false);
		}, 1000);
	};

	const handleMicrophoneClick = () => {
		setIsRecording(true);

		// Simulate voice recording for 5 seconds then auto-cancel
		// In a real app, you would implement actual voice recognition here
		setTimeout(() => {
			setIsRecording(false);

			// Simulate a transcribed message
			const transcribedText =
				"I'd like some advice on improving my sleep quality";
			setInputText(transcribedText);

			// Auto-submit the transcribed message
			setTimeout(() => {
				const newMessages = [
					...messages,
					{ text: transcribedText, isUser: true },
				];
				setMessages(newMessages);
				setInputText("");

				// Simulate bot thinking
				setIsLoading(true);

				// Simulate bot response
				setTimeout(() => {
					sendBotResponse(
						"For better sleep quality, I recommend establishing a regular sleep schedule, avoiding screens before bedtime, creating a comfortable sleep environment, limiting caffeine and alcohol, and practicing relaxation techniques like deep breathing or meditation. Would you like me to elaborate on any of these?"
					);
					setIsLoading(false);
				}, 1000);
			}, 500);
		}, 5000);
	};

	const botResponse = (userInput) => {
		let response;

		// Simple response logic
		const input = userInput.toLowerCase();
		if (input.includes("hello") || input.includes("hi")) {
			response = "Hello! How can I assist with your health today?";
		} else if (input.includes("diabetes")) {
			response =
				"Diabetes is a chronic condition that affects how your body processes blood sugar. Would you like tips for managing diabetes?";
		} else if (input.includes("heart") || input.includes("cardiac")) {
			response =
				"Heart health is crucial for overall wellbeing. Regular exercise, a balanced diet, and stress management are key factors.";
		} else if (input.includes("diet") || input.includes("nutrition")) {
			response =
				"A balanced diet rich in fruits, vegetables, lean proteins, and whole grains is recommended for optimal health.";
		} else {
			response =
				"I understand you're asking about your health. Could you provide more specific details about what you'd like to know?";
		}

		sendBotResponse(response);
	};

	const sendBotResponse = (text) => {
		setMessages((prev) => [...prev, { text, isUser: false }]);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
			{/* Voice Recording Modal */}
			<AnimatePresence>
				{isRecording && (
					<VoiceRecordingAnimation onCancel={() => setIsRecording(false)} />
				)}
			</AnimatePresence>

			{/* Header */}
			<motion.header
				className="bg-white shadow-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="container-custom py-4 flex justify-between items-center">
					<div className="flex items-center gap-3">
						<button
							onClick={() => navigate("/dashboard")}
							className="text-primary hover:text-primary/80 transition-colors p-2 rounded-full hover:bg-primary/5"
						>
							<HiOutlineArrowLeft size={20} />
						</button>
						<div>
							<h1 className="text-xl font-bold text-gray-800">
								AI Health Assistant
							</h1>
							<p className="text-xs text-gray-500">Powered by MediMentor</p>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<button className="p-2 text-primary bg-primary/5 rounded-full hover:bg-primary/10 transition-colors">
							<HiOutlineChartBar size={20} />
						</button>
						<button className="p-2 text-primary bg-primary/5 rounded-full hover:bg-primary/10 transition-colors">
							<HiOutlineInformationCircle size={20} />
						</button>
					</div>
				</div>
			</motion.header>

			{/* Chat Container */}
			<div className="container-custom py-6">
				<motion.div
					className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{/* Chat Messages */}
					<div
						className="h-[calc(100vh-180px)] overflow-y-auto p-6"
						style={{
							backgroundImage:
								"url('https://www.transparenttextures.com/patterns/cubes.png')",
							backgroundColor: "#fcfcfc",
						}}
					>
						{messages.map((message, index) => (
							<ChatMessage
								key={index}
								message={message}
								isUser={message.isUser}
							/>
						))}
						{isLoading && (
							<div className="flex justify-start mb-4">
								<div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex-shrink-0 mr-2 flex items-center justify-center shadow-md">
									<HiOutlineSparkles className="text-white" size={14} />
								</div>
								<div className="bg-white text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
									<div className="flex space-x-2">
										<div
											className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
											style={{ animationDelay: "0ms" }}
										></div>
										<div
											className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
											style={{ animationDelay: "150ms" }}
										></div>
										<div
											className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
											style={{ animationDelay: "300ms" }}
										></div>
									</div>
								</div>
							</div>
						)}
						<div ref={endOfMessagesRef} />
					</div>

					{/* Input Area */}
					<div className="p-4 border-t border-gray-100 bg-white">
						<form
							onSubmit={handleSendMessage}
							className="flex items-center gap-2"
						>
							<div className="flex-1 relative">
								<input
									type="text"
									value={inputText}
									onChange={(e) => setInputText(e.target.value)}
									placeholder="Ask me anything about your health..."
									className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30 border border-gray-100"
								/>
								<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
									<button
										type="button"
										className="text-gray-400 hover:text-primary p-1"
										onClick={handleMicrophoneClick}
									>
										<HiOutlineMicrophone size={20} />
									</button>
								</div>
							</div>
							<button
								type="submit"
								disabled={!inputText.trim() || isLoading}
								className={`p-3 rounded-full shadow-md ${
									inputText.trim() && !isLoading
										? "bg-gradient-to-r from-primary to-primary/80 text-white"
										: "bg-gray-200 text-gray-500"
								}`}
							>
								<HiOutlinePaperAirplane className="h-5 w-5 transform rotate-90" />
							</button>
						</form>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Chatbot;
