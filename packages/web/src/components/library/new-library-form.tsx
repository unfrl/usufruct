import { Stack, TextField } from '@mui/material';
import { UpsertLibraryDto } from '@unfrl/usufruct-sdk';
import React from 'react';
import { FormActions } from '../common';

export interface NewLibraryFormProps {
  onSave: (name: UpsertLibraryDto) => void;
  onCancel: () => void;
}

export const NewLibraryForm = (props: NewLibraryFormProps) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const { onSave, onCancel } = props;

  return (
    <Stack>
      <TextField
        required
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        size="small"
      />
      <TextField
        multiline
        minRows={2}
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        size="small"
      />
      <FormActions
        saveText="Create"
        onCancel={onCancel}
        onSave={() => onSave({ name, description })}
        saveDisabled={!name}
        saving={false}
        containerProps={{ justifyContent: 'flex-end', marginTop: 2 }}
      />
    </Stack>
  );
};
