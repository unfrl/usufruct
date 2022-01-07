import { Stack, Typography } from '@mui/material';
import { Library } from '@unfrl/usufruct-sdk';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DocumentHead, Spinner } from '../components';
import { useStores } from '../hooks';

const LibraryHome = () => {
  const { library, toasts } = useStores();
  const [selected, setSelected] = React.useState<Library | null>(null);
  const [ready, setReady] = React.useState(false);
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
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {name}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Stack>
  );
};

export default LibraryHome;
