import { Button, Link, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LibraryList, NewLibraryForm, ResponsiveDialog } from '../components';
import { useStores } from '../hooks';
import { tryParseRestError } from '../utils';

const AppHome = () => {
  const [showLibraryForm, setShowLibraryForm] = React.useState(false);
  const { library, toasts } = useStores();

  React.useEffect(() => {
    const load = async () => {
      try {
        await library.fetchLibraries();
      } catch (error) {
        toasts.error(tryParseRestError(error));
      }
    };

    load();
  }, []);

  // TODO: handle case where it's first time and there's no libraries, prob toggle walk through or something

  const handleShowForm = () => setShowLibraryForm(true);

  const handleCloseForm = () => setShowLibraryForm(false);

  const handleCreate = async (name: string) => {
    try {
      await library.createLibrary({ name });
      handleCloseForm();
    } catch (error) {
      toasts.error(JSON.stringify(error));
    }
  };

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Button onClick={handleShowForm} variant="contained">
          New Library (temp btn)
        </Button>
        <Link to="inventory" component={RouterLink}>
          ~~Misc admin UI~~
        </Link>
      </Stack>
      <LibraryList title="Libraries" libraries={library.libraries} />
      <ResponsiveDialog
        fullWidth
        maxWidth="xs"
        title="New Library"
        open={showLibraryForm}
        onClose={handleCloseForm}
      >
        <NewLibraryForm onSave={handleCreate} onCancel={handleCloseForm} />
      </ResponsiveDialog>
    </Stack>
  );
};

export default observer(AppHome);
