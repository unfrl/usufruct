import { Box, Typography } from '@mui/material';
import React from 'react';
import {
  Content,
  InventoryTable,
  InventoryToolbar,
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
        title="New thing"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Content>
          <Typography>TODO add stuff</Typography>
        </Content>
      </ResponsiveDrawer>
    </Box>
  );
};

export default Inventory;
