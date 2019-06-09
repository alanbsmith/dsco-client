import React, { useEffect } from 'react';
// providers
import { useCurrentUser } from '../../providers/CurrentUser';
// components
import { PageLayout } from '../../components/PageLayout';
// elements
import { Heading } from '../../elements/Heading';

export const VerifyEmail = ({ match, history }) => {
  const { currentUserService } = useCurrentUser();
  const { token } = match.params;

  useEffect(() => {
    async function verify() {
      await currentUserService.verifyEmail({ token });
    }
    verify();
  }, [currentUserService, token])

  history.push('/');

  return (
    <>
      <PageLayout.Header>
        <Heading>Verify Email</Heading>
      </PageLayout.Header>
      <PageLayout.Main />
    </>
  )
};
