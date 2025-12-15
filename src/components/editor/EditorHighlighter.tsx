import { useEffect, useState } from "react";
import { useEditor } from "@craftjs/core";

type Rect = { top: number; left: number; width: number; height: number };

export function EditorHighlighter() {
	const { selectedId, hoveredId, queryNode } = useEditor((state, query) => ({
		selectedId: Array.from(state.events.selected).at(-1) ?? null,
		hoveredId: Array.from(state.events.hovered).at(-1) ?? null,
		queryNode: query.node,
	}));

	const [selected, setSelected] = useState<Rect | null>(null);
	const [hovered, setHovered] = useState<Rect | null>(null);

	useEffect(() => {
		const readRect = (id: string | null) => {
			if (!id) return null;
			const el = queryNode(id).get().dom as HTMLElement | null;
			if (!el) return null;
			const r = el.getBoundingClientRect();
			return { top: r.top, left: r.left, width: r.width, height: r.height };
		};

		const update = () => {
			setSelected(readRect(selectedId));
			setHovered(hoveredId && hoveredId !== selectedId ? readRect(hoveredId) : null);
		};

		update();

		const ro = new ResizeObserver(update);

		const observe = (id: string | null) => {
			if (!id) return;
			const el = queryNode(id).get().dom as HTMLElement | null;
			if (el) ro.observe(el);
		};

		observe(selectedId);
		observe(hoveredId);

		window.addEventListener("scroll", update, true);

		return () => {
			ro.disconnect();
			window.removeEventListener("scroll", update, true);
		};
	}, [selectedId, hoveredId, queryNode]);

	return (
		<>
			{hovered && (
				<div
					style={{
						position: "fixed",
						...hovered,
						outline: "1px solid #4fc3f7",
						pointerEvents: "none",
						zIndex: 2147483647,
					}}
				/>
			)}

			{selected && (
				<div
					style={{
						position: "fixed",
						...selected,
						outline: "2px solid #ff9800",
						pointerEvents: "none",
						zIndex: 2147483647,
					}}
				/>
			)}
		</>
	);
}
