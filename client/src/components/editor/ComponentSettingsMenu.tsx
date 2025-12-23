import { useEditor } from "@craftjs/core";
import { Box, Typography } from "@mui/material";

const EmptySettings = () => null;

export function ComponentSettingsMenu() {
	const { query, selectedNodeId } = useEditor((state) => ({
		selectedNodeId: Array.from(state.events.selected).at(-1) ?? null,
	}));
	const selectedNode = selectedNodeId ? query.node(selectedNodeId).get() : null;
	const SelectedNodeSettings = selectedNode?.related?.settings ?? EmptySettings;

	return (
		<Box>
			<Typography align="center" gutterBottom>
				Component Settings
			</Typography>
			<SelectedNodeSettings />
		</Box>
	);
}
