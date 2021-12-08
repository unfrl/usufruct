import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { CreateItemDto } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import {
  Content,
  FormActions,
  InventoryToolbar,
  ItemForm,
  ResponsiveDrawer,
} from '../components';
import { useStores } from '../hooks';
import { tryParseRestError } from '../utils';

const GridToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const COLUMNS: GridColDef[] = [
  { field: 'name', headerName: 'Name', minWidth: 150, flex: 0.5 },
  { field: 'description', headerName: 'Description', minWidth: 150, flex: 2 },
  { field: 'created', headerName: 'Created', type: 'dateTime', minWidth: 150 },
  { field: 'updated', headerName: 'Updated', type: 'dateTime', minWidth: 150 },
];

const DEFAULT_ITEM_DTO: CreateItemDto = {
  name: '',
  description: '',
};

const Inventory = observer(() => {
  const { inventory, toasts } = useStores();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState<CreateItemDto>(DEFAULT_ITEM_DTO);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        await inventory.loadAllItems();
      } catch (error) {
        toasts.error(tryParseRestError(error));
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // TODO: just for testing, moving search to autocomplete component
  const handleSearchChange = (value: string) => {
    inventory.setQuery(value);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const newItem = await inventory.createItem(item);

      toasts.success(`${newItem.name} added!`);

      setItem(DEFAULT_ITEM_DTO);
      setOpen(false);
    } catch (error) {
      toasts.error(tryParseRestError(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <InventoryToolbar
        onAdd={handleOpen}
        searchValue={inventory.query}
        onSearchChange={handleSearchChange}
      />
      <Box sx={{ marginTop: 2, height: '70vh', width: '100%' }}>
        <DataGrid
          rows={inventory.filteredItems}
          columns={COLUMNS}
          components={{ Toolbar: GridToolbar }}
          loading={loading}
        />
      </Box>
      <ResponsiveDrawer
        keepMounted
        title="New item"
        anchor="right"
        open={open}
        onClose={handleClose}
        headerOptions={
          <FormActions
            onCancel={handleClose}
            onSave={handleSave}
            saveDisabled={!item.name}
            saving={saving}
          />
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
