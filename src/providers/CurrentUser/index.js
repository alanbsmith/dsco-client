import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AuthToken } from '../../utils/authToken';

import { currentUserQuery } from './query';

const CurrentUserContext = createContext();

export const CurrentUserProvider = props => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { data, loading, err } = useQuery(currentUserQuery());

  const value = useMemo(
    () => {
      return {
        currentUser,
        setCurrentUser,
        isLoading,
      };
    },
    [currentUser, isLoading]
  );

  function handleUpdate() {
    if (loading) {
      return setLoading(loading);
    }
    if (!loading && data) {
      setCurrentUser(data.currentUser);
      return setLoading(false);
    }
    if (err) {
      console.err(err);
      return setLoading(false);
    }
  }

  useEffect(handleUpdate, [loading]);

  return <CurrentUserContext.Provider value={value} {...props} />;
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(`useCurrentUser must be used within a CurrentUserProvider`);
  }

  function resetCurrentUser() {
    AuthToken.delete();
    return context.setCurrentUser(null);
  }

  return {
    currentUser: context.currentUser,
    resetCurrentUser,
    setCurrentUser: context.setCurrentUser,
  };
};
