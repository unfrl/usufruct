import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, TextField } from '@mui/material';
import React from 'react';
import { ComboBox, ComboBoxValue } from '../common';

export interface CustomFieldsProps {
  readonly?: boolean;
}

export const CustomFields = () => {
  const [field, setField] = React.useState<ComboBoxValue>(null);

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <ComboBox
          filterSelectedOptions
          fullWidth
          options={DEMO_CUSTOM_FIELDS}
          label="Field"
          value={field}
          onChange={setField}
        />
        <TextField fullWidth label="Value" size="small" />
      </Stack>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<AddIcon />}
        size="small"
        sx={{ alignSelf: 'flex-start' }}
      >
        Add field
      </Button>
    </Stack>
  );
};

const DEMO_CUSTOM_FIELDS = [
  { id: 1, title: 'Type' },
  { id: 2, title: 'Size' },
  { id: 3, title: 'Color' },
];
