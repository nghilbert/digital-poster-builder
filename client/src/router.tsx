import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { LayoutEditor } from "./pages/LayoutEditor";
import { LayoutList } from "./pages/LayoutList";
import { AppShell } from "./shells/AppShell";

export const router = createBrowserRouter([
	{
		element: <AppShell />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/layouts",
				element: <LayoutList />,
			},
			{
				path: "/layouts/:layoutId",
				element: <LayoutEditor />,
			},
		],
	},
]);
