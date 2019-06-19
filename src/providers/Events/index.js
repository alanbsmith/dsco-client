import React, { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAlerts } from '../Alerts';

import * as ActionTypes from './ActionTypes';
import EventService from './service';
import { eventsQuery, CREATE_EVENT, UPDATE_EVENT, DESTROY_EVENT, ADD_ATTENDEE, REMOVE_ATTENDEE, SCHEDULE_SURVEY } from './queries';
import { initialState, reducer } from './reducer';

const EventsContext = createContext();

export const EventsProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, err, refetch } = useQuery(eventsQuery());
  const value = useMemo(
    () => ({
      state,
      dispatch,
      refetch,
    }),
    [state, dispatch, refetch]
  );

  function fetchEvents() {
    if (loading) {
      return dispatch({
        type: ActionTypes.FETCH_EVENTS_REQUEST
      });
    }
    if (!loading && data) {
      return dispatch({
        type: ActionTypes.FETCH_EVENTS_SUCCESS,
        payload: data.events,
      });
    }
    if (err) {
      return dispatch({
        type: ActionTypes.FETCH_EVENTS_FAILURE
      });
    }
  }

  useEffect(fetchEvents, [loading]);

  return <EventsContext.Provider value={value} {...props} />;
};

export function useEvents() {
  const context = useContext(EventsContext);
  const [create] = useMutation(CREATE_EVENT);
  const [update] = useMutation(UPDATE_EVENT);
  const [destroy] = useMutation(DESTROY_EVENT);
  const [addAttendee] = useMutation(ADD_ATTENDEE);
  const [removeAttendee] = useMutation(REMOVE_ATTENDEE);
  const [scheduleSurvey] = useMutation(SCHEDULE_SURVEY);
  const { addAlert } = useAlerts();

  const eventService = new EventService({
    dispatch: context.dispatch,
    addAlert,
    create,
    update,
    destroy,
    addAttendee,
    removeAttendee,
    scheduleSurvey,
    refetch: context.refetch,
  });

  if (!context) {
    throw new Error(`useEvents must be used within a EventsProvider`);
  }

  return {
    events: context.state.events,
    eventsLoading: context.state.loading,
    dispatch: context.dispatch,
    eventService,
  };
};
