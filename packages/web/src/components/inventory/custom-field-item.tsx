import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, TextField, Tooltip } from '@mui/material';
import { CustomFieldDto } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import { ComboBox } from '../common';

export interface CustomFieldItemProps {
  field: CustomFieldDto;
  onChange: (field: CustomFieldDto) => void;
  onRemove: () => void;
  attributes: { title: string }[];
}

export const CustomFieldItem = observer((props: CustomFieldItemProps) => {
  const { field, onChange, onRemove, attributes } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <ComboBox
        filterSelectedOptions
        fullWidth
        label="Field"
        options={attributes}
        value={{ title: field.name }}
        onChange={(value) => {
          // shouldn't happen, we're not using multi-select
          if (Array.isArray(value)) {
            return;
          }

          onChange({
            name: value?.title ?? '',
            value: '', // reset the value when field changes, might be a different data type
          });
        }}
      />
      <TextField
        fullWidth
        label="Value"
        size="small"
        value={field.value}
        onChange={(e) => onChange({ ...field, value: e.target.value })}
      />
      <Tooltip title="Remove field">
        <IconButton
          onClick={onRemove}
          size="small"
          sx={{ width: 30, height: 30 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
});
