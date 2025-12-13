import { Element, useEditor } from "@craftjs/core";
import { Button as MUIButton, Typography, Stack } from "@mui/material";
import * as userComponents from "components/user";

export function ComponentMenu() {
	const { connectors } = useEditor();

	const menuButtons = Object.keys(userComponents).map((key) => {
		// @ts-ignore for now...
		const Component = userComponents[key];

		return (
			<MUIButton
				key={key}
				variant="outlined"
				size="small"
				ref={(ref: HTMLButtonElement | null) => {
					ref && connectors.create(ref, <Element is={Component} canvas={Component.craft.isCanvas || false} />);
				}}
			>
				{Component.craft.displayName || "User Component"}
			</MUIButton>
		);
	});
	return (
		<Stack spacing={1}>
			<Typography align="center">Drag to add</Typography>
			{menuButtons}
		</Stack>
	);
}
