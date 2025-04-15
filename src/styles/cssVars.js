import { createTheme } from "@mui/material/styles";
import { outfit } from "@/app/fonts";

export const cssVars = createTheme({
	cssVariables: true,
	colorSchemes: {
		dark: true,
	},
	palette: {
		primary: {
			main: "#2962ff",
		},
	},
	components: {
		MuiButton: {
			variants: [
				{
					props: { variant: "contained" },
					style: ({ theme }) => ({
						borderRadius: 20,
						backgroundColor: theme.vars.palette.primary.main,
						height: 40,
						paddingLeft: 24,
						paddingRight: 24,
						textTransform: "none",
					}),
				},
				{
					props: { variant: "outlined" },
					style: {
						borderRadius: 20,
						height: 40,
						paddingLeft: 24,
						paddingRight: 24,
						textTransform: "none",
					},
				},
				{
					props: { variant: "text" },
					style: {
						borderRadius: 20,
						height: 40,
						paddingLeft: 12,
						paddingRight: 12,
						textTransform: "none",
					},
				},
			],
		},
	},
	typography: {
		fontFamily: outfit.style.fontFamily,
	},
});
