import { Box, Paper, Divider } from "@mui/material";
import { ComponentsMenu, EditorMenu } from "components/editor";

export function SidePanel() {
	return (
		<Paper elevation={3} sx={{ width: 360, height: "100%", display: "flex", flexDirection: "column" }}>
			<Box sx={{ resize: "vertical" }} p={1} overflow="auto" minHeight="25%" height="50%" maxHeight="75%">
				<EditorMenu />
			</Box>

			<Divider />

			<Box p={1} flex={1} overflow="auto">
				<ComponentsMenu />
			</Box>
		</Paper>
	);
}
