import { outfit } from "./fonts";

export const metadata = {
	title: "Quiz App",
	description: "A Quiz app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={outfit.variable}>
			<body>{children}</body>
		</html>
	);
}
