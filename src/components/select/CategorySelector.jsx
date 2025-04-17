import React, { useState, useEffect } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

export default function CategorySelector({ onCategoryChange, selectedValue }) {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get("http://localhost:9090/api/questions/categories")
			.then((response) => {
				setCategories(["All", ...response.data]);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching categories:", error);
				setLoading(false);
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
			{loading ? (
				<Skeleton width="100%" height={100} />
			) : (
				<FormControl fullWidth sx={{ mt: 3 }}>
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
			)}
		</>
	);
}
