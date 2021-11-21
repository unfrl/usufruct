import { LoadingButton } from '@mui/lab';
import { styled, TextField } from '@mui/material';
import React from 'react';

export interface AuthenticationPayload {
  email: string;
  password: string;
}

export interface AuthenticationFormProps {
  onAuthenticate: (payload: AuthenticationPayload) => void;
  authenticating: boolean;
  submitText?: string;
}

export const AuthenticationForm = (props: AuthenticationFormProps) => {
  const [state, setState] = React.useState<AuthenticationPayload>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onAuthenticate(state);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        required
        label="Email"
        variant="outlined"
        margin="normal"
        type="email"
        value={state.email}
        onChange={(e) => setState({ ...state, email: e.target.value })}
        disabled={props.authenticating}
      />
      <TextField
        fullWidth
        required
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={state.password}
        onChange={(e) => setState({ ...state, password: e.target.value })}
        disabled={props.authenticating}
      />
      <FormActions>
        <LoadingButton
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          loading={props.authenticating}
        >
          {props.submitText ?? 'Submit'}
        </LoadingButton>
      </FormActions>
    </Form>
  );
};

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const FormActions = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
