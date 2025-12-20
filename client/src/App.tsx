import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, LayoutEditor, LayoutList } from "pages";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./theme";

export default function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const mode = prefersDarkMode ? "dark" : "light";
	const theme = createTheme(getDesignTokens(mode));

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/layouts" element={<LayoutList />} />
					<Route path="/layouts/new" element={<LayoutEditor />} />
					<Route path="/layouts/:id" element={<LayoutEditor />} />{" "}
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}
