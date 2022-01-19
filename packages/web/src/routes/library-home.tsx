import { Grid, Stack, styled, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { DocumentHead, Spinner } from '../components';
import { useStores } from '../hooks';
import noData from '../images/no-data.svg';

const ProfileImage = styled('img')(() => ({
  height: 150,
  objectFit: 'contain',
}));

const LinkTab = (props: { label: string; to: string }) => {
  return <Tab component={Link} {...props} />;
};

const LibraryHome = () => {
  const { library, toasts } = useStores();
  const [ready, setReady] = React.useState(false);
  const { slug } = useParams<'slug'>();
  const location = useLocation();

  // TODO: just for testing, needs to be updated to handle multiple routes + decide if tabs needed
  const tab = location.pathname.indexOf('inventory') === -1 ? 0 : 1;

  React.useEffect(() => {
    const load = async () => {
      try {
        await library.loadLibrary(slug);
      } catch (error) {
        console.error('failed to fetch library', error);
        toasts.error((error as any).message);
      } finally {
        setReady(true);
      }
    };

    load();

    return () => library.clearActiveLibrary();
  }, [slug]);

  if (!ready) {
    return <Spinner />;
  }

  if (!library.activeLibrary) {
    return <Typography>{slug} not found!</Typography>;
  }

  const { name, description } = library.activeLibrary;

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
        onChange={(_e, _value) => {
          /** no-op, active tab handled by route */
        }}
        sx={{ marginBottom: 2 }}
      >
        <LinkTab label="Overview" to="" />
        <LinkTab label="Inventory" to="inventory" />
      </Tabs>
      <React.Suspense fallback={<Spinner />}>
        <Outlet />
      </React.Suspense>
    </Stack>
  );
};

export default LibraryHome;
