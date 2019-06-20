import React from 'react';

// providers
import { useCurrentUser } from '../../providers/CurrentUser';
import { useSubscriptions } from '../../providers/Subscriptions';
import { useUserSubscriptions } from '../../providers/UserSubscriptions';
// elements
import { Heading } from '../../elements/Heading';
import { Text } from '../../elements/Text';
import { Box } from '../../elements/Box';
import { ToggleButton } from '../../elements/ToggleButton';

export function Notifications(props) {
  const { currentUser } = useCurrentUser();
  const { subscriptions } = useSubscriptions();
  const { userSubscriptions, userSubscriptionsService } = useUserSubscriptions();

  function renderHeader() {
    if (!currentUser || !currentUser.hasVerifiedEmail) {
      return (
        <>
          <Heading as="h2">Notifications</Heading>
          <Text mb={3} fontStyle="italic" fontSize="sm" color="chrome040">Disabled until your email address is verified</Text>
        </>
      )
    }
    return <Heading as="h2" my={3}>Notifications</Heading>;
  }

  function isToggleActive(subId) {
    if (!currentUser.hasVerifiedEmail) {
      return false;
    }
    return !!userSubscriptions.find(userSub => userSub.subscriptionId === subId);
  }

  function handleToggle(subId) {
    if (!currentUser.hasVerifiedEmail) {
      return;
    }

    const userSub = userSubscriptions.find(userSub => userSub.subscriptionId === subId);
    if (!userSub) {
      return userSubscriptionsService.createUserSubscription({ userId: currentUser.id, subscriptionId: subId });
    }

    return userSubscriptionsService.destroyUserSubscription({ userId: currentUser.id, id: userSub.id });

  }

  return (
    <section>
      {renderHeader()}
      {subscriptions.map((sub) => {
        return (
          <Box key={sub.id} justifyContent="space-between" alignItems="flex-start" mb={3}>
            <div>
              <Heading as="h3" textTransform="capitalize">{sub.name}</Heading>
              <Text fontSize="xs" color="chrome040">{sub.description}</Text>
            </div>
            <ToggleButton disabled={!currentUser.hasVerifiedEmail} on={isToggleActive(sub.id)} toggleOn={() => handleToggle(sub.id)} />
          </Box>
        )
      })}
    </section>
  )
}
