import { useEditor } from "@craftjs/core";
import { DeleteForever, Redo, Save, Undo } from "@mui/icons-material";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import { updateLayout } from "api/layouts";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function EditorToolbar() {
	const { id } = useParams();

	// Variables update when the editor updates
	const { actions, selectedNodeIds, canUndo, canRedo, serialized, queryNode } = useEditor((state, query) => ({
		selectedNodeIds: Array.from(state.events.selected),
		canUndo: query.history.canUndo(),
		canRedo: query.history.canRedo(),
		serialized: query.serialize(),
		queryNode: query.node,
	}));

	// Determine whether save is needed
	const [lastSaved, setLastSaved] = useState<string>();
	const isSaveNeeded = lastSaved !== serialized;

	function handleSave() {
		if (!id) return;
		updateLayout(id, {
			name: "Current Layout",
			content: serialized,
		})
			.then(() => {
				setLastSaved(serialized);
			})
			.catch(console.error);
	}

	function handleDelete() {
		selectedNodeIds.forEach((nodeId) => {
			if (queryNode(nodeId).isDeletable()) actions.delete(nodeId);
		});
	}

	return (
		<Toolbar>
			<Tooltip title="Save Layout">
				<span>
					<IconButton disabled={!isSaveNeeded} onClick={handleSave}>
						<Save />
					</IconButton>
				</span>
			</Tooltip>
			<Tooltip title="Undo">
				<span>
					<IconButton disabled={!canUndo} onClick={() => actions.history.undo()}>
						<Undo />
					</IconButton>
				</span>
			</Tooltip>
			<Tooltip title="Redo">
				<span>
					<IconButton disabled={!canRedo} onClick={() => actions.history.redo()}>
						<Redo />
					</IconButton>
				</span>
			</Tooltip>
			<Tooltip title="Delete All Selected Components">
				<span>
					<IconButton color="error" disabled={selectedNodeIds.length < 1} onClick={handleDelete}>
						<DeleteForever />
					</IconButton>
				</span>
			</Tooltip>
		</Toolbar>
	);
}
