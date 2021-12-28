import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const LibraryHome = () => {
  const { slug } = useParams<'slug'>();

  return (
    <Stack>
      <Typography>Yoooo {slug}</Typography>
    </Stack>
  );
};

export default LibraryHome;
