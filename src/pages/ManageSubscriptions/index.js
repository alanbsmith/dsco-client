import React from 'react';
// components
import { PageLayout } from '../../components/PageLayout';
// elements
import { Heading } from '../../elements/Heading';
import { Notifications } from '../Account/Notifications';
import { SubscriptionsProvider } from '../../providers/Subscriptions';
import { UserSubscriptionsProvider } from '../../providers/UserSubscriptions';
import { AuthToken } from '../../utils/authToken';

export const ManageSubscriptions = ({ match }) => {
  const { token } = match.params;
  AuthToken.set(token);

  return (
    <SubscriptionsProvider>
      <UserSubscriptionsProvider>
        <PageLayout.Header>
          <Heading>Manage Subscriptions</Heading>
        </PageLayout.Header>
        <PageLayout.Main>
          <Notifications />
        </PageLayout.Main>
      </UserSubscriptionsProvider>
    </SubscriptionsProvider>
  )
};
