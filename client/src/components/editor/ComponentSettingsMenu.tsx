import { useEditor } from "@craftjs/core";
import { Box, Typography } from "@mui/material";

const EmptySettings = () => null;

export function ComponentSettingsMenu() {
	// Variables update when the editor updates
	const { selectedNodeIds, queryNode } = useEditor((state, query) => ({
		selectedNodeIds: Array.from(state.events.selected),
		queryNode: query.node,
	}));

	// Get the node that was last selected and its corresponding settings
	const lastSelectedId = selectedNodeIds.at(-1);
	const lastSelectedNode = lastSelectedId ? queryNode(lastSelectedId).get() : null;
	const SelectedNodeSettings = lastSelectedNode?.related?.settings ?? EmptySettings;

	return (
		<Box>
			<Typography align="center" gutterBottom>
				Component Settings
			</Typography>
			<SelectedNodeSettings />
		</Box>
	);
}
