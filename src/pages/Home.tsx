import { Editor } from "@craftjs/core";
import { SidePanel, ResizableCanvas, EditorHighlighter } from "components/editor";
import { userComponents } from "components/user";
import { Box } from "@mui/material";

export default function Home() {
	return (
		<Editor resolver={userComponents}>
			<EditorHighlighter />
			<Box height="100vh" display="flex" flex={1} overflow="hidden">
				<SidePanel />

				<Box flex={1} />

				<ResizableCanvas />
			</Box>
		</Editor>
	);
}
