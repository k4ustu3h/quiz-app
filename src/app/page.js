"use client";

import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import {
	Typography,
	CircularProgress,
	RadioGroup,
	FormControlLabel,
	Radio,
	Button,
	Box,
	Alert,
} from "@mui/material";
import axios from "axios";

export default function Home() {
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchRandomQuestion = async () => {
		try {
			const response = await axios.get(
				"http://localhost:9090/api/questions/random"
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
	};

	useEffect(() => {
		fetchRandomQuestion(); // Fetch initial random question
	}, []);

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
		fetchRandomQuestion(); // Call the function to fetch a new random question
	};

	const handleSkipQuestion = () => {
		setLoading(true);
		setError(null);
		fetchRandomQuestion(); // Call the function to fetch a new random question
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
			<Typography variant="h6" paragraph>
				{currentQuestion.questionText}
			</Typography>
			<RadioGroup
				aria-label="quiz"
				name="quiz"
				value={selectedAnswer}
				onChange={handleAnswerChange}
				disabled={isAnswerSubmitted}
			>
				{currentQuestion.options?.map((option, index) => (
					<FormControlLabel
						key={index}
						value={option}
						control={<Radio />}
						label={option}
					/>
				))}
			</RadioGroup>

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
								{currentQuestion.correctAnswer}
							</Alert>
						)}
						<Button
							variant="contained"
							onClick={handleNextQuestion}
						>
							Next Question
						</Button>
					</Box>
				)}
				{!isAnswerSubmitted && (
					<Button variant="outlined" onClick={handleSkipQuestion}>
						Skip Question
					</Button>
				)}
			</Box>
		</Layout>
	);
}
