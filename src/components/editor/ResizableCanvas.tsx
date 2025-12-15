import "react-resizable/css/styles.css";
import { ResizableBox } from "react-resizable";
import { Element, Frame } from "@craftjs/core";
import { Paper } from "@mui/material";
import { userComponents } from "components/user";

export function ResizableCanvas() {
	const { RootBox } = userComponents;

	return (
		<ResizableBox
			width={1024}
			height={600}
			minConstraints={[320, 400]}
			resizeHandles={["s", "sw", "w"]}
			handleSize={[20, 20]}
			style={{
				maxWidth: "100%",
				maxHeight: "100%",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					p: 1,
					width: "100%",
					height: "100%",
					position: "relative",
					boxSizing: "border-box",
				}}
			>
				<Frame>
					<Element canvas is={RootBox} />
				</Frame>
			</Paper>
		</ResizableBox>
	);
}
