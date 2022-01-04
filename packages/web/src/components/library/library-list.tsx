import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Library } from '@unfrl/usufruct-sdk-new';
import { LibraryItem } from './library-item';

const DEFAULT_ITEM_HEIGHT = 150;

export interface LibraryListProps {
  title: string;
  libraries: Library[];
}

export const LibraryList = (props: LibraryListProps) => {
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
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: DEFAULT_ITEM_HEIGHT }}>
            <CardActionArea
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">Create new library</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
