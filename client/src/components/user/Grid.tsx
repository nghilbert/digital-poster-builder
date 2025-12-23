import { type Node, useNode } from "@craftjs/core";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { FormControl, Grid as MUIGrid, ToggleButton } from "@mui/material";
import { type PropsWithChildren } from "react";

type GridProps = {
	container: boolean;
	size: number;
};

export function Grid({ container, size, children }: PropsWithChildren<GridProps>) {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<MUIGrid
			container={container}
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
	const {
		actions: { setProp },
		props,
	} = useNode((node) => ({ props: node.data.props }));

	return (
		<FormControl>
			<ToggleButton
				value="container"
				selected={props.container}
				onChange={() =>
					setProp((props: GridProps) => {
						props.container = !props.container;
					})
				}
			>
				Container
			</ToggleButton>
		</FormControl>
	);
}

Grid.craft = {
	displayName: "Grid",
	icon: ViewModuleIcon,
	props: {
		size: 1,
		container: false,
	},
	rules: {
		canDrop: () => true,
		canDrag: () => true,
		canMoveIn: (_incoming: Node[], self: Node) => self.data.props.container,
		canMoveOut: () => true,
	},
	isCanvas: true,
	related: { settings: GridSettings },
};
