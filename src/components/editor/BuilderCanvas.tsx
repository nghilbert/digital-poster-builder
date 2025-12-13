import { useState } from "react";
import { ResizableBox } from "react-resizable";
import { Element, Frame } from "@craftjs/core";
import { Paper } from "@mui/material";
import { Container } from "components/user/Container";
import "react-resizable/css/styles.css";

export function BuilderCanvas() {
	// Starting size. Dynamically updates when resized.
	const [size, setSize] = useState({ width: 1024, height: 600 });

	return (
		<ResizableBox
			width={size.width}
			height={size.height}
			minConstraints={[320, 400]}
			maxConstraints={[1200, 1200]}
			resizeHandles={["se", "e", "s", "sw", "w"]}
			onResizeStop={(_, data) => {
				setSize({ width: data.size.width, height: data.size.height });
			}}
		>
			<Paper
				elevation={3}
				sx={{
					width: "100%",
					height: "100%",
					overflow: "auto",
					p: 3,
					boxSizing: "border-box",
					backgroundColor: "white",
				}}
			>
				<Frame>
					<Element canvas is={Container} />
				</Frame>
			</Paper>
		</ResizableBox>
	);
}
