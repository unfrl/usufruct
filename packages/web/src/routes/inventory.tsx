import { Box, Chip, ListItem, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { Category, Label, UpsertItemDto } from '@unfrl/usufruct-sdk';
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
      <GridToolbarFilterButton
        sx={{ marginRight: 1 }}
        componentsProps={{ button: { color: 'inherit' } }}
      />
      <GridToolbarExport color="inherit" />
    </GridToolbarContainer>
  );
};

const COLUMNS: GridColDef[] = [
  { field: 'name', headerName: 'Name', minWidth: 100 },
  { field: 'description', headerName: 'Description', minWidth: 150, flex: 1 },
  {
    field: 'categories',
    headerName: 'Category',
    minWidth: 150,
    // TODO: disabling these two on categories & labels until they're implemented
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      return (
        <Typography>
          {params.row.categories
            .map((category: Category) => category.name)
            .join(', ')}
        </Typography>
      );
    },
  },
  {
    field: 'labels',
    headerName: 'Labels',
    minWidth: 150,
    flex: 1,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            display: 'flex',
            listStyle: 'none',
          }}
        >
          {params.row.labels.map((label: Label) => (
            <ListItem key={label.id} sx={{ padding: 0, marginRight: 1 }}>
              <Chip label={label.name} size="small" />
            </ListItem>
          ))}
        </Box>
      );
    },
  },
  { field: 'created', headerName: 'Created', minWidth: 175, type: 'date' },
  { field: 'updated', headerName: 'Updated', minWidth: 175, type: 'date' },
];

const DEFAULT_ITEM_DTO: UpsertItemDto = {
  name: '',
  description: '',
  categoryNames: [],
  labelNames: [],
};

const Inventory = observer(() => {
  const { inventory, toasts } = useStores();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState<UpsertItemDto>(DEFAULT_ITEM_DTO);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      try {
        await inventory.loadAll();
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

  const handleSelect = (itemId: string) => {
    const inventoryItem = inventory.items.find((item) => item.id === itemId);
    if (!inventoryItem) {
      return;
    }

    const { categories, labels, ...rest } = inventoryItem;

    setItem({
      categoryNames: categories.map((c) => c.name),
      labelNames: labels.map((l) => l.name),
      ...rest,
    });
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
          disableSelectionOnClick
          rows={inventory.filteredItems}
          columns={COLUMNS}
          components={{ Toolbar: GridToolbar }}
          loading={loading}
          onSelectionModelChange={(model) => {
            // TODO: need to handle creating vs updating vs duplicating & creating new
            // maybe the creation step needs to be distinct from the form being shown in the drawer?
            if (model.length) {
              handleSelect(String(model[0]));
              handleOpen();
            }
          }}
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
          <ItemForm
            item={item}
            onChange={setItem}
            categories={inventory.categories}
            labels={inventory.labels}
          />
        </Content>
      </ResponsiveDrawer>
    </Box>
  );
});

export default Inventory;
