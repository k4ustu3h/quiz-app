import React from "react";
import CategorySelector from "@/components/select/CategorySelector";
import QuestionNumberSelector from "@/components/slider/QuestionNumberSelector";
import Container from "@mui/material/Container";

export default function QuizPreferences({
	onCategoryChange,
	selectedValue,
	numQuestions,
	onNumQuestionsChange,
	onStartQuiz,
}) {
	return (
		<Container>
			<CategorySelector
				onCategoryChange={onCategoryChange}
				selectedValue={selectedValue}
			/>
			<Container sx={{ p: 8 }}></Container>
			<QuestionNumberSelector
				numQuestions={numQuestions}
				onNumQuestionsChange={onNumQuestionsChange}
				onStartQuiz={onStartQuiz}
			/>
		</Container>
	);
}
