import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export default function QuizRadioGroup({ options, value, onChange, disabled }) {
	return (
		<RadioGroup
			aria-label="quiz"
			name="quiz"
			value={value}
			onChange={onChange}
			disabled={disabled}
		>
			{options?.map((option, index) => (
				<FormControlLabel
					key={index}
					value={option}
					control={<Radio />}
					label={option}
				/>
			))}
		</RadioGroup>
	);
}
