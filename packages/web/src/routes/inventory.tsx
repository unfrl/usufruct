import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { InventoryToolbar, NewItemDrawer } from '../components';
import { useStores } from '../hooks';

const InventoryDataGrid = React.lazy(
  () => import('../components/inventory/inventory-data-grid'),
);

const Inventory = observer(() => {
  const { inventory } = useStores();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  // TODO: just for testing, moving search to autocomplete component
  const handleSearchChange = (value: string) => {
    inventory.setQuery(value);
  };

  const handleItemSelect = (_itemId: string) => {
    // TODO: need to handle creating vs updating vs duplicating & creating new
    // maybe the creation step needs to be distinct from the form being shown in the drawer?
    handleOpen();
  };

  return (
    <Box>
      <InventoryToolbar
        onAdd={handleOpen}
        searchValue={inventory.query}
        onSearchChange={handleSearchChange}
      />
      <Box sx={{ marginTop: 2, height: '70vh', width: '100%' }}>
        <InventoryDataGrid onItemSelect={handleItemSelect} />
      </Box>
      <NewItemDrawer open={open} onClose={handleClose} />
    </Box>
  );
});

export default Inventory;
