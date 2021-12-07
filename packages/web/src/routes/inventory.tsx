import { Box, Typography } from '@mui/material';
import { CreateItemDto } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import {
  BasicTable,
  Content,
  FormActions,
  InventoryToolbar,
  ItemForm,
  ResponsiveDrawer,
} from '../components';
import { useStores } from '../hooks';
import { tryParseRestError } from '../utils';

const Inventory = observer(() => {
  const { inventory, toasts } = useStores();
  const [item, setItem] = React.useState<CreateItemDto>({
    name: '',
    description: '',
  });
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const init = async () => {
      try {
        await inventory.loadAllItems();
      } catch (error) {
        toasts.error(tryParseRestError(error));
      }

      setLoading(false);
    };

    init();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <InventoryToolbar onAdd={handleOpen} />
      <Box sx={{ marginBottom: 2 }} />
      {loading ? (
        <Typography>Loading the stuff...</Typography>
      ) : (
        <BasicTable
          rows={inventory.items}
          columns={[
            {
              key: 'id',
              title: 'ID',
            },
            {
              key: 'name',
              title: 'Name',
            },
            {
              key: 'description',
              title: 'Description',
            },
          ]}
          onRowClick={(row) => {
            console.log('yooo', row);
            handleOpen();
          }}
        />
      )}
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
