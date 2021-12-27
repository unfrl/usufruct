import { Container, Typography } from '@mui/material';
import notFound from '../images/not-found.svg';

export const NotFound = () => {
  return (
    <Container
      sx={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={notFound} alt="Not found" style={{ maxWidth: 250 }} />
      <Typography align="center" variant="h5" sx={{ marginTop: 2 }}>
        Page not found
      </Typography>
    </Container>
  );
};
