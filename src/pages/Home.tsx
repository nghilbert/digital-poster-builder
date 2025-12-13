import { useState } from "react";
import { Editor } from "@craftjs/core";
import { Layers } from "@craftjs/layers";

import { BuilderCanvas, ComponentMenu, SidePanel, SettingsMenu, EditorActions } from "components/editor";
import { userComponents } from "components/user";
import { Box } from "@mui/material";

export default function Home() {
	const [isSaveNeeded, setIsSaveNeeded] = useState(false);

	function handleSave() {
		setIsSaveNeeded(false);
	}

	function handleNodesChange(query: any) {
		console.log("Layout updated: ", query.getSerializedNodes());
		setIsSaveNeeded(true);
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
			{
				// Conditionally render the Editor once the layout is readyevery

				<Editor onNodesChange={handleNodesChange} resolver={userComponents}>
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
			}
		</Box>
	);
}
