import { Box, Typography } from '@mui/material';
import React from 'react';
import { InventoryTable, ResponsiveDrawer } from '../components';

const Inventory = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <InventoryTable onRowClick={() => setOpen(true)} />
      <ResponsiveDrawer
        title="New thing"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Typography sx={{ padding: 2 }}>TODO add stuff</Typography>
      </ResponsiveDrawer>
    </Box>
  );
};

export default Inventory;
