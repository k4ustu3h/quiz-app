import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material";
import NavBar from "../surfaces/NavBar";
import { cssVars } from "@/styles/cssVars";

export default function Layout({ children }) {
	return (
		<ThemeProvider theme={cssVars}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<NavBar />
				<Container component="main" sx={{ py: 4, flexGrow: 1 }}>
					{children}
				</Container>
			</Box>
		</ThemeProvider>
	);
}
