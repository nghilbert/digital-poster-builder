import "react-resizable/css/styles.css";
import { ResizableBox } from "react-resizable";
import { Element, Frame } from "@craftjs/core";
import { Paper } from "@mui/material";
import { userComponents } from "components/user";

export function BuilderCanvas() {
	const { RootBox } = userComponents;

	return (
		<ResizableBox
			width={1024}
			height={600}
			minConstraints={[320, 400]}
			maxConstraints={[1200, 1200]}
			resizeHandles={["se", "e", "s", "sw", "w"]}
			handleSize={[20, 20]}
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
