import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Layout({ children }) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Quiz App
					</Typography>
				</Toolbar>
			</AppBar>
			<Container component="main" sx={{ py: 4, flexGrow: 1 }}>
				{children}
			</Container>
			<Box
				component="footer"
				sx={{ py: 2, bgcolor: "lightgray", textAlign: "center" }}
			>
				<Typography variant="body2" color="text.secondary">
					© {new Date().getFullYear()} My Quiz App
				</Typography>
			</Box>
		</Box>
	);
}
