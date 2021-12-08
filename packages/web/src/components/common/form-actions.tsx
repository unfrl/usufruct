import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';

export interface FormActionsProps {
  cancelText?: string;
  onCancel: () => void;
  saveText?: string;
  onSave: () => void;
  saveDisabled: boolean;
  saving: boolean;
}

export const FormActions = (props: FormActionsProps) => {
  const { cancelText, onCancel, saveText, onSave, saveDisabled, saving } =
    props;

  return (
    <Box>
      <Button color="inherit" sx={{ marginRight: 2 }} onClick={onCancel}>
        {cancelText ?? 'Cancel'}
      </Button>
      <LoadingButton
        color="success"
        variant="contained"
        onClick={onSave}
        disabled={saveDisabled}
        loading={saving}
      >
        {saveText ?? 'Save'}
      </LoadingButton>
    </Box>
  );
};
