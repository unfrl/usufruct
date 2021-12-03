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
  Typography,
} from '@mui/material';

export interface InventoryToolbarProps {
  onAdd: () => void;
}

export const InventoryToolbar = (props: InventoryToolbarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Hidden smDown>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          color="inherit"
          onClick={props.onAdd}
        >
          <Typography variant="button">Add item</Typography>
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton aria-label="Add item" onClick={props.onAdd}>
          <AddOutlineIcon />
        </IconButton>
      </Hidden>
      <TextField
        placeholder="Search"
        size="small"
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
};
