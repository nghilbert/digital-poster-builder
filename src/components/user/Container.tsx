import React from "react";
import { Container as MUIContainer } from "@mui/material";

export function Container({ children }: React.PropsWithChildren) {
	return <MUIContainer>{children}</MUIContainer>;
}

Container.craft = {
	displayName: "Container",
	rules: {
		canDrag: () => false,
		canMoveIn: () => true,
	},
	isCanvas: true,
};
