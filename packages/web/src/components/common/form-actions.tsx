import { Box, Button } from '@mui/material';

export interface FormActionsProps {
  cancelText?: string;
  onCancel: () => void;
  saveText?: string;
  onSave: () => void;
  canSave: boolean;
}

export const FormActions = (props: FormActionsProps) => {
  const { cancelText, onCancel, saveText, onSave, canSave } = props;

  return (
    <Box>
      <Button color="inherit" sx={{ marginRight: 2 }} onClick={onCancel}>
        {cancelText ?? 'Cancel'}
      </Button>
      <Button
        color="success"
        variant="contained"
        onClick={onSave}
        disabled={!canSave}
      >
        {saveText ?? 'Save'}
      </Button>
    </Box>
  );
};
