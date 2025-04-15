import React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function QuestionControls({
	isAnswerSubmitted,
	isCorrectAnswer,
	currentQuestion,
	selectedAnswer,
	handleSubmitAnswer,
	handleNextQuestion,
	handleSkipQuestion,
	isLastQuestion,
	skipCount,
	maxSkips,
}) {
	return (
		<Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
			{!isAnswerSubmitted ? (
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmitAnswer}
					disabled={!selectedAnswer}
				>
					Submit Answer
				</Button>
			) : (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 1,
						alignItems: "flex-start",
					}}
				>
					{isCorrectAnswer === true && (
						<Alert severity="success" sx={{ mb: 1 }}>
							Correct!
						</Alert>
					)}
					{isCorrectAnswer === false && (
						<Alert severity="error" sx={{ mb: 1 }}>
							Incorrect. The correct answer is:{" "}
							{currentQuestion?.correctAnswer}
						</Alert>
					)}
					{!isLastQuestion ? (
						<Button
							variant="contained"
							onClick={handleNextQuestion}
						>
							Next Question
						</Button>
					) : (
						<Button
							variant="contained"
							onClick={() => alert("Quiz Finished!")}
						>
							Finish Quiz
						</Button>
					)}
				</Box>
			)}
			{!isAnswerSubmitted && (
				<Button
					variant="outlined"
					onClick={handleSkipQuestion}
					disabled={skipCount >= maxSkips}
				>
					Skip Question ({skipCount}/{maxSkips})
				</Button>
			)}
		</Box>
	);
}
