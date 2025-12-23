import { Editor, Element, Frame } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import { Box, Divider, Paper, Skeleton, Stack } from "@mui/material";
import { getLayout } from "api/layouts";
import { CanvasArea, ComponentSettingsMenu, ComponentsMenu, EditorToolbar } from "components/editor";
import * as userComponents from "components/user";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function LayoutEditor() {
	const { layoutId } = useParams();
	const [layoutContent, setLayoutContent] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!layoutId) return;

		// If an error is caught during the api call, isLoading will always be true
		// This prevents a frame from ever being loaded and overwriting data
		getLayout(layoutId)
			.then((layout) => {
				if (layout.content) {
					setLayoutContent(layout.content);
				}
				setIsLoading(false);
			})
			.catch(console.error);
	}, [layoutId]);

	return (
		<Editor resolver={{ ...userComponents }}>
			<Box display="flex" justifyContent="space-between" height="100%">
				<Paper elevation={3} sx={{ minWidth: 360, height: "100%" }}>
					<Stack height="100%" divider={<Divider flexItem />}>
						<EditorToolbar />
						<Layers expandRootOnLoad />
						<Box flex={1} overflow="auto">
							<ComponentsMenu />
						</Box>
						<Box flex={1} overflow="auto">
							<ComponentSettingsMenu />
						</Box>
					</Stack>
				</Paper>

				<CanvasArea>
					{isLoading ? ( // Show an effect while loading
						<Skeleton />
					) : layoutContent ? ( // Load content from api
						<Frame data={layoutContent} />
					) : (
						// Render a new layout if one does not exist
						<Frame>
							<Element canvas is={userComponents.RootBox} />
						</Frame>
					)}
				</CanvasArea>
			</Box>
		</Editor>
	);
}
