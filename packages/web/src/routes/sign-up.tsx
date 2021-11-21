import { observer } from 'mobx-react';
import {
  AuthenticationForm,
  AuthenticationPayload,
  Content,
} from '../components';
import { useStores } from '../hooks';
import { AuthStatus } from '../stores';

export const SignUp = observer(() => {
  const { authStore } = useStores();

  const authenticating = authStore.status === AuthStatus.Authenticating;

  const handleAuthenticate = async (payload: AuthenticationPayload) => {
    const { email, password } = payload;
    await authStore.signUp(email, password);
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
