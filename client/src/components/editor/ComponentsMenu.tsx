import { Element, useEditor } from "@craftjs/core";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Button, Stack, Typography } from "@mui/material";
import * as userComponents from "components/user";

export function ComponentsMenu() {
	const { connectors } = useEditor();

	return (
		<Stack spacing={1}>
			<Typography align="center" gutterBottom>
				Components
			</Typography>
			{Object.entries({ ...userComponents }).map(([key, Component]) => {
				// Filter user components
				const craft = Component.craft;
				if (!craft) return null;
				if (!craft.rules?.canDrag?.()) return null;

				const displayName = craft.displayName ?? key;
				const Icon = "icon" in craft && craft.icon ? craft.icon : AddBoxOutlinedIcon;
				const isCanvas = craft.isCanvas ?? false;

				return (
					<Button
						key={key}
						startIcon={<Icon />}
						fullWidth
						sx={{ cursor: "grab" }}
						ref={(ref) => {
							if (ref) connectors.create(ref, <Element is={Component} canvas={isCanvas} />);
						}}
					>
						{displayName}
					</Button>
				);
			})}
		</Stack>
	);
}
