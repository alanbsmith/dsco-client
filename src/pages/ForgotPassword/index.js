import React from 'react';
import { Redirect } from 'react-router-dom';
// providers
import { useCurrentUser } from '../../providers/CurrentUser';
// page-specific components
import { ForgotPasswordForm } from './ForgotPasswordForm';
// components
import { PageLayout } from '../../components/PageLayout';
// elements
import { Heading } from '../../elements/Heading';

export const ForgotPassword = () => {
  const { currentUser } = useCurrentUser();

  // no shenanigans :)
  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <>
      <PageLayout.Header>
        <Heading>Forgot Password</Heading>
      </PageLayout.Header>
      <PageLayout.Main>
        <ForgotPasswordForm />
      </PageLayout.Main>
    </>
  )
};
