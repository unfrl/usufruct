import { Link, Stack } from '@mui/material';
import { Library } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LibraryList } from '../components';
import { useStores } from '../hooks';
import { tryParseRestError } from '../utils';

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
      <LibraryList title="Popular libraries" libraries={libraries} />
    </Stack>
  );
};

export default observer(AppHome);
