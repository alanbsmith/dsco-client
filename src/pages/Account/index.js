import React from 'react';

import { useCurrentUser } from '../../providers/CurrentUser';

import { PageLayout } from '../../components/PageLayout';
import { Heading } from '../../elements/Heading';
import { Text } from '../../elements/Text';

export const Account = () => {
  const { currentUser } = useCurrentUser();

  return (
    <>
      <PageLayout.Header>
        <Heading>Account</Heading>
      </PageLayout.Header>
      <PageLayout.Main>
        <Text>Name</Text>
        {currentUser.fullName}
        <Text>Email</Text>
        {currentUser.email}
        <Text>Phone</Text>
        {currentUser.phone}
      </PageLayout.Main>
    </>
  )
}
