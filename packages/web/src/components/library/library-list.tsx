import { Grid, Typography } from '@mui/material';
import { Library } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import { LibraryItem } from './library-item';

const DEFAULT_ITEM_HEIGHT = 250;

export interface LibraryListProps {
  title: string;
  libraries: Library[];
}

export const LibraryList = observer((props: LibraryListProps) => {
  const { title, libraries } = props;

  return (
    <>
      <Typography variant="h2" fontSize="large" my={2}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {libraries.map((library) => (
          <Grid key={library.id} item xs={12} sm={6} md={4}>
            <LibraryItem library={library} height={DEFAULT_ITEM_HEIGHT} />
          </Grid>
        ))}
      </Grid>
    </>
  );
});
