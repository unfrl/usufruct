import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks';
import { tryParseRestError } from '../../utils';
import { ChipList } from '../common';

const COLUMNS: GridColDef[] = [
  { field: 'name', headerName: 'Name', minWidth: 100 },
  { field: 'description', headerName: 'Description', minWidth: 150, flex: 1 },
  {
    field: 'categories',
    headerName: 'Category',
    minWidth: 100,
    // TODO: disabling these two on categories & labels until they're implemented
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      return <ChipList chips={params.row.categories} color="primary" />;
    },
  },
  {
    field: 'labels',
    headerName: 'Labels',
    minWidth: 200,
    flex: 1,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      return <ChipList chips={params.row.labels} />;
    },
  },
  { field: 'created', headerName: 'Created', minWidth: 175, type: 'date' },
  { field: 'updated', headerName: 'Updated', minWidth: 175, type: 'date' },
];

export interface InventoryDataGridProps {
  onItemSelect: (itemId: string) => void;
}

const InventoryDataGrid = (props: InventoryDataGridProps) => {
  const { onItemSelect } = props;
  const { inventory, toasts } = useStores();

  React.useEffect(() => {
    const load = async () => {
      try {
        // TODO: ideally dont wanna load all items every item this component is rendered
        await inventory.loadAllItems();
      } catch (error) {
        toasts.error(tryParseRestError(error));
      }
    };

    load();
  }, []);

  return (
    <DataGrid
      loading={inventory.loading}
      rows={inventory.filteredItems}
      rowsPerPageOptions={[100]}
      columns={COLUMNS}
      onSelectionModelChange={(model) => {
        if (model.length) {
          onItemSelect(String(model[0]));
        }
      }}
    />
  );
};

export default observer(InventoryDataGrid);
