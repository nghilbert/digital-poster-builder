import { useEditor } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import { IconButton, Toolbar, Divider } from "@mui/material";
import { DeleteForever, Save } from "@mui/icons-material";

const EmptySettings = () => null;

export function EditorMenu() {
	// Variables update when the editor updates
	const { selectedNodeIds, actions, query } = useEditor((state) => ({
		selectedNodeIds: Array.from(state.events.selected),
	}));

	function saveLayout() {
		console.log("Serialized layout: ", query.serialize());
	}

	function deleteSelectedNodes() {
		selectedNodeIds.forEach((id) => {
			if (query.node(id).isDeletable()) actions.delete(id);
		});
	}

	// get settings if there is only one node, otherwise settings is a no-op component
	const SelectedNodeSettings =
		selectedNodeIds.length === 1
			? query.node(selectedNodeIds[0]).get()?.related?.settings ?? EmptySettings
			: EmptySettings;

	return (
		<>
			<Toolbar>
				<IconButton onClick={saveLayout}>
					<Save />
				</IconButton>
				<IconButton color="error" disabled={selectedNodeIds.length === 0} onClick={deleteSelectedNodes}>
					<DeleteForever />
				</IconButton>
			</Toolbar>
			<Divider />
			<Layers expandRootOnLoad />
			<SelectedNodeSettings />
		</>
	);
}
