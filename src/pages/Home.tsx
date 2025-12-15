import { Editor, Frame, Element } from "@craftjs/core";
import { SidePanel, CanvasArea } from "components/editor";
import { userComponents } from "components/user";
import { Box } from "@mui/material";
import { Leva } from "leva";

export default function Home() {
	const { RootBox } = userComponents;

	return (
		<Editor resolver={userComponents}>
			<Leva />
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
