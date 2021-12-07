import { Box } from '@mui/material';
import { CreateItemDto } from '@unfrl/usufruct-sdk';
import React from 'react';
import {
  Content,
  FormActions,
  InventoryTable,
  InventoryToolbar,
  ItemForm,
  ResponsiveDrawer,
} from '../components';

const Inventory = () => {
  const [item, setItem] = React.useState<CreateItemDto>({
    name: '',
    description: '',
  });
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <InventoryToolbar onAdd={handleOpen} />
      <Box sx={{ marginBottom: 2 }} />
      <InventoryTable onRowClick={handleOpen} />
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
};

export default Inventory;
