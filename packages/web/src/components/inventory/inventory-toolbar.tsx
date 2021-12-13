import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  styled,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';

const SearchField = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiInputBase-input': {
    paddingTop: 7,
    paddingBottom: 6.5,
  },
}));

export interface InventoryToolbarProps {
  onAdd: () => void;
  searchValue: string;
  onSearchChange: (newValue: string) => void;
}

export const InventoryToolbar = observer((props: InventoryToolbarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}
    >
      <SearchField
        placeholder="Search"
        size="small"
        value={props.searchValue}
        onChange={(e) => props.onSearchChange(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={props.onAdd}
      >
        <Typography variant="button" sx={{ textTransform: 'none' }}>
          Add item
        </Typography>
      </Button>
    </Box>
  );
});
