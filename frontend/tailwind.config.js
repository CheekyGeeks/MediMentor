module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#0075FF", // Blue color from the image
				secondary: "#E6F1FF", // Light blue background
				accent: "#333333", // Dark text color
				light: "#F8FAFC", // Light background
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
