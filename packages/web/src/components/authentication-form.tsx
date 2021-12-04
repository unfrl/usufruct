import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import React from 'react';

export interface AuthenticationPayload {
  displayName: string;
  email: string;
  password: string;
}

export interface AuthenticationFormProps {
  onAuthenticate: (payload: AuthenticationPayload) => void;
  authenticating: boolean;
  submitText?: string;
  includeDisplayName?: boolean;
}

export const AuthenticationForm = (props: AuthenticationFormProps) => {
  const [state, setState] = React.useState<AuthenticationPayload>({
    displayName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onAuthenticate(state);
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.includeDisplayName ? (
        <TextField
          fullWidth
          required
          label="Display name"
          margin="normal"
          value={state.displayName}
          onChange={(e) => setState({ ...state, displayName: e.target.value })}
        />
      ) : null}
      <TextField
        fullWidth
        required
        label="Email"
        margin="normal"
        type="email"
        value={state.email}
        onChange={(e) => setState({ ...state, email: e.target.value })}
      />
      <TextField
        fullWidth
        required
        label="Password"
        margin="normal"
        type="password"
        value={state.password}
        onChange={(e) => setState({ ...state, password: e.target.value })}
      />
      <Box sx={{ marginTop: 2 }}>
        <LoadingButton
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          loading={props.authenticating}
        >
          {props.submitText ?? 'Submit'}
        </LoadingButton>
      </Box>
    </form>
  );
};
