import "react-resizable/css/styles.css";
import { type PropsWithChildren, useState } from "react";
import { ResizableBox } from "react-resizable";
import { Paper } from "@mui/material";
import { useEditor } from "@craftjs/core";

export function CanvasArea({ children }: PropsWithChildren) {
	const { selectedId, hoveredId, queryNode } = useEditor((state, query) => ({
		selectedId: Array.from(state.events.selected).at(-1) ?? null,
		hoveredId: Array.from(state.events.hovered).at(-1) ?? null,
		queryNode: query.node,
	}));
	const [size, setSize] = useState({ width: 1024, height: 600 });

	function getNodeRect(id: string | null) {
		if (!id) return null;
		const el = queryNode(id).get().dom as HTMLElement | null;
		return el?.getBoundingClientRect() ?? null;
	}

	const selectedRect = getNodeRect(selectedId);
	const activeRect = hoveredId && hoveredId !== selectedId ? getNodeRect(hoveredId) : null;

	return (
		<ResizableBox
			width={size.width}
			height={size.height}
			onResizeStop={(_, { size }) => setSize(size)}
			minConstraints={[320, 400]}
			maxConstraints={[Infinity, window.innerHeight]}
			resizeHandles={["s", "sw", "w"]}
		>
			<Paper sx={{ p: 2, width: "100%", height: "100%", position: "relative" }}>
				{/* Highlight editor nodes */}
				{activeRect && (
					<div
						style={{
							position: "fixed",
							top: activeRect.top,
							left: activeRect.left,
							width: activeRect.width,
							height: activeRect.height,
							outline: "1px solid #4fc3f7",
							pointerEvents: "none",
						}}
					/>
				)}

				{/* Highlight selected nodes */}
				{selectedRect && (
					<div
						style={{
							position: "fixed",
							top: selectedRect.top,
							left: selectedRect.left,
							width: selectedRect.width,
							height: selectedRect.height,
							outline: "2px solid #ff9800",
							pointerEvents: "none",
						}}
					/>
				)}

				{/* Frame gets injected here */}
				{children}
			</Paper>
		</ResizableBox>
	);
}
