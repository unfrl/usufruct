import { Grid, Stack, styled, Tab, Tabs, Typography } from '@mui/material';
import { Library } from '@unfrl/usufruct-sdk';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DocumentHead, Spinner } from '../components';
import { useStores } from '../hooks';
import noData from '../images/no-data.svg';

const ProfileImage = styled('img')(() => ({
  height: 150,
  objectFit: 'contain',
}));

const LibraryHome = () => {
  const { library, toasts } = useStores();
  const [selected, setSelected] = React.useState<Library | null>(null);
  const [ready, setReady] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const { slug } = useParams<'slug'>();

  React.useEffect(() => {
    const load = async () => {
      try {
        if (slug) {
          setSelected(await library.fetchLibrary(slug));
        }
      } catch (error) {
        console.error('failed to fetch library', error);
        toasts.error((error as any).message);
      } finally {
        setReady(true);
      }
    };

    load();
  }, [slug]);

  if (!ready) {
    return <Spinner />;
  }

  if (!selected) {
    return <Typography>{slug} not found!</Typography>;
  }

  const { name, description } = selected;

  return (
    <Stack>
      <DocumentHead title={name} description={description} />
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProfileImage src={noData} alt={name} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack spacing={1}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="body1">{description}</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Tabs
        textColor="inherit"
        variant="scrollable"
        scrollButtons="auto"
        value={tab}
        onChange={(_e, value) => setTab(value)}
      >
        <Tab label="Overview" />
        <Tab label="Inventory" />
      </Tabs>
    </Stack>
  );
};

export default LibraryHome;
