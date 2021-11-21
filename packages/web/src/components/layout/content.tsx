import { Container, styled } from '@mui/material';

export interface ContentProps {
  children: any;
  maxWidth?: 'xl' | 'lg' | 'md' | 'sm';
}

export const Content = (props: ContentProps) => {
  return (
    <Container maxWidth={props.maxWidth || 'lg'} style={{ padding: 0 }}>
      <StyledContent>{props.children}</StyledContent>
    </Container>
  );
};

const StyledContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  transition: theme.transitions.create(['margin', 'padding'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));
