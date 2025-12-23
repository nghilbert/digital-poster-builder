import { useEditor } from "@craftjs/core";
import { Paper } from "@mui/material";
import { type PropsWithChildren } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

export function CanvasArea({ children }: PropsWithChildren) {
	const { query, selectedId, hoveredId } = useEditor((state) => ({
		selectedId: Array.from(state.events.selected).at(-1) ?? null,
		hoveredId: Array.from(state.events.hovered).at(-1) ?? null,
	}));

	function getNodeRect(nodeId: string | null): DOMRect | null {
		if (!nodeId) return null;
		const node = query.node(nodeId).get();

		if (!node.dom) return null;
		return node.dom.getBoundingClientRect();
	}

	const selectedRect = getNodeRect(selectedId);
	const hoveredRect = hoveredId !== selectedId ? getNodeRect(hoveredId) : null;

	return (
		<ResizableBox
			width={1024}
			height={600}
			minConstraints={[320, 400]}
			maxConstraints={[Infinity, window.innerHeight]}
			resizeHandles={["s", "sw", "w"]}
		>
			<Paper sx={{ p: 2, width: "100%", height: "100%", position: "relative" }}>
				{/* Frame gets injected here */}
				{children}

				{/* Highlight selected node */}
				{selectedRect && (
					<div
						style={{
							position: "fixed",
							top: selectedRect.top,
							left: selectedRect.left,
							width: selectedRect.width,
							height: selectedRect.height,
							outline: "1px solid #ff9800",
							pointerEvents: "none",
						}}
					/>
				)}

				{/* Highlight hovered node */}
				{hoveredRect && (
					<div
						style={{
							position: "fixed",
							top: hoveredRect.top,
							left: hoveredRect.left,
							width: hoveredRect.width,
							height: hoveredRect.height,
							outline: "1px solid #4fc3f7",
							pointerEvents: "none",
						}}
					/>
				)}
			</Paper>
		</ResizableBox>
	);
}
