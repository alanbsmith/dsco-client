import React, { useState } from 'react';

// providers
import { useCurrentUser } from '../../providers/CurrentUser';
import { SubscriptionsProvider } from '../../providers/Subscriptions';
import { UserSubscriptionsProvider } from '../../providers/UserSubscriptions';

import { PageLayout } from '../../components/PageLayout';
import { Heading } from '../../elements/Heading';
import { Text } from '../../elements/Text';
import { Box } from '../../elements/Box';
import { Button } from '../../elements/Button';
import { Divider } from '../../elements/Divider';
import { RightDrawer } from '../../components/RightDrawer';
import { UpdateAccountForm } from './UpdateAccountForm';
import { ButtonList } from '../../elements/ButtonList';
import { ButtonLink } from '../../elements/ButtonLink';
import { Badge } from '../../elements/Badge';
// components
import { Notifications } from './Notifications';

export function Account() {
  const { currentUser, currentUserService } = useCurrentUser();
  const [isUpdateAccountOpen, setIsUpdateAccountOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  return (
    <SubscriptionsProvider>
      <UserSubscriptionsProvider>
        <RightDrawer title="Update Account" isOpen={isUpdateAccountOpen} handleClose={() => setIsUpdateAccountOpen(false)}>
          <UpdateAccountForm handleClose={() => setIsUpdateAccountOpen(false)} />
        </RightDrawer>
        <RightDrawer title="Delete Account" isOpen={isDeleteAccountOpen} handleClose={() => setIsDeleteAccountOpen(false)}>
          <DeleteAccount handleClose={() => setIsDeleteAccountOpen(false)} />
        </RightDrawer>
        <PageLayout.Header>
          <Heading>Settings</Heading>
        </PageLayout.Header>
        <PageLayout.Main>
          <Box flexDirection="column" alignItems="flex-start">
            {currentUser.isAdmin && <Badge variant="admin">admin</Badge>}
          </Box>
          <Heading as="h2" mb={3}>Account</Heading>
          <Box>
            <Box flexDirection="column" flex="1">
              <Box flexDirection="column" mb={3}>
                <Heading as="h3">Name</Heading>
                <Text>{currentUser.fullName}</Text>
              </Box>
              <Box flexDirection="column" mb={3} alignItems="flex-start">
                <Box>
                  <Heading as="h3">Email</Heading>
                  {currentUser.hasVerifiedEmail ? <Badge variant="verified" mx={2}>verified</Badge> : <Badge mx={2}>unverified</Badge>}
                </Box>
                <Text>{currentUser.email}</Text>
                {
                  !currentUser.hasVerifiedEmail
                  && (
                    <ButtonLink
                      mt={2}
                      fontSize="sm"
                      onClick={() => currentUserService.sendVerificationEmail()}
                    >
                      Verify your email
                  </ButtonLink>
                  )
                }
              </Box>
              <Box flexDirection="column" mb={3}>
                <Heading as="h3">Phone</Heading>
                {currentUser.phone
                  ? <Text>{currentUser.phone}</Text>
                  : <Text fontStyle="italic" color="chrome040">Not provided</Text>
                }
              </Box>
              <Box flexDirection="column" mb={3}>
                <Heading as="h3">Password</Heading>
                <Text>•••••••••••••••</Text>
              </Box>
            </Box>
            <Box flexDirection="column" justifyContent="flex-start">
              <Button size="small" onClick={() => setIsUpdateAccountOpen(true)}>Update</Button>
            </Box>
          </Box>

          <Divider />
          <Notifications />
          <Divider />
          <Heading as="h2" my={3}>Danger Zone</Heading>
          <Box>
            <ButtonLink variant="danger" fontSize="sm" onClick={() => setIsDeleteAccountOpen(true)}>Delete Account</ButtonLink>
          </Box>
        </PageLayout.Main>
      </UserSubscriptionsProvider>
    </SubscriptionsProvider>
  );
}


function DeleteAccount({ handleClose }) {
  const { currentUser, currentUserService, currentUserLoading } = useCurrentUser();

  function handleDelete() {
    const { id } = currentUser;
    currentUserService.destroyCurrentUser({ id });
    handleClose();
  }

  return (
    <Box flexDirection="column">
      <Heading as="h2" my={3} mb={3}>Sorry to see you go!</Heading>
      <Text mb={3}>Performing this action will permanently delete your account.</Text>
      <ButtonList>
        <Button variant="ghost" onClick={handleClose}>Cancel</Button>
        <Button variant="danger" disabled={!currentUser || currentUserLoading} onClick={handleDelete}>Confirm</Button>
      </ButtonList>
    </Box>
  );
}