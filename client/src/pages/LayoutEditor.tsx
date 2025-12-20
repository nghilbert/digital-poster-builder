import { Editor, Frame, Element } from "@craftjs/core";
import { SidePanel, CanvasArea } from "components/editor";
import { userComponents } from "components/user";
import { Box } from "@mui/material";

export function LayoutEditor() {
	const { RootBox } = userComponents;

	return (
		<Editor resolver={userComponents}>
			<Box height="100vh" display="flex" flex={1} overflow="hidden">
				<SidePanel />

				<Box flex={1} />

				<CanvasArea>
					<Frame>
						<Element canvas is={RootBox} />
					</Frame>
				</CanvasArea>
			</Box>
		</Editor>
	);
}
