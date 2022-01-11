import { CircularProgress, Divider, Link, Stack, styled } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import {
  AuthenticationForm,
  AuthenticationPayload,
  Content,
  DocumentHead,
  EmailSent,
} from '../components';
import { useStores } from '../hooks';
import { AuthStatus } from '../stores';

export interface AuthenticationProps {
  signUp: boolean;
}

const FormContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const Authentication = observer((props: AuthenticationProps) => {
  const { auth, toasts } = useStores();
  const [emailSent, setEmailSent] = React.useState(false);
  const { signUp } = props;

  const authenticating = auth.status === AuthStatus.Authenticating;

  const handleAuthenticate = async ({
    displayName,
    email,
    password,
  }: AuthenticationPayload) => {
    try {
      if (signUp) {
        await auth.signUp(displayName, email, password);
        setEmailSent(true);
      } else {
        await auth.signIn(email, password);
      }
    } catch (error) {
      toasts.error((error as any).message);
    }
  };

  const content = () => {
    if (auth.status === AuthStatus.Initializing) {
      return <CircularProgress sx={{ display: 'flex', alignSelf: 'center' }} />;
    }

    if (auth.authenticated) {
      return <Navigate to="/" replace={true} />;
    }

    if (emailSent) {
      return (
        <EmailSent description="Please click the link in the email we sent you to finish creating your account." />
      );
    }

    return (
      <FormContainer>
        <DocumentHead title={signUp ? 'Create an account' : 'Login'} />
        <AuthenticationForm
          authenticating={authenticating}
          onAuthenticate={handleAuthenticate}
          submitText={signUp ? 'Sign up' : 'Login'}
          includeDisplayName={signUp}
        />
        <Divider sx={{ marginBottom: 1 }}>or</Divider>
        <Stack direction="row" justifyContent="center">
          <Link
            to={signUp ? '/login' : '/sign-up'}
            component={RouterLink}
            underline="hover"
            color="primary"
          >
            {signUp ? 'Login with existing' : 'Create an account'}
          </Link>
        </Stack>
      </FormContainer>
    );
  };

  return <Content maxWidth="xs">{content()}</Content>;
});

export default Authentication;
