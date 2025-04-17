"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Layout from "@/components/layouts/Layout";
import QuestionControls from "@/components/buttons/QuestionControls";
import QuizPreferences from "@/components/sections/QuizPreferences";
import QuizResults from "@/components/sections/QuizResults";

const MAX_SKIPS = 5;

export default function Home() {
	const [numQuestions, setNumQuestions] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [skippedQuestionIds, setSkippedQuestionIds] = useState([]);
	const [skipCount, setSkipCount] = useState(0);
	const [backupQuestions, setBackupQuestions] = useState([]);
	const [quizStarted, setQuizStarted] = useState(false);
	const [score, setScore] = useState(0);
	const [quizFinished, setQuizFinished] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("All");

	const fetchQuestions = useCallback(async (count, category) => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get(
				`http://localhost:9090/api/questions?count=${count}&category=${category}`
			);
			setQuestions(response.data);
			setLoading(false);
			setCurrentQuestionIndex(0);
			setSkippedQuestionIds([]);
			setSkipCount(0);
			setQuizStarted(true);
			setScore(0);
			setQuizFinished(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
			setQuizStarted(false);
		}
	}, []);

	const fetchBackupQuestions = useCallback(
		async (category) => {
			try {
				const response = await axios.get(
					`http://localhost:9090/api/questions?count=${
						MAX_SKIPS * 2
					}&category=${category}`
				);
				setBackupQuestions(response.data);
			} catch (err) {
				console.error("Error fetching backup questions:", err);
			}
		},
		[MAX_SKIPS]
	);

	useEffect(() => {
		if (quizStarted) {
			fetchBackupQuestions(selectedCategory);
		}
	}, [quizStarted, fetchBackupQuestions, selectedCategory]);

	const handleNumQuestionsChange = (event, value) => {
		setNumQuestions(value);
		setQuizStarted(false);
		setQuestions([]);
		setQuizFinished(false);
	};

	const handleStartQuiz = () => {
		if (numQuestions) {
			fetchQuestions(numQuestions, selectedCategory);
		}
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		setNumQuestions(null);
		setQuizStarted(false);
		setQuestions([]);
		setQuizFinished(false);
	};

	const handleAnswerChange = (event) => {
		setSelectedAnswer(event.target.value);
	};

	const handleSubmitAnswer = () => {
		setIsAnswerSubmitted(true);
		const isCorrect =
			selectedAnswer === questions[currentQuestionIndex]?.correctAnswer;
		setIsCorrectAnswer(isCorrect);
		if (isCorrect) {
			setScore((prevScore) => prevScore + 1);
		}
	};

	const handleNextQuestion = () => {
		setIsAnswerSubmitted(false);
		setIsCorrectAnswer(null);
		setSelectedAnswer("");
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
	};

	const handleSkipQuestion = () => {
		if (skipCount < MAX_SKIPS && currentQuestionIndex < questions.length) {
			setSkippedQuestionIds((prevIds) => [
				...prevIds,
				questions[currentQuestionIndex]?._id.$oid,
			]);
			setSkipCount((prevCount) => prevCount + 1);
			if (backupQuestions.length > 0) {
				const newBackup = [...backupQuestions];
				const skippedQuestion = newBackup.shift();
				setBackupQuestions(newBackup);
				setQuestions((prevQuestions) => [
					...prevQuestions.slice(0, currentQuestionIndex),
					skippedQuestion,
					...prevQuestions.slice(currentQuestionIndex + 1),
				]);
			} else {
				setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
			}
			setIsAnswerSubmitted(false);
			setIsCorrectAnswer(null);
			setSelectedAnswer("");
		} else if (skipCount >= MAX_SKIPS) {
			alert(
				`You have reached the maximum number of skips (${MAX_SKIPS}).`
			);
		}
	};

	const handleFinishQuiz = () => {
		setQuizFinished(true);
	};

	const handleRestartQuiz = () => {
		setCurrentQuestionIndex(0);
		setError(null);
		setIsAnswerSubmitted(false);
		setIsCorrectAnswer(null);
		setLoading(false);
		setNumQuestions(null);
		setQuestions([]);
		setQuizFinished(false);
		setScore(0);
		setSelectedAnswer("");
		setSelectedCategory("All");
		setSkipCount(0);
		setSkippedQuestionIds([]);
	};

	const currentQuestion = questions[currentQuestionIndex];
	const isLastQuestion = currentQuestionIndex === questions.length - 1;

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
					Error loading questions: {error}
				</Typography>
			</Layout>
		);
	}

	return (
		<Layout>
			{numQuestions === null || !quizStarted ? (
				<QuizPreferences
					numQuestions={numQuestions}
					onCategoryChange={handleCategoryChange}
					onNumQuestionsChange={handleNumQuestionsChange}
					onStartQuiz={handleStartQuiz}
					selectedValue={selectedCategory}
				/>
			) : quizFinished ? (
				<QuizResults
					score={score}
					totalQuestions={questions.length}
					onRestartQuiz={handleRestartQuiz}
				/>
			) : questions.length > 0 ? (
				<QuestionControls
					currentQuestionIndex={currentQuestionIndex}
					questions={questions}
					selectedAnswer={selectedAnswer}
					onAnswerChange={handleAnswerChange}
					isAnswerSubmitted={isAnswerSubmitted}
					isCorrectAnswer={isCorrectAnswer}
					onSubmitAnswer={handleSubmitAnswer}
					onNextQuestion={handleNextQuestion}
					onSkipQuestion={handleSkipQuestion}
					skipCount={skipCount}
					maxSkips={MAX_SKIPS}
					isLastQuestion={isLastQuestion}
					onFinishQuiz={handleFinishQuiz}
				/>
			) : (
				<Typography variant="h6">No questions available.</Typography>
			)}
		</Layout>
	);
}
