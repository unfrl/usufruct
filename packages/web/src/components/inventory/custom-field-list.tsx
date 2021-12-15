import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';
import { CustomFieldDto, ItemAttribute } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks';
import { tryParseRestError } from '../../utils';
import { CustomFieldItem } from './custom-field-item';

export const CustomFieldList = observer(() => {
  const { client, toasts } = useStores();
  const [attributes, setAttributes] = React.useState<ItemAttribute[]>([]);
  const [fields, setFields] = React.useState<CustomFieldDto[]>([]);

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
    setFields([...fields, { name: '', value: '' }]);
  };

  const handleRemoveField = (index: number) => {
    const copy = fields.slice();
    copy.splice(index, 1);
    setFields(copy);
  };

  const handleUpdateField = (index: number, updatedField: CustomFieldDto) => {
    const copy = fields.slice();
    copy[index] = updatedField;
    setFields(copy);
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
