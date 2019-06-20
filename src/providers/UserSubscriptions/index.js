import React, { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAlerts } from '../Alerts';

import * as ActionTypes from './ActionTypes';
import UserSubscriptionsService from './service';
import { userSubscriptionsQuery, CREATE_USER_SUBSCRIPTION, DESTROY_USER_SUBSCRIPTION } from './queries';
import { initialState, reducer } from './reducer';

const UserSubscriptionsContext = createContext();

export const UserSubscriptionsProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, err } = useQuery(userSubscriptionsQuery());

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  function fetchUserSubscriptions() {
    if (loading) {
      return dispatch({
        type: ActionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST
      });
    }
    if (!loading && data) {
      return dispatch({
        type: ActionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS,
        payload: data.userSubscriptions,
      });
    }
    if (err) {
      return dispatch({
        type: ActionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE
      });
    }
  }

  useEffect(fetchUserSubscriptions, [loading]);

  return <UserSubscriptionsContext.Provider value={value} {...props} />;
}

export function useUserSubscriptions() {
  const context = useContext(UserSubscriptionsContext);
  const { addAlert } = useAlerts();
  const [createUserSubscription] = useMutation(CREATE_USER_SUBSCRIPTION);
  const [destroyUserSubscription] = useMutation(DESTROY_USER_SUBSCRIPTION);

  const userSubscriptionsService = new UserSubscriptionsService({
    dispatch: context.dispatch,
    createUserSubscription,
    destroyUserSubscription,
    addAlert,
  });

  if (!context) {
    throw new Error(`useUserSubscriptions must be used within a UserSubscriptionsProvider`);
  }

  return {
    userSubscriptions: context.state.userSubscriptions,
    userSubscriptionsLoading: context.state.loading,
    dispatch: context.dispatch,
    userSubscriptionsService,
  };
};
