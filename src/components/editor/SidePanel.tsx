import { Box, Paper, Divider } from "@mui/material";
import { ComponentsMenu, EditorMenu } from "components/editor";

export function SidePanel() {
	return (
		<Paper elevation={3} sx={{ width: 360, height: "100%", display: "flex", flexDirection: "column" }}>
			<Box sx={{ resize: "vertical", overflow: "auto", minHeight: "25%", height: "75%", p: 1 }}>
				<EditorMenu />
			</Box>
			<Divider />
			<Box sx={{ flex: 1, overflow: "auto", p: 1 }}>
				<ComponentsMenu />
			</Box>
		</Paper>
	);
}
