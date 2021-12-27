import { Grid, Paper, Stack, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const LibraryItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 200,
}));

const SAMPS = [1, 2, 3, 4, 5, 6];

const Home = () => {
  return (
    <Stack>
      <Link to="inventory">
        <Typography>Admin inventory UI</Typography>
      </Link>
      <Typography variant="h2" fontSize="large" my={2}>
        Popular libraries (WIP)
      </Typography>
      <Grid container spacing={2}>
        {SAMPS.map((samp) => (
          <Grid key={samp} item xs={12} sm={6} md={4}>
            <LibraryItem>{samp}</LibraryItem>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Home;
