import { Outlet } from 'react-router-dom';
import { AppHeader } from './app-header';
import { Content } from './content';

export const AppLayout = () => {
  return (
    <>
      <AppHeader title="Usufruct" titleLink="/" />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};
