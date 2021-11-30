import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { ResponsiveDrawer } from '../components';

const Inventory = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box>
      <Button onClick={() => setOpen(true)} variant="outlined" color="inherit">
        Test the drawer
      </Button>
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
