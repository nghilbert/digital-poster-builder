import type { UserComponent } from "@craftjs/core";

import { Container } from "./Container";
import { RootBox } from "./RootBox";

export const userComponents = {
	Container,
	RootBox,
} as const satisfies Record<string, UserComponent>;
