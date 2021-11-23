import { styled } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import {
  AuthenticationForm,
  AuthenticationPayload,
  Content,
  EmailSent,
} from '../components';
import { useStores } from '../hooks';
import { AuthStatus } from '../stores';
import { tryParseRestError } from '../utils';

export interface AuthenticateProps {
  signUp: boolean;
}

const Authenticate = observer((props: AuthenticateProps) => {
  const { auth, toasts } = useStores();
  const [emailSent, setEmailSent] = React.useState(false);
  const { signUp } = props;

  const authenticating = auth.status === AuthStatus.Authenticating;

  const handleAuthenticate = async ({
    email,
    password,
  }: AuthenticationPayload) => {
    try {
      if (signUp) {
        await auth.signUp(email, password);
        setEmailSent(true);
      } else {
        await auth.signIn(email, password);
      }
    } catch (error) {
      toasts.error(tryParseRestError(error));
    }
  };

  const renderContent = () => {
    if (emailSent) {
      return (
        <EmailSent description="Please click the link in the email we sent you to verify your account." />
      );
    }

    if (auth.authenticated) {
      return <Navigate to="/" replace={true} />;
    }

    return (
      <FormContainer>
        <AuthenticationForm
          authenticating={authenticating}
          onAuthenticate={handleAuthenticate}
          submitText="Sign Up"
        />
      </FormContainer>
    );
  };

  return <Content maxWidth="sm">{renderContent()}</Content>;
});

export default Authenticate;

const FormContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));
