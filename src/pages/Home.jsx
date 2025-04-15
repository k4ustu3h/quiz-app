"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Layout from "@/components/layouts/Layout";
import QuestionControls from "@/components/buttons/QuestionControls";
import QuizRadioGroup from "@/components/buttons/radio/QuizRadioGroup";

const MAX_SKIPS = 3; // Define the maximum number of skips allowed

export default function Home() {
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [skippedQuestionIds, setSkippedQuestionIds] = useState([]);
	const [skipCount, setSkipCount] = useState(0);

	const fetchRandomQuestion = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get(
				`http://localhost:9090/api/questions/random?excludedIds=${JSON.stringify(
					skippedQuestionIds
				)}`
			);
			setCurrentQuestion(response.data);
			setLoading(false);
			setIsAnswerSubmitted(false);
			setIsCorrectAnswer(null);
			setSelectedAnswer("");
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	}, [skippedQuestionIds]); // Re-create if skippedQuestionIds changes

	useEffect(() => {
		fetchRandomQuestion();
	}, [fetchRandomQuestion]);

	const handleAnswerChange = (event) => {
		setSelectedAnswer(event.target.value);
	};

	const handleSubmitAnswer = () => {
		setIsAnswerSubmitted(true);
		setIsCorrectAnswer(selectedAnswer === currentQuestion?.correctAnswer);
	};

	const handleNextQuestion = () => {
		setLoading(true);
		setError(null);
		fetchRandomQuestion();
	};

	const handleSkipQuestion = () => {
		if (skipCount < MAX_SKIPS && currentQuestion) {
			setSkippedQuestionIds((prevIds) => [
				...prevIds,
				currentQuestion._id.$oid,
			]);
			setSkipCount((prevCount) => prevCount + 1);
			fetchRandomQuestion();
		} else if (skipCount >= MAX_SKIPS) {
			alert(
				`You have reached the maximum number of skips (${MAX_SKIPS}).`
			);
		}
	};

	if (loading) {
		return (
			<Layout>
				<CircularProgress />
			</Layout>
		);
	}

	if (error) {
		return (
			<Layout>
				<Typography color="error">
					Error loading question: {error}
				</Typography>
			</Layout>
		);
	}

	if (!currentQuestion) {
		return (
			<Layout>
				<Typography variant="h6">No question available.</Typography>
			</Layout>
		);
	}

	return (
		<Layout>
			<Typography variant="h5" gutterBottom>
				Question
			</Typography>
			<Typography variant="h6" component="p" gutterBottom>
				{currentQuestion.questionText}
			</Typography>
			<QuizRadioGroup
				options={currentQuestion?.options}
				value={selectedAnswer}
				onChange={handleAnswerChange}
				disabled={isAnswerSubmitted}
			/>

			<QuestionControls
				isAnswerSubmitted={isAnswerSubmitted}
				isCorrectAnswer={isCorrectAnswer}
				currentQuestion={currentQuestion}
				selectedAnswer={selectedAnswer}
				handleSubmitAnswer={handleSubmitAnswer}
				handleNextQuestion={handleNextQuestion}
				handleSkipQuestion={handleSkipQuestion}
				isLastQuestion={false}
				skipCount={skipCount}
				maxSkips={MAX_SKIPS}
			/>
			{skipCount > 0 && (
				<Typography variant="caption" color="textSecondary">
					Skips used: {skipCount} / {MAX_SKIPS}
				</Typography>
			)}
		</Layout>
	);
}
