import { Element, useEditor } from "@craftjs/core";
import { Button as MUIButton, Typography, Stack } from "@mui/material";
import { userComponents } from "components/user";

export function ComponentMenu() {
	const { connectors } = useEditor();

	const menuButtons = Object.entries(userComponents).map(([key, Component]) => {
		if (!Component.craft) return null;
		if (!Component.craft.rules.canDrag()) return null;

		return (
			<MUIButton
				key={key}
				variant="outlined"
				size="small"
				ref={(ref: HTMLButtonElement | null) => {
					if (ref) connectors.create(ref, <Element is={Component} canvas={Component.craft.isCanvas || false} />);
				}}
			>
				{Component.craft.displayName || "User Component"}
			</MUIButton>
		);
	});

	return (
		<Stack spacing={2}>
			<Typography align="center">Drag to add</Typography>
			{menuButtons}
		</Stack>
	);
}
