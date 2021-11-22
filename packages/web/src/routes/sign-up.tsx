import { observer } from 'mobx-react';
import React from 'react';
import {
  AuthenticationForm,
  AuthenticationPayload,
  Content,
  EmailSent,
} from '../components';
import { useStores } from '../hooks';
import { AuthStatus } from '../stores';
import { tryParseRestError } from '../utils';

const SignUp = observer(() => {
  const { auth, toasts } = useStores();
  const [emailSent, setEmailSent] = React.useState(false);

  const authenticating = auth.status === AuthStatus.Authenticating;

  const handleAuthenticate = async ({
    email,
    password,
  }: AuthenticationPayload) => {
    try {
      await auth.signUp(email, password);
      setEmailSent(true);
    } catch (error) {
      toasts.error(tryParseRestError(error));
    }
  };

  const renderBody = () => {
    if (emailSent) {
      return (
        <EmailSent description="Please click the verification email we sent you to finish setting up your account." />
      );
    }

    return (
      <AuthenticationForm
        authenticating={authenticating}
        onAuthenticate={handleAuthenticate}
        submitText="Sign Up"
      />
    );
  };

  return <Content maxWidth="sm">{renderBody()}</Content>;
});

export default SignUp;
