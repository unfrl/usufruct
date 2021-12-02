import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const TEMP_DATA = [
  {
    id: '1',
    name: 'Flathead Screwdriver',
    color: 'blue',
  },
  {
    id: '2',
    name: 'Arc Welder',
    color: 'red',
  },
  {
    id: '3',
    name: 'Portable Speaker',
    color: 'black',
  },
  {
    id: '4',
    name: 'Shop Vaccum',
    color: 'yellow',
  },
  {
    id: '5',
    name: 'Battery Charger',
    color: 'black',
  },
];

export interface InventoryTableProps {
  onRowClick: (id: string) => void;
}

export const InventoryTable = (props: InventoryTableProps) => {
  // TODO: using table directly here just for testing, want to refactor to common component that renders via generic interfaces/types
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Color</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {TEMP_DATA.map((data) => (
            <TableRow
              key={data.id}
              onClick={() => props.onRowClick(data.id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
              role="button"
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.color}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
