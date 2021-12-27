import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Link to="inventory">
      <Typography>Admin inventory UI</Typography>
    </Link>
  );
};

export default Home;
