import React, { useState, useEffect } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
		<FormControl fullWidth margin="normal">
			<InputLabel id="category-select-label">Select Category</InputLabel>
			<Select
				labelId="category-select-label"
				id="category-select"
				value={selectedValue}
				label="Select Category"
				onChange={handleChange}
			>
				{categories.map((category) => (
					<MenuItem key={category} value={category}>
						{category}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
