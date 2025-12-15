import { useState } from "react";
import { useEditor } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import { IconButton, Toolbar, Divider, Stack, Tooltip } from "@mui/material";
import { DeleteForever, Save, Undo, Redo } from "@mui/icons-material";

const EmptySettings = () => null;

export function EditorMenu() {
	// Variables update when the editor updates
	const { actions, selectedNodeIds, canUndo, canRedo, nodeData, queryNode } = useEditor((state, query) => ({
		selectedNodeIds: Array.from(state.events.selected),
		canUndo: query.history.canUndo(),
		canRedo: query.history.canRedo(),
		nodeData: query.serialize(),
		queryNode: query.node,
	}));

	// Get the node that was last selected and its corresponding settings
	const lastSelectedId = selectedNodeIds.at(-1);
	const lastSelectedNode = lastSelectedId ? queryNode(lastSelectedId).get() : null;
	const SelectedNodeSettings = lastSelectedNode?.related?.settings ?? EmptySettings;

	// Determine whether save is needed
	const [savedNodeData, setSavedNodeData] = useState(nodeData);
	const isSaveNeeded = savedNodeData !== nodeData;

	function saveLayout() {
		console.log("New node data: ", nodeData);
		setSavedNodeData(nodeData);
	}

	function deleteSelectedNodes() {
		selectedNodeIds.forEach((id) => {
			if (queryNode(id).isDeletable()) actions.delete(id);
		});
	}

	return (
		<Stack sx={{ textAlign: "center" }}>
			<Toolbar variant="dense" disableGutters>
				<Tooltip title="Save Layout">
					<IconButton disabled={!isSaveNeeded} onClick={saveLayout}>
						<Save />
					</IconButton>
				</Tooltip>
				<Tooltip title="Undo">
					<IconButton disabled={!canUndo} onClick={() => actions.history.undo()}>
						<Undo />
					</IconButton>
				</Tooltip>
				<Tooltip title="Redo">
					<IconButton disabled={!canRedo} onClick={() => actions.history.redo()}>
						<Redo />
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete All Selected Components">
					<IconButton color="error" disabled={selectedNodeIds.length < 1} onClick={deleteSelectedNodes}>
						<DeleteForever />
					</IconButton>
				</Tooltip>
			</Toolbar>

			<Divider />

			<SelectedNodeSettings />

			<Divider />

			<Layers expandRootOnLoad />
		</Stack>
	);
}
