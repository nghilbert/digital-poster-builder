import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { createLayout, deleteLayout, listLayouts } from "api/layouts";
import type { components } from "api/types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type LayoutRead = components["schemas"]["LayoutRead"];

export function LayoutList() {
	const navigate = useNavigate();
	const [layouts, setLayouts] = useState<LayoutRead[]>([]);

	useEffect(() => {
		listLayouts().then(setLayouts).catch(console.error);
	}, []);

	function handleCreate() {
		createLayout({
			name: "Untitled Layout",
		})
			.then((layout) => {
				navigate(`/layouts/${layout.id}`, { replace: true });
			})
			.catch(console.error);
	}

	function handleDelete(id: string) {
		const confirmed = window.confirm("Delete this layout?");
		if (!confirmed) return;

		deleteLayout(id)
			.then(() => {
				setLayouts((prev) => prev.filter((l) => String(l.id) !== String(id)));
			})
			.catch(console.error);
	}

	return (
		<Container>
			<Stack spacing={3} p={4}>
				<Typography variant="h2" align="center">
					Layouts
				</Typography>

				<Button color="primary" variant="contained" onClick={handleCreate}>
					New Layout
				</Button>

				{layouts.map((layout) => (
					<Box
						key={layout.id}
						display="flex"
						justifyContent="space-between"
						border={1}
						borderColor="divider"
						borderRadius={1}
					>
						<Button component={Link} to={`/layouts/${layout.id}`} startIcon={<Edit />}>
							{layout.name}
						</Button>

						<IconButton color="error" onClick={() => handleDelete(layout.id)}>
							<Delete />
						</IconButton>
					</Box>
				))}
			</Stack>
		</Container>
	);
}
