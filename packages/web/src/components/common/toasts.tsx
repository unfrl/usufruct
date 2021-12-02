import { Alert, Snackbar } from '@mui/material';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks';

export const Toasts = observer(() => {
  const { toasts } = useStores();

  if (!toasts.toast) {
    return null;
  }

  return (
    <Snackbar
      open={toasts.isOpen}
      onClose={toasts.close}
      autoHideDuration={6000}
    >
      <Alert
        onClose={toasts.close}
        severity={toasts.toast.type}
        variant="filled"
      >
        {toasts.toast.message}
      </Alert>
    </Snackbar>
  );
});
