import React from 'react';
import { Redirect } from 'react-router-dom';
// providers
import { useCurrentUser } from '../../providers/CurrentUser';
// page-specific components
import { LoginForm } from './LoginForm';
// components
import { PageLayout } from '../../components/PageLayout';
// elements
import { Heading } from '../../elements/Heading';

export const Login = () => {
  const { currentUser } = useCurrentUser();

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <>
      <PageLayout.Header>
        <Heading>Login</Heading>
      </PageLayout.Header>
      <PageLayout.Main>
        <LoginForm />
      </PageLayout.Main>
    </>
  )
};
