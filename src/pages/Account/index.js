import React, { useState } from 'react';

import { useCurrentUser } from '../../providers/CurrentUser';

import { PageLayout } from '../../components/PageLayout';
import { Heading } from '../../elements/Heading';
import { Text } from '../../elements/Text';
import { Box } from '../../elements/Box';
import { Button } from '../../elements/Button';
import { Divider } from '../../elements/Divider';
import { RightDrawer } from '../../components/RightDrawer';
import { UpdateAccountForm } from './UpdateAccountForm';
import { ButtonList } from '../../elements/ButtonList';

export function Account() {
  const { currentUser } = useCurrentUser();
  const [isUpdateAccountOpen, setIsUpdateAccountOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  return (
    <>
      <RightDrawer title="Update Account" isOpen={isUpdateAccountOpen} handleClose={() => setIsUpdateAccountOpen(false)}>
        <UpdateAccountForm handleClose={() => setIsUpdateAccountOpen(false)} />
      </RightDrawer>
      <RightDrawer title="Delete Account" isOpen={isDeleteAccountOpen} handleClose={() => setIsDeleteAccountOpen(false)}>
        <DeleteAccount handleClose={() => setIsDeleteAccountOpen(false)} />
      </RightDrawer>
      <PageLayout.Header>
        <Heading>Account</Heading>
      </PageLayout.Header>
      <PageLayout.Main>
        <Box>
          <Box flexDirection="column" flex="1">
            <Box flexDirection="column" mb={3}>
              <Heading as="h3">Name</Heading>
              <Text>{currentUser.fullName}</Text>
            </Box>
            <Box flexDirection="column" mb={3}>
              <Heading as="h3">Email</Heading>
              <Text>{currentUser.email}</Text>
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
        <Box alignItems="flex-end">
          <Button variant="ghostDanger" size="small" onClick={() => setIsDeleteAccountOpen(true)}>Delete Account</Button>
        </Box>
      </PageLayout.Main>
    </>
  )
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
      <Heading as="h2" mb={3}>Sorry to see you go!</Heading>
      <Text mb={3}>Performing this action will permanently delete your account.</Text>
      <ButtonList>
        <Button variant="ghost" onClick={handleClose}>Cancel</Button>
        <Button variant="danger" disabled={!currentUser || currentUserLoading} onClick={handleDelete}>Confirm</Button>
      </ButtonList>
    </Box>
  );
}