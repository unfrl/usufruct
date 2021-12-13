import { Box, Chip, ListItem, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { Category, Label } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks';
import { tryParseRestError } from '../../utils';

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

export interface InventoryDataGridProps {
  onItemSelect: (itemId: string) => void;
}

export const InventoryDataGrid = observer((props: InventoryDataGridProps) => {
  const { onItemSelect } = props;
  const { inventory, toasts } = useStores();
  const [loading, setLoading] = React.useState(false);

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

  return (
    <DataGrid
      disableSelectionOnClick
      rows={inventory.filteredItems}
      columns={COLUMNS}
      components={{ Toolbar: GridToolbar }}
      loading={loading}
      onSelectionModelChange={(model) => {
        if (model.length) {
          onItemSelect(String(model[0]));
        }
      }}
    />
  );
});
