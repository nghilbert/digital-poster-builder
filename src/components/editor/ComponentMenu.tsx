import { Element, useEditor } from "@craftjs/core";
import { Button as MUIButton, Typography, Stack } from "@mui/material";
import { Container } from "components/user";

export default function ComponentMenu() {
	const { connectors } = useEditor();

	const userComponents = [{ label: "Container", component: <Element is={Container} canvas /> }];

	return (
		<Stack spacing={1}>
			<Typography align="center">Drag to add</Typography>
			{userComponents.map(({ label, component }) => (
				<MUIButton
					key={label}
					ref={(ref: HTMLButtonElement | null) => {
						ref && connectors.create(ref, component);
					}}
				>
					{label}
				</MUIButton>
			))}
		</Stack>
	);
}
