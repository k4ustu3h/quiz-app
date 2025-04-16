import React from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const questionChoices = [5, 10, 15, 20];

export default function QuestionNumberSelector({
	numQuestions,
	onNumQuestionsChange,
	onStartQuiz,
}) {
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Choose the number of questions:
			</Typography>
			<Slider
				defaultValue={5}
				value={numQuestions}
				onChange={onNumQuestionsChange}
				step={null}
				marks={questionChoices.map((value) => ({
					value,
					label: value.toString(),
				}))}
				min={questionChoices[0]}
				max={questionChoices[questionChoices.length - 1]}
				valueLabelDisplay="auto"
			/>
			<Button
				variant="contained"
				onClick={onStartQuiz}
				disabled={!numQuestions}
				style={{ marginTop: 20 }}
			>
				Start Quiz
			</Button>
		</>
	);
}
