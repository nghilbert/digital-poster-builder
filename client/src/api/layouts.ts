import { request } from "./client";
import type { components } from "./types";

type LayoutCreate = components["schemas"]["LayoutCreate"];
type LayoutRead = components["schemas"]["LayoutRead"];
type LayoutUpdate = components["schemas"]["LayoutUpdate"];

export function listLayouts() {
	return request<LayoutRead[]>("/layouts");
}

export function getLayout(id: string) {
	return request<LayoutRead>(`/layouts/${id}`);
}

export function createLayout(payload: LayoutCreate) {
	return request<LayoutRead>("/layouts", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export function updateLayout(id: string, payload: LayoutUpdate) {
	return request<LayoutRead>(`/layouts/${id}`, {
		method: "PATCH",
		body: JSON.stringify(payload),
	});
}

export function deleteLayout(id: string) {
	return request<void>(`/layouts/${id}`, {
		method: "DELETE",
	});
}
