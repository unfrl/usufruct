import { Stack, styled, Typography } from '@mui/material';
import notFound from '../images/not-found.svg';

const Image = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 200,
  padding: theme.spacing(2),
}));

export const NotFound = () => {
  return (
    <Stack alignItems="center">
      <Image src={notFound} alt="Not found" />
      <Typography align="center" variant="h5">
        Page not found
      </Typography>
    </Stack>
  );
};
