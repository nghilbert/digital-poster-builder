import type { SerializedNodes } from "@craftjs/core";
import { useState } from "react";
import { Editor } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import { BuilderCanvas, ComponentMenu, SidePanel, SettingsMenu, EditorActions } from "components/editor";
import { userComponents } from "components/user";
import { Box } from "@mui/material";

export default function Home() {
	const [isSaveNeeded, setIsSaveNeeded] = useState(false);
	const [editorState, setEditorState] = useState<SerializedNodes>();

	function handleSave() {
		console.log("Current editor state: ", editorState);
		setIsSaveNeeded(false);
	}

	return (
		<Box
			sx={{
				minHeight: "100vh",
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<Editor
				resolver={userComponents}
				onNodesChange={(query) => {
					setEditorState(query.getSerializedNodes());
					setIsSaveNeeded(true);
				}}
			>
				<SidePanel>
					<EditorActions handleSave={handleSave} isSaveNeeded={isSaveNeeded} />
					<ComponentMenu />
				</SidePanel>

				<BuilderCanvas />

				<SidePanel>
					<Layers expandRootOnLoad />
					<SettingsMenu />
				</SidePanel>
			</Editor>
		</Box>
	);
}
