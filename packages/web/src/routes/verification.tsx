import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useStores } from '../hooks';
import { tryParseRestError } from '../utils';

const Verification = () => {
  const [redirect, setRedirect] = React.useState('');
  const [error, setError] = React.useState('');
  const { auth } = useStores();
  const [params] = useSearchParams();
  const email = params.get('email');
  const token = params.get('token');

  React.useEffect(() => {
    const processToken = async () => {
      if (!email || !token) {
        setRedirect('/');
        return;
      }

      try {
        await auth.verifyUser(email, token);
        setRedirect('/login');
      } catch (error) {
        setError(tryParseRestError(error));
      }
    };

    processToken();
  }, []);

  if (redirect) {
    return <Navigate to={redirect} replace={true} />;
  }

  if (error) {
    return (
      <Alert severity="error" variant="filled" sx={{ margin: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      <Typography variant="h6">Verifying your account...</Typography>
      <CircularProgress sx={{ marginTop: 1 }} />
    </Box>
  );
};

export default Verification;
