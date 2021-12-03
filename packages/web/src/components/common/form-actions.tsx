import { Box, Button } from '@mui/material';

export interface FormActionsProps {
  cancelText?: string;
  onCancel: () => void;
  saveText?: string;
  onSave: () => void;
}

export const FormActions = (props: FormActionsProps) => {
  const { cancelText, onCancel, saveText, onSave } = props;

  return (
    <Box>
      <Button color="inherit" sx={{ marginRight: 2 }} onClick={onCancel}>
        {cancelText ?? 'Cancel'}
      </Button>
      <Button color="success" variant="contained" onClick={onSave}>
        {saveText ?? 'Save'}
      </Button>
    </Box>
  );
};
