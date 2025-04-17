import React, { useState, useEffect } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

export default function CategorySelector({ onCategoryChange, selectedValue }) {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:9090/api/questions/categories")
			.then((response) => {
				setCategories(["All", ...response.data]);
			})
			.catch((error) => {
				console.error("Error fetching categories:", error);
			});
	}, []);

	const handleChange = (event) => {
		console.log("Category selected in Selector:", event.target.value);
		onCategoryChange(event.target.value);
	};

	return (
		<>
			<Typography variant="h6" gutterBottom>
				Select a category:
			</Typography>
			<FormControl fullWidth margin="normal">
				<InputLabel id="category-select-label">Category</InputLabel>
				<Select
					id="category-select"
					label="Category"
					labelId="category-select-label"
					onChange={handleChange}
					value={selectedValue}
				>
					{categories.map((category) => (
						<MenuItem key={category} value={category}>
							{category}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
}
