import { useNode } from "@craftjs/core";
import { Grid as MUIGrid } from "@mui/material";
import { type PropsWithChildren } from "react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

type GridItemProps = {
	size: number;
};

export function GridItem({ size, children }: PropsWithChildren<GridItemProps>) {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<MUIGrid
			size={size}
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

GridItem.craft = {
	displayName: "Grid Item",
	icon: ViewModuleIcon,
	rules: {
		canDrop: () => true,
		canDrag: () => true,
		canMoveIn: () => true,
		canMoveOut: () => true,
	},
	isCanvas: true,
	related: { settings: GridSettings },
};
