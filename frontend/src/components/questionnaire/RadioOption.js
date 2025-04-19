import React from "react";

const RadioOption = ({ id, name, value, label, selectedValue, onChange }) => {
	return (
		<div
			onClick={() => onChange(value)}
			className={`relative border rounded-lg p-4 flex items-center cursor-pointer transition ${
				selectedValue === value
					? "border-primary bg-primary/5"
					: "border-gray-200 hover:border-primary/30"
			}`}
		>
			<div
				className={`h-5 w-5 rounded-full border flex items-center justify-center ${
					selectedValue === value ? "border-primary" : "border-gray-300"
				}`}
			>
				{selectedValue === value && (
					<div className="h-3 w-3 rounded-full bg-primary"></div>
				)}
			</div>
			<label htmlFor={id} className="ml-3 cursor-pointer text-accent">
				{label}
			</label>
		</div>
	);
};

export default RadioOption;
