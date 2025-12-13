import { useEditor } from "@craftjs/core";
import { Button as MUIButton, Stack, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export function SettingsMenu() {
	const { actions, selected } = useEditor((state, query) => {
		const [currentNodeId] = state.events.selected;
		let selected;

		if (currentNodeId) {
			selected = {
				id: currentNodeId,
				displayName: state.nodes[currentNodeId].data.displayName,
				settings: state.nodes[currentNodeId].related?.settings,
				isDeletable: query.node(currentNodeId).isDeletable(),
			};
		}

		return { selected };
	});

	if (!selected) return null;

	return selected ? (
		<Stack spacing={4}>
			<Typography align="center">{selected.displayName} Settings</Typography>
			{selected.isDeletable && (
				<MUIButton
					size="small"
					variant="contained"
					color="error"
					startIcon={<DeleteForeverIcon />}
					onClick={() => actions.delete(selected.id)}
				>
					Delete {selected.displayName}
				</MUIButton>
			)}
			{selected.settings && <selected.settings />}
		</Stack>
	) : null;
}
