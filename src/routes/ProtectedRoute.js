import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useCurrentUser } from '../providers/CurrentUser';
export const ProtectedRoute = props => {
  const { currentUser, currentUserLoading } = useCurrentUser();

  if (currentUserLoading !== false) {
    return <>loading...</>
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};
