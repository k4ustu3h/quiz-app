import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function QuizResults({ score, totalQuestions, onRestartQuiz }) {
	const percentage = (score / totalQuestions) * 100;
	let resultText = "";

	if (percentage >= 90) {
		resultText = "Excellent!";
	} else if (percentage >= 70) {
		resultText = "Good job!";
	} else if (percentage >= 50) {
		resultText = "Not bad!";
	} else {
		resultText = "Better luck next time!";
	}

	return (
		<Box
			sx={{
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				gap: 2,
				mt: 4,
			}}
		>
			<Typography variant="h4" gutterBottom>
				Quiz Finished!
			</Typography>
			<Typography variant="h6">
				Your Score: {score} / {totalQuestions}
			</Typography>
			<Typography variant="subtitle1">
				Percentage: {percentage.toFixed(2)}%
			</Typography>
			<Typography variant="h6" color="primary">
				{resultText}
			</Typography>
			<Button variant="contained" onClick={onRestartQuiz}>
				Restart Quiz
			</Button>
		</Box>
	);
}
