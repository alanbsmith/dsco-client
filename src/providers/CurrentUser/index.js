import React, { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAlerts } from '../Alerts';

import * as ActionTypes from './ActionTypes';
import CurrentUserService from './service';
import { initialState, reducer } from './reducer';
import {
  currentUserQuery,
  LOGIN,
  SIGNUP,
  VERIFY_EMAIL,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  UPDATE_CURRENT_USER,
  DESTROY_CURRENT_USER,
} from './queries';

const CurrentUserContext = createContext();

export const CurrentUserProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, err, refetch } = useQuery(currentUserQuery());

  const value = useMemo(
    () => {
      return {
        state,
        dispatch,
        refetch,
      };
    },
    [state, dispatch, refetch]
  );

  function fetchCurrentUser() {
    if (loading) {
      return dispatch({
        type: ActionTypes.FETCH_CURRENT_USER_REQUEST,
      });
    }
    if (!loading && data) {
      return dispatch({
        type: ActionTypes.FETCH_CURRENT_USER_SUCCESS,
        payload: data.currentUser
      });
    }
    if (err || (!loading && !data)) {
      return dispatch({
        type: ActionTypes.FETCH_CURRENT_USER_FAILURE
      })
    }
  }

  useEffect(fetchCurrentUser, [loading]);

  return <CurrentUserContext.Provider value={value} {...props} />;
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  const { addAlert } = useAlerts();
  const [login] = useMutation(LOGIN);
  const [signup] = useMutation(SIGNUP);
  const [verifyEmail] = useMutation(VERIFY_EMAIL);
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [updateCurrentUser] = useMutation(UPDATE_CURRENT_USER);
  const [destroyCurrentUser] = useMutation(DESTROY_CURRENT_USER);

  const currentUserService = new CurrentUserService({
    dispatch: context.dispatch,
    addAlert,
    login,
    signup,
    verifyEmail,
    forgotPassword,
    resetPassword,
    updateCurrentUser,
    destroyCurrentUser,
    refetch: context.dispatch,
  });

  if (!context) {
    throw new Error(`useCurrentUser must be used within a CurrentUserProvider`);
  }

  function logout() {
    return context.dispatch({
      type: ActionTypes.LOGOUT
    })
  }

  return {
    currentUser: context.state.currentUser,
    currentUserLoading: context.state.loading,
    dispatch: context.dispatch,
    logout,
    currentUserService,
  };
};
