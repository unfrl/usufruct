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

const Inventory = observer(() => {
  const { inventory, toasts } = useStores();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState<CreateItemDto>({
    name: '',
    description: '',
  });

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

  return (
    <Box>
      <InventoryToolbar onAdd={handleOpen} />
      <Box sx={{ marginBottom: 2 }} />
      <BasicTable
        rows={inventory.items}
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
          <FormActions onCancel={handleClose} onSave={handleClose} />
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
