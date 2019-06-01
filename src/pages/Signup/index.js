import React from 'react';
import { Redirect } from 'react-router-dom';
// providers
import { useCurrentUser } from '../../providers/CurrentUser';
// page-specific components
import { SignupForm } from './SignupForm';
// components
import { PageLayout } from '../../components/PageLayout';
// elements
import { Heading } from '../../elements/Heading';

export function Signup() {
  const { currentUser } = useCurrentUser();

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <>
      <PageLayout.Header>
        <Heading>Signup</Heading>
      </PageLayout.Header>
      <PageLayout.Main>
        <SignupForm />
      </PageLayout.Main>
    </>
  );
}
