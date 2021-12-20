import { Container, Grid, Stack, styled, Typography } from '@mui/material';
import { Item } from '@unfrl/usufruct-sdk';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ChipList, Spinner } from '../components';
import { useStores } from '../hooks';
import noData from '../images/no-data.svg';
import { tryParseRestError } from '../utils';

const ItemImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 200,
  padding: theme.spacing(2),
}));

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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <ItemImage src={noData} alt={name} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack spacing={1}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="body1">{description}</Typography>
            <ChipList chips={categories} color="primary" />
            <ChipList chips={labels} wrap={true} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ItemView;
