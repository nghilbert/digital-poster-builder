import { Element, useEditor } from "@craftjs/core";
import { Button as MUIButton, Grid as MUIGrid } from "@mui/material";
import { userComponents } from "components/user";

export function ComponentsMenu() {
	const { connectors } = useEditor();

	return (
		<MUIGrid container spacing={1}>
			{Object.entries(userComponents).map(([key, Component]) => {
				// Filter user components
				if (!Component.craft) return null;
				if (!Component.craft.rules.canDrag()) return null;

				return (
					<MUIGrid size="auto" key={key}>
						<MUIButton
							fullWidth
							variant="outlined"
							sx={{ cursor: "grab" }}
							ref={(ref: HTMLButtonElement | null) => {
								if (ref) connectors.create(ref, <Element is={Component} canvas={Component.craft.isCanvas || false} />);
							}}
						>
							{Component.craft.displayName || "User Component"}
						</MUIButton>
					</MUIGrid>
				);
			})}
		</MUIGrid>
	);
}
