export const metadata = {
	title: "Quiz App",
	description: "A Quiz app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
