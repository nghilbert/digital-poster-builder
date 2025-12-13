import type { PropsWithChildren } from "react";
import { useNode } from "@craftjs/core";
import { Box as MUIBox } from "@mui/material";

export function Box({ children }: PropsWithChildren) {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<MUIBox
			ref={(ref: HTMLElement | null) => {
				if (ref) connect(drag(ref));
			}}
		>
			{children}
		</MUIBox>
	);
}

Box.craft = {
	displayName: "Box",
	props: { children: [] },
	rules: {
		canDrag: () => true,
		canMoveIn: () => true,
	},
	isCanvas: true,
};
