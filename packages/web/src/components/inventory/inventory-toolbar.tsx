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

const SearchField = styled(OutlinedInput)(() => ({
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
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          size="small"
          onClick={onAdd}
        >
          <Typography variant="button" sx={{ textTransform: 'none' }}>
            Add item
          </Typography>
        </Button>
        <Tooltip title="Refresh items">
          <IconButton
            onClick={onRefresh}
            size="small"
            sx={{
              borderRadius: 1,
              border: '1px solid',
            }}
          >
            <RefreshIcon color="action" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
});
