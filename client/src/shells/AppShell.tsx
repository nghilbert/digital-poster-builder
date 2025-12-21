import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export function AppShell() {
	return (
		<Box height="100vh">
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6">Poster Builder</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar />

			<Box height="calc(100vh - 64px)">
				<Outlet />
			</Box>
		</Box>
	);
}
