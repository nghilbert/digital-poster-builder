import { useEditor } from "@craftjs/core";
import { DeleteForever, Redo, Save, Undo } from "@mui/icons-material";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import { updateLayout } from "api/layouts";
import { useParams } from "react-router-dom";
export function EditorToolbar() {
	const { layoutId } = useParams();

	// Variables update when the editor updates
	const { actions, query, selectedId, isDeletable, canUndo, canRedo } = useEditor((state, query) => {
		// Returns a set, only get thr last node that was selected or null
		const selectedId = Array.from(state.events.selected).at(-1) ?? null;

		return {
			selectedId,
			isDeletable: selectedId !== null && query.node(selectedId).isDeletable(),
			canUndo: query.history.canUndo(),
			canRedo: query.history.canRedo(),
		};
	});

	function handleSave() {
		if (!layoutId) return;
		const serialized = query.serialize();

		updateLayout(layoutId, {
			name: "Current Layout",
			content: serialized,
		}).catch(console.error);
	}

	function handleDelete() {
		if (!isDeletable || selectedId === null) return;
		actions.delete(selectedId);
	}

	return (
		<Toolbar>
			<Tooltip title="Save Layout">
				<span>
					<IconButton disabled={!canUndo} onClick={handleSave}>
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
			<Tooltip title="Delete Selected Component">
				<span>
					<IconButton color="error" disabled={!isDeletable} onClick={handleDelete}>
						<DeleteForever />
					</IconButton>
				</span>
			</Tooltip>
		</Toolbar>
	);
}
