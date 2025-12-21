import { useNode } from "@craftjs/core";
import { Grid as MUIGrid } from "@mui/material";
import { type PropsWithChildren } from "react";
import GridViewIcon from "@mui/icons-material/GridView";

export function Grid({ children }: PropsWithChildren) {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<MUIGrid
			container
			ref={(ref: HTMLElement | null) => {
				if (ref) connect(drag(ref));
			}}
		>
			{children}
		</MUIGrid>
	);
}

function GridSettings() {
	return null;
}

Grid.craft = {
	displayName: "Grid",
	icon: GridViewIcon,
	rules: {
		canDrop: () => true,
		canDrag: () => true,
		canMoveIn: () => true,
		canMoveOut: () => true,
	},
	isCanvas: true,
	related: { settings: GridSettings },
};
