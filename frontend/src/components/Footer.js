import React from "react";
import {
	HiOutlineMail,
	HiOutlinePhone,
	HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-white pt-16 pb-8">
			<div className="container-custom">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					{/* Column 1 - About */}
					<div id="about">
						<h5 className="text-xl font-bold text-accent mb-4">MediMentor</h5>
						<p className="text-accent/70 mb-6">
							AI-driven health and wellness app helping you prevent lifestyle
							diseases through personalized recommendations and coaching.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-primary hover:text-primary/80 transition-colors"
							>
								<FaFacebook size={20} />
							</a>
							<a
								href="#"
								className="text-primary hover:text-primary/80 transition-colors"
							>
								<FaTwitter size={20} />
							</a>
							<a
								href="#"
								className="text-primary hover:text-primary/80 transition-colors"
							>
								<FaInstagram size={20} />
							</a>
							<a
								href="#"
								className="text-primary hover:text-primary/80 transition-colors"
							>
								<FaLinkedin size={20} />
							</a>
						</div>
					</div>

					{/* Column 2 - Quick Links */}
					<div>
						<h5 className="text-lg font-semibold text-accent mb-4">
							Quick Links
						</h5>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									Home
								</a>
							</li>
							<li>
								<a
									href="#features"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="#about"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									Pricing
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									Sign In
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									Sign Up
								</a>
							</li>
						</ul>
					</div>

					{/* Column 3 - Support */}
					<div>
						<h5 className="text-lg font-semibold text-accent mb-4">Support</h5>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									FAQ
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									Terms of Service
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									Contact Us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-accent/70 hover:text-primary transition-colors"
								>
									Help Center
								</a>
							</li>
						</ul>
					</div>

					{/* Column 4 - Contact */}
					<div id="contact">
						<h5 className="text-lg font-semibold text-accent mb-4">Contact</h5>
						<ul className="space-y-4">
							<li className="flex items-start">
								<HiOutlineLocationMarker className="text-primary mt-1 mr-3" />
								<span className="text-accent/70">
									123 Health Avenue, Digital City, 10001
								</span>
							</li>
							<li className="flex items-center">
								<HiOutlinePhone className="text-primary mr-3" />
								<span className="text-accent/70">+1 (555) 123-4567</span>
							</li>
							<li className="flex items-center">
								<HiOutlineMail className="text-primary mr-3" />
								<span className="text-accent/70">info@medimentor.app</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-gray-200">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-accent/70 text-sm mb-4 md:mb-0">
							© {new Date().getFullYear()} MediMentor. All rights reserved.
						</p>
						<div className="flex space-x-6">
							<a
								href="#"
								className="text-accent/70 text-sm hover:text-primary transition-colors"
							>
								Privacy
							</a>
							<a
								href="#"
								className="text-accent/70 text-sm hover:text-primary transition-colors"
							>
								Terms
							</a>
							<a
								href="#"
								className="text-accent/70 text-sm hover:text-primary transition-colors"
							>
								Cookies
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
