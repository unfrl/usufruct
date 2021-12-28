import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { Library } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useStores } from '../hooks';
import noData from '../images/no-data.svg';
import { tryParseRestError } from '../utils';

const LibraryItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 175,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}));

const AppHome = () => {
  const [libraries, setLibraries] = React.useState<Library[]>([]);
  const { client, toasts } = useStores();

  React.useEffect(() => {
    const load = async () => {
      try {
        setLibraries(await client.getLibraries());
      } catch (error) {
        toasts.error(tryParseRestError(error));
      }
    };

    load();
  }, []);

  // TODO: handle case where it's first time and there's no libraries, prob toggle walk through or something

  return (
    <Stack>
      <Link
        to="inventory"
        component={RouterLink}
        sx={{ color: 'inherit' }}
        underline="always"
      >
        Admin inventory UI
      </Link>
      <Typography variant="h2" fontSize="large" my={2}>
        Popular libraries (WIP)
      </Typography>
      <Grid container spacing={2}>
        {libraries.map((library) => (
          <Grid key={library.id} item xs={12} sm={6} md={4}>
            <Link
              to={`l/${library.slug}`}
              component={RouterLink}
              sx={{ color: 'inherit' }}
            >
              <Card sx={{ height: 250 }}>
                <CardActionArea sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={noData}
                    alt={library.name}
                    sx={{ objectFit: 'contain', padding: 2 }}
                  />
                  <CardContent sx={{ paddingTop: 0 }}>
                    <Typography
                      noWrap
                      gutterBottom
                      title={library.name}
                      variant="h5"
                      component="div"
                    >
                      {library.name}
                    </Typography>
                    <Typography
                      noWrap
                      title={library.description}
                      variant="body2"
                      color="text.secondary"
                    >
                      {library.description || '---'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default observer(AppHome);
