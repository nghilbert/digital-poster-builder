export const getDesignTokens = (mode: "light" | "dark") => ({
	palette: {
		mode,
		//...
	},
	typography: {
		mode,
		//...
	},
	components: {
		mode,
		//...
	},
});
