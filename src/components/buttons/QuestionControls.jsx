import React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import QuizRadioGroup from "./radio/QuizRadioGroup";

export default function QuestionControls({
	currentQuestionIndex,
	questions,
	selectedAnswer,
	onAnswerChange,
	isAnswerSubmitted,
	isCorrectAnswer,
	onSubmitAnswer,
	onNextQuestion,
	onSkipQuestion,
	skipCount,
	maxSkips,
	isLastQuestion,
	onFinishQuiz,
}) {
	const currentQuestion = questions[currentQuestionIndex];
	return (
		<>
			<Typography variant="h5" gutterBottom>
				Question {currentQuestionIndex + 1} / {questions.length}
			</Typography>
			<Typography variant="h6" component="p" gutterBottom>
				{currentQuestion?.questionText}
			</Typography>
			<QuizRadioGroup
				options={currentQuestion?.options}
				value={selectedAnswer}
				onChange={onAnswerChange}
				disabled={isAnswerSubmitted}
			/>

			<Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
				{!isAnswerSubmitted ? (
					<>
						<Button
							variant="contained"
							color="primary"
							onClick={onSubmitAnswer}
							disabled={!selectedAnswer}
						>
							Submit Answer
						</Button>
						<Button
							variant="outlined"
							onClick={onSkipQuestion}
							disabled={skipCount >= maxSkips}
						>
							Skip Question ({skipCount}/{maxSkips})
						</Button>
					</>
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
								onClick={onNextQuestion}
							>
								Next Question
							</Button>
						) : (
							<Button variant="contained" onClick={onFinishQuiz}>
								Finish Quiz
							</Button>
						)}
						{skipCount > 0 && (
							<Typography
								variant="caption"
								color="textSecondary"
								sx={{ mt: 1 }}
							>
								Skips used: {skipCount} / {maxSkips}
							</Typography>
						)}
					</Box>
				)}
			</Box>
		</>
	);
}
