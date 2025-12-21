import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { getDesignTokens } from "./theme";

export default function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const mode = prefersDarkMode ? "dark" : "light";
	const theme = createTheme(getDesignTokens(mode));

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}
