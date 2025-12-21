import { Box, Divider, Paper, Stack } from "@mui/material";
import { Children, type PropsWithChildren } from "react";

export function SidePanel({ children }: PropsWithChildren) {
	return (
		<Paper elevation={3} sx={{ minWidth: 360, height: "100%" }}>
			<Stack height="100%" divider={<Divider flexItem />}>
				{Children.map(children, (child) => (
					<Box flex={1} overflow="auto">
						{child}
					</Box>
				))}
			</Stack>
		</Paper>
	);
}
