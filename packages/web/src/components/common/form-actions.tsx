import { LoadingButton } from '@mui/lab';
import { Button, Stack, StackProps } from '@mui/material';

export interface FormActionsProps {
  cancelText?: string;
  onCancel: () => void;
  saveText?: string;
  onSave: () => void;
  saveDisabled: boolean;
  saving: boolean;
  containerProps?: StackProps;
}

export const FormActions = (props: FormActionsProps) => {
  const {
    cancelText,
    onCancel,
    saveText,
    onSave,
    saveDisabled,
    saving,
    containerProps,
  } = props;

  return (
    <Stack direction="row" spacing={2} {...containerProps}>
      <Button color="inherit" onClick={onCancel}>
        {cancelText ?? 'Cancel'}
      </Button>
      <LoadingButton
        color="primary"
        variant="contained"
        onClick={onSave}
        disabled={saveDisabled}
        loading={saving}
      >
        {saveText ?? 'Save'}
      </LoadingButton>
    </Stack>
  );
};
