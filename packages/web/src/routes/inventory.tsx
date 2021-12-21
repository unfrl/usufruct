import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AddItemDrawer, InventoryToolbar } from '../components';
import { useStores } from '../hooks';

const InventoryDataGrid = React.lazy(
  () => import('../components/inventory/inventory-data-grid'),
);

const Inventory = observer(() => {
  const { inventory } = useStores();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  // TODO: just for testing, moving search to autocomplete component
  const handleSearchChange = (value: string) => {
    inventory.setQuery(value);
  };

  const handleItemSelect = (itemId: string) => {
    // note: this is the item's GUID, but we want to route by the shortId
    const item = inventory.items.find((i) => i.id === itemId);
    if (item) {
      navigate(`/inventory/${item.shortId}`);
    }
  };

  return (
    <Box>
      <InventoryToolbar
        onAdd={handleOpen}
        searchValue={inventory.query}
        onSearchChange={handleSearchChange}
        onRefresh={inventory.loadAllItems}
      />
      <Box sx={{ marginTop: 2, height: '70vh', width: '100%' }}>
        <InventoryDataGrid onItemSelect={handleItemSelect} />
      </Box>
      <AddItemDrawer open={open} onClose={handleClose} />
    </Box>
  );
});

export default Inventory;
