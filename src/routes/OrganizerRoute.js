import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useCurrentUser } from '../providers/CurrentUser';
import { useMembers } from '../providers/Members';

function organizerAuthCheck(members, userId) {
  const member = members.find(member => member.userId === userId);
  if (!member || !member.isOrganizer) {
    return false;
  }
  return true;
}

export const OrganizerRoute = props => {
  const { currentUser, currentUserLoading } = useCurrentUser();
  const { members, membersLoading } = useMembers();

  if (currentUserLoading !== false || membersLoading !== false) {
    return <>loading...</>
  }

  if (!currentUser && currentUserLoading === false) {
    return <Redirect to="/login" />
  }

  // no shenanigans :)
  if (!organizerAuthCheck(members, currentUser.id) && !currentUser.isAdmin) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}
