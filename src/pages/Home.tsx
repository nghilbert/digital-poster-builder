import { useState } from "react";
import { Editor } from "@craftjs/core";
import { Layers } from "@craftjs/layers";

import { BuilderCanvas, ComponentMenu, SidePanel, SettingsMenu, EditorActions } from "components/editor";
import * as userComponents from "components/user";
import { Box } from "@mui/material";

export default function Home() {
	const resolverComponents = { ...userComponents };
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
				display: "flex",
				justifyContent: "space-between",
				width: "100%",
				height: "100vh",
			}}
		>
			{
				// Conditionally render the Editor once the layout is readyevery

				<Editor onNodesChange={handleNodesChange} resolver={resolverComponents}>
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
