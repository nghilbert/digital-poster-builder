import { type PropsWithChildren } from "react";
import { useNode } from "@craftjs/core";
import { Box as MUIBox } from "@mui/material";

export function RootBox({ children }: PropsWithChildren) {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<MUIBox
			ref={(ref: HTMLElement | null) => {
				if (ref) connect(drag(ref));
			}}
			sx={{ width: "100%", minHeight: "100%" }}
		>
			{children}
		</MUIBox>
	);
}

RootBox.craft = {
	displayName: "Root Box",
	rules: {
		canDrop: () => true,
		canDrag: () => false,
		canMoveIn: () => true,
		canMoveOut: () => true,
	},
	isCanvas: true,
};
