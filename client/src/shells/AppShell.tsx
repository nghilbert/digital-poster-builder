import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export function AppShell() {
	return (
		<Box height="100vh">
			<Outlet />
		</Box>
	);
}
