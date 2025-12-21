import { Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Home() {
	return (
		<Container>
			<Stack spacing={3} p={4}>
				<Typography variant="h2" align="center">
					What do you want to do?
				</Typography>

				<Button color="primary" variant="contained" component={Link} to={"/layouts"}>
					Manage Layouts
				</Button>
			</Stack>
		</Container>
	);
}
