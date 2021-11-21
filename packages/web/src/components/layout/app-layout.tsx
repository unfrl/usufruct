import { Outlet } from 'react-router-dom';
import { AppBar } from './app-bar';
import { Content } from './content';

export const AppLayout = () => {
  return (
    <>
      <AppBar title="Usufruct" titleLink="/" />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};
