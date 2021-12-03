import { Box } from '@mui/material';
import React from 'react';
import {
  Content,
  FormActions,
  InventoryTable,
  InventoryToolbar,
  ItemDefinitionForm,
  ResponsiveDrawer,
} from '../components';

const Inventory = () => {
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
          <ItemDefinitionForm />
        </Content>
      </ResponsiveDrawer>
    </Box>
  );
};

export default Inventory;
