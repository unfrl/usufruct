import { Stack, TextField } from '@mui/material';
import React from 'react';
import { FormActions } from '../common';

export interface NewLibraryFormProps {
  onSave: (name: string) => void;
  onCancel: () => void;
}

export const NewLibraryForm = (props: NewLibraryFormProps) => {
  const [name, setName] = React.useState('');
  const { onSave, onCancel } = props;

  return (
    <Stack>
      <TextField
        required
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <FormActions
        saveText="Create"
        onCancel={onCancel}
        onSave={() => onSave(name)}
        saveDisabled={!name}
        saving={false}
        containerProps={{ justifyContent: 'flex-end', marginTop: 2 }}
      />
    </Stack>
  );
};
