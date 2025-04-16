import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export default function QuizRadioGroup({ options, value, onChange, disabled }) {
	return (
		<FormControl component="fieldset" sx={{ mb: 2 }}>
			<FormLabel component="legend">Select an answer:</FormLabel>
			<RadioGroup
				aria-label="quiz-answers"
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
		</FormControl>
	);
}
