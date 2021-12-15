import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';
import { CustomFieldDto, ItemAttribute } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks';
import { tryParseRestError } from '../../utils';
import { CustomFieldItem } from './custom-field-item';

export interface CustomFieldListProps {
  fields: CustomFieldDto[];
  onChange: (fields: CustomFieldDto[]) => void;
}

export const CustomFieldList = observer((props: CustomFieldListProps) => {
  const { fields, onChange } = props;
  const { client, toasts } = useStores();
  const [attributes, setAttributes] = React.useState<ItemAttribute[]>([]);

  React.useEffect(() => {
    const load = async () => {
      console.log('loading attributes...');
      try {
        setAttributes(await client.getItemAttributes());
      } catch (error) {
        toasts.error(tryParseRestError(error));
      }
    };

    load();
  }, []);

  const availableAttributes = attributes
    .filter((attr) => !fields.find((field) => field.name === attr.name))
    .map((attr) => ({ title: attr.name }));

  const handleAddField = () => {
    onChange([...fields, { name: '', value: '' }]);
  };

  const handleRemoveField = (index: number) => {
    const copy = fields.slice();
    copy.splice(index, 1);
    onChange(copy);
  };

  const handleUpdateField = (index: number, updatedField: CustomFieldDto) => {
    const copy = fields.slice();
    copy[index] = updatedField;
    onChange(copy);
  };

  return (
    <Stack spacing={2}>
      {fields.map((field, index) => (
        <CustomFieldItem
          key={`${field.name}-${index}`}
          attributes={availableAttributes}
          field={field}
          onChange={(updated) => handleUpdateField(index, updated)}
          onRemove={() => handleRemoveField(index)}
        />
      ))}
      <Button
        color="inherit"
        variant="outlined"
        size="small"
        startIcon={<AddIcon />}
        sx={{ alignSelf: 'flex-start' }}
        onClick={handleAddField}
      >
        Add field
      </Button>
    </Stack>
  );
});
