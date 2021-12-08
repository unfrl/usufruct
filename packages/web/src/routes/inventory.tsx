import { Box } from '@mui/material';
import { CreateItemDto, Item } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import {
  BasicTable,
  Column,
  Content,
  FormActions,
  InventoryToolbar,
  ItemForm,
  ResponsiveDrawer,
} from '../components';
import { useStores } from '../hooks';
import { tryParseRestError } from '../utils';

const ITEM_COLUMNS: Column<Item>[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'description',
    title: 'Description',
  },
  {
    key: 'created',
    title: 'Created',
    customRender: (row) => new Date(row.created).toLocaleDateString(),
  },
  {
    key: 'updated',
    title: 'Updated',
    customRender: (row) => new Date(row.updated).toLocaleDateString(),
  },
];

const DEFAULT_ITEM_DTO: CreateItemDto = {
  name: '',
  description: '',
};

const Inventory = observer(() => {
  const { inventory, toasts } = useStores();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState<CreateItemDto>(DEFAULT_ITEM_DTO);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      try {
        await inventory.loadAllItems();
      } catch (error) {
        toasts.error(tryParseRestError(error));
      }
    };

    init();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // TODO: real impl will want this debounced and maybe could just use autocomplete instead of filtering whole table
  const handleSearchChange = (value: string) => {
    inventory.setQuery(value);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await inventory.createItem(item);

      toasts.success('Item created!');

      setItem(DEFAULT_ITEM_DTO);
      setOpen(false);
    } catch (error) {
      toasts.error(tryParseRestError(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <InventoryToolbar
        onAdd={handleOpen}
        searchValue={inventory.query}
        onSearchChange={handleSearchChange}
      />
      <Box sx={{ marginBottom: 2 }} />
      <BasicTable
        rows={inventory.filteredItems}
        columns={ITEM_COLUMNS}
        onRowClick={(row) => {
          console.log('yooo', row);
          handleOpen();
        }}
      />
      <ResponsiveDrawer
        keepMounted
        title="New item"
        anchor="right"
        open={open}
        onClose={handleClose}
        headerOptions={
          <FormActions
            onCancel={handleClose}
            onSave={handleSave}
            saveDisabled={!item.name}
            saving={saving}
          />
        }
      >
        <Content>
          <ItemForm item={item} onChange={setItem} />
        </Content>
      </ResponsiveDrawer>
    </Box>
  );
});

export default Inventory;
