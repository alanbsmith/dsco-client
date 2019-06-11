import React from 'react';
// providers
import { useCurrentUser } from '../../providers/CurrentUser';
// page-specific components
import { ResetPasswordForm } from './ResetPasswordForm';
// components
import { PageLayout } from '../../components/PageLayout';
// elements
import { Heading } from '../../elements/Heading';

export const ResetPassword = ({ match, history }) => {
  const { currentUser } = useCurrentUser();
  const { token } = match.params;

  // no shenanigans :)
  if (currentUser || !token) {
    return history.push('/');
  }

  return (
    <>
      <PageLayout.Header>
        <Heading>Reset Password</Heading>
      </PageLayout.Header>
      <PageLayout.Main>
        <ResetPasswordForm token={token} />
      </PageLayout.Main>
    </>
  )
};
