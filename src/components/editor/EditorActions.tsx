import { Stack, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

type EditorActionsProps = {
	handleSave: () => void;
	isSaveNeeded: Boolean;
};

export function EditorActions({ handleSave, isSaveNeeded }: EditorActionsProps) {
	return (
		<Stack direction="row">
			<IconButton onClick={handleSave}>{isSaveNeeded ? <SaveOutlinedIcon /> : <SaveIcon />}</IconButton>
		</Stack>
	);
}
