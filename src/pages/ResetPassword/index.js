import React from 'react';
import { Redirect } from 'react-router-dom';
// providers
import { useCurrentUser } from '../../providers/CurrentUser';
// page-specific components
import { ResetPasswordForm } from './ResetPasswordForm';
// components
import { PageLayout } from '../../components/PageLayout';
// elements
import { Heading } from '../../elements/Heading';

export const ResetPassword = (props) => {
  const { currentUser } = useCurrentUser();
  const hasTokenParam = /^\?token=.+$/.test(props.location.search);
  const tokenParam = hasTokenParam ? props.location.search.split('?token=')[1] : '';
  if (currentUser || !hasTokenParam) {
    return <Redirect to="/" />
  }

  return (
    <>
      <PageLayout.Header>
        <Heading>Reset Password</Heading>
      </PageLayout.Header>
      <PageLayout.Main>
        <ResetPasswordForm tokenParam={tokenParam} />
      </PageLayout.Main>
    </>
  )
};
