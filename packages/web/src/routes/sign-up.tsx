import { observer } from 'mobx-react';
import {
  AuthenticationForm,
  AuthenticationPayload,
  Content,
} from '../components';
import { useStores } from '../hooks';
import { AuthStatus } from '../stores';
import { tryParseRestError } from '../utils';

const SignUp = observer(() => {
  const { auth, toasts } = useStores();

  const authenticating = auth.status === AuthStatus.Authenticating;

  const handleAuthenticate = async ({
    email,
    password,
  }: AuthenticationPayload) => {
    try {
      await auth.signUp(email, password);
    } catch (error) {
      toasts.error(tryParseRestError(error));
    }
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
});

export default SignUp;
