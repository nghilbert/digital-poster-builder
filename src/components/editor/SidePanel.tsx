import React from "react";
import { Paper, Stack, Divider } from "@mui/material";

export default function SidePanel({ children }: React.PropsWithChildren) {
	return (
		<Paper elevation={2} sx={{ p: 1, minWidth: "10%", maxWidth: "25%", overflowY: "auto" }}>
			<Stack spacing={2} divider={<Divider flexItem />}>
				{children}
			</Stack>
		</Paper>
	);
}
