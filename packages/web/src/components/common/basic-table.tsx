import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export interface Column<T> {
  key: keyof T & string;
  title: string;
  customRender?: (row: T) => JSX.Element | string;
}

export interface BasicTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  onRowClick: (row: T) => void;
}

export const BasicTable = <T extends { id: string | number }>(
  props: BasicTableProps<T>,
) => {
  const { rows, columns, onRowClick } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => onRowClick(row)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
              role="button"
            >
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.key}`}>
                  {column.customRender
                    ? column.customRender(row)
                    : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
