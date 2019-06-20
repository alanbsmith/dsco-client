import React, { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import * as ActionTypes from './ActionTypes';
import { subscriptionsQuery } from './queries';
import { initialState, reducer } from './reducer';

const SubscriptionsContext = createContext();

export const SubscriptionsProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, err } = useQuery(subscriptionsQuery());
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  function fetchSubscriptions() {
    if (loading) {
      return dispatch({
        type: ActionTypes.FETCH_SUBSCRIPTIONS_REQUEST
      });
    }
    if (!loading && data) {
      return dispatch({
        type: ActionTypes.FETCH_SUBSCRIPTIONS_SUCCESS,
        payload: data.subscriptions,
      });
    }
    if (err) {
      return dispatch({
        type: ActionTypes.FETCH_SUBSCRIPTIONS_FAILURE
      });
    }
  }

  useEffect(fetchSubscriptions, [loading]);

  return <SubscriptionsContext.Provider value={value} {...props} />;
};

export function useSubscriptions() {
  const context = useContext(SubscriptionsContext);

  if (!context) {
    throw new Error(`useSubscriptions must be used within a SubscriptionsProvider`);
  }

  return {
    subscriptions: context.state.subscriptions,
    subscriptionsLoading: context.state.loading,
    dispatch: context.dispatch,
  };
};
