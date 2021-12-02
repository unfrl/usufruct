import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';

export interface InventoryToolbarProps {
  onAdd: () => void;
}

export const InventoryToolbar = (props: InventoryToolbarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        size="small"
        color="inherit"
        onClick={props.onAdd}
      >
        Add item
      </Button>
    </Box>
  );
};
