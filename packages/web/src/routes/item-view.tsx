import { Chip, Container, Stack, Typography } from '@mui/material';
import { Item } from '@unfrl/usufruct-sdk';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components';
import { useStores } from '../hooks';
import { tryParseRestError } from '../utils';

const ItemView = () => {
  const [ready, setReady] = React.useState(false);
  const [item, setItem] = React.useState<Item | null>(null);
  const { client, toasts } = useStores();
  const { id } = useParams<'id'>();

  React.useEffect(() => {
    const load = async () => {
      try {
        if (id) {
          setItem(await client.getItem(id));
        }
      } catch (error) {
        toasts.error(tryParseRestError(error));
      }

      setReady(true);
    };

    load();
  }, [id]);

  if (!ready) {
    return <Spinner />;
  }

  if (!item) {
    return <Typography>Item not found!</Typography>;
  }

  const { name, description, categories, labels } = item;

  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="body1">{description}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {categories.map((category) => (
            <Chip key={category.id} label={category.name} variant="outlined" />
          ))}
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {labels.map((label) => (
            <Chip key={label.id} label={label.name} size="small" />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default ItemView;
