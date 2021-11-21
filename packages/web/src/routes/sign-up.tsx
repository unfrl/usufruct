import React from 'react';
import {
  AuthenticationForm,
  AuthenticationPayload,
  Content,
} from '../components';

export const SignUp = () => {
  const [authenticating, setAuthenticating] = React.useState(false);

  const handleAuthenticate = (payload: AuthenticationPayload) => {
    console.log('auth payload', payload);
    setAuthenticating(true);

    setTimeout(() => setAuthenticating(false), 1500);
  };

  return (
    <Content maxWidth="sm">
      <AuthenticationForm
        authenticating={authenticating}
        onAuthenticate={handleAuthenticate}
        submitText="Sign Up"
      />
    </Content>
  );
};

export default SignUp;
