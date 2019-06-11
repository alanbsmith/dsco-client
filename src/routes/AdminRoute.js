import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useCurrentUser } from '../providers/CurrentUser';

export const AdminRoute = props => {
  const { currentUser, currentUserLoading } = useCurrentUser();

  if (currentUserLoading) {
    return <>loading...</>
  }

  if (!currentUser) {
    return <Redirect to='/login' />;
  }

  if (!currentUser.isAdmin) {
    return <Redirect to='/' />;
  }

  return <Route {...props} />;
}
