import React from "react";

const NumberInput = ({
	id,
	label,
	value,
	onChange,
	placeholder,
	unit = "",
	min = 0,
	max = 999,
}) => {
	return (
		<div className="mb-4">
			<label htmlFor={id} className="block text-accent font-medium mb-2">
				{label}
			</label>
			<div className="relative">
				<input
					type="number"
					id={id}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					min={min}
					max={max}
					className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
				/>
				{unit && (
					<div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
						{unit}
					</div>
				)}
			</div>
		</div>
	);
};

export default NumberInput;
