const API_BASE = "http://localhost:8000";

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
	const res = await fetch(`${API_BASE}${path}`, {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		...options,
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || res.statusText);
	}

	return res.json();
}
