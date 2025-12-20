import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function LayoutList() {
	return (
		<Stack spacing={2} p={4}>
			<Typography>Layouts</Typography>

			<Button component={Link} to="/layouts/new" variant="contained" color="primary">
				New Layout
			</Button>
		</Stack>
	);
}
