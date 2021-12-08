import AddIcon from '@mui/icons-material/Add';
import AddOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Hidden,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';

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
      <Hidden smDown>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          size="small"
          color="primary"
          onClick={props.onAdd}
        >
          <Typography variant="button">Add item</Typography>
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title="Add item">
          <IconButton aria-label="Add item" onClick={props.onAdd}>
            <AddOutlineIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <TextField
        placeholder="Search"
        size="small"
        value={props.searchValue}
        onChange={(e) => props.onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
});
