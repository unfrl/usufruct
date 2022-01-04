import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material';
import { Library } from '@unfrl/usufruct-sdk-new';
import { Link as RouterLink } from 'react-router-dom';
import noData from '../../images/no-data.svg';

export interface LibraryItemProps {
  library: Library;
  height: number;
}

export const LibraryItem = (props: LibraryItemProps) => {
  const { library, height } = props;

  return (
    <Link
      to={`l/${library.slug}`}
      component={RouterLink}
      sx={{ color: 'inherit' }}
    >
      <Card sx={{ height }}>
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
  );
};
