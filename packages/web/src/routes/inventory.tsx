import { Box, Button } from '@mui/material';
import React from 'react';
import {
  Content,
  InventoryTable,
  InventoryToolbar,
  ItemDefinitionForm,
  ResponsiveDrawer,
} from '../components';

const Inventory = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <InventoryToolbar onAdd={() => setOpen(true)} />
      <Box sx={{ marginBottom: 2 }} />
      <InventoryTable onRowClick={() => setOpen(true)} />
      <ResponsiveDrawer
        title="New item"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        headerOptions={
          <Box>
            <Button
              color="inherit"
              sx={{ marginRight: 2 }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={() => setOpen(false)}
            >
              Save
            </Button>
          </Box>
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
