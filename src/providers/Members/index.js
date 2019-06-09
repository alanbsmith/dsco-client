import React, { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAlerts } from '../Alerts';

import * as ActionTypes from './ActionTypes';
import MembersService from './service';
import { initialState, reducer } from './reducer';
import {
  membersQuery,
  DESTROY_MEMBER,
  CREATE_ORGANIZER,
  REMOVE_ORGANIZER,
} from './queries';

const MembersContext = createContext();

export const MembersProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, err } = useQuery(membersQuery());

  const value = useMemo(
    () => {
      return {
        state,
        dispatch,
      };
    },
    [state, dispatch]
  );

  function fetchMembers() {
    if (loading) {
      return dispatch({
        type: ActionTypes.FETCH_MEMBERS_REQUEST,
      });
    }
    if (!loading && data) {
      return dispatch({
        type: ActionTypes.FETCH_MEMBERS_SUCCESS,
        payload: data.members
      });
    }
    if (err) {
      console.warn(err);
      return dispatch({
        type: ActionTypes.FETCH_MEMBERS_FAILURE
      })
    }
  }

  useEffect(fetchMembers, [loading]);

  return <MembersContext.Provider value={value} {...props} />;
};

export const useMembers = () => {
  const context = useContext(MembersContext);
  const { addAlert } = useAlerts();
  const [destroyMember] = useMutation(DESTROY_MEMBER);
  const [createOrganizer] = useMutation(CREATE_ORGANIZER);
  const [removeOrganizer] = useMutation(REMOVE_ORGANIZER);

  const membersService = new MembersService({
    dispatch: context.dispatch,
    addAlert,
    destroyMember,
    createOrganizer,
    removeOrganizer,
  });

  if (!context) {
    throw new Error(`useMembers must be used within a MembersProvider`);
  }

  return {
    members: context.state.members,
    membersLoading: context.state.loading,
    dispatch: context.dispatch,
    membersService,
  };
};
