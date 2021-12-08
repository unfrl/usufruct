import React from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '../common';
import { AppHeader } from './app-header';
import { Content } from './content';

export const AppLayout = () => {
  return (
    <>
      <AppHeader title="Usufruct" titleLink="/" />
      <React.Suspense fallback={<Spinner />}>
        <Content>
          <Outlet />
        </Content>
      </React.Suspense>
    </>
  );
};
