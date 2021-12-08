import { Box, BoxProps, CircularProgress } from '@mui/material';

export const Spinner = (props: BoxProps) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
      {...props}
    >
      <CircularProgress />
    </Box>
  );
};
