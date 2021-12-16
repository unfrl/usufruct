import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  styled,
  Tooltip,
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
  onRefresh: () => void;
}

export const InventoryToolbar = observer((props: InventoryToolbarProps) => {
  const { onAdd, searchValue, onSearchChange, onRefresh } = props;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <SearchField
        placeholder="Search"
        size="small"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ maxWidth: '50%' }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
      <Stack direction="row" spacing={2}>
        <Tooltip title="Refresh table">
          <IconButton onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={onAdd}
        >
          <Typography variant="button" sx={{ textTransform: 'none' }}>
            Add item
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
});
