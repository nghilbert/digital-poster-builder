import { useNode } from "@craftjs/core";
import { Stack as MUIStack } from "@mui/material";
import type { PropsWithChildren } from "react";

export function Stack({ children }: PropsWithChildren) {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<MUIStack
			ref={(ref: HTMLElement | null) => {
				if (ref) connect(drag(ref));
			}}
		>
			{children}
		</MUIStack>
	);
}

Stack.craft = {
	displayName: "Stack",
	rules: {
		canDrop: () => true,
		canDrag: () => true,
		canMoveIn: () => true,
		canMoveOut: () => true,
	},
	isCanvas: true,
};
