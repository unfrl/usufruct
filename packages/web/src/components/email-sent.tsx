import { Box, Slide, styled, Typography } from '@mui/material';
import emailSent from '../images/email-sent.svg';

const Image = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(4),
}));

export interface EmailSentProps {
  title?: string;
  description: string;
}

export const EmailSent: React.FC<EmailSentProps> = (props) => {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Typography align="center" variant="h3">
        {props.title || 'Email sent!'}
      </Typography>
      <Typography align="center" variant="subtitle1">
        {props.description}
      </Typography>
      <Box sx={{ marginTop: 2 }} />
      <Slide direction="right" in={true} timeout={500}>
        <Image src={emailSent} alt="Email sent" />
      </Slide>
    </Box>
  );
};
