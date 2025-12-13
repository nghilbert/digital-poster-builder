import React from "react";
import { Editor } from "@craftjs/core";
import { Layers } from "@craftjs/layers";

import BuilderCanvas from "components/editor/BuilderCanvas";
import ComponentMenu from "components/editor/ComponentMenu";
import SidePanel from "components/editor/SidePanel";
import SettingsMenu from "components/editor/SettingsMenu";
import EditorActions from "components/editor/EditorActions";
import * as userComponents from "components/user";
import { Box } from "@mui/material";

export default function Home() {
	const [isSaveNeeded, setIsSaveNeeded] = React.useState(false);

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
