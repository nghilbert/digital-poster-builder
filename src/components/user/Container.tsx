import { useNode } from "@craftjs/core";
import { Container as MUIContainer } from "@mui/material";
import type { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<MUIContainer
			ref={(ref: HTMLElement | null) => {
				if (ref) connect(drag(ref));
			}}
		>
			{children}
		</MUIContainer>
	);
}

Container.craft = {
	displayName: "Container",
	rules: {
		canDrop: () => true,
		canDrag: () => true,
		canMoveIn: () => true,
		canMoveOut: () => true,
	},
	isCanvas: true,
};
