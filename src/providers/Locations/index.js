import React, { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAlerts } from '../Alerts';

import * as ActionTypes from './ActionTypes';
import LocationsService from './service';
import { locationsQuery, CREATE_LOCATION, updateLocation, destroyLocation } from './queries';
import { initialState, reducer } from './reducer';

const LocationsContext = createContext();

export const LocationsProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, err } = useQuery(locationsQuery());

  const value = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state, dispatch]
  );

  function fetchLocations() {
    if (loading) {
      return dispatch({
        type: ActionTypes.FETCH_LOCATIONS_REQUEST
      });
    }
    if (!loading && data) {
      return dispatch({
        type: ActionTypes.FETCH_LOCATIONS_SUCCESS,
        payload: data.locations,
      });
    }
    if (err) {
      return dispatch({
        type: ActionTypes.FETCH_LOCATIONS_FAILURE
      });
    }
  }

  useEffect(fetchLocations, [loading]);

  return <LocationsContext.Provider value={value} {...props} />;
};

export function useLocations() {
  const context = useContext(LocationsContext);
  const [create] = useMutation(CREATE_LOCATION);
  const [update] = useMutation(updateLocation());
  const [destroy] = useMutation(destroyLocation());
  const { addAlert } = useAlerts();

  const locationsService = new LocationsService(context.dispatch, addAlert, create, update, destroy);

  if (!context) {
    throw new Error(`useLocations must be used within a LocationsProvider`);
  }

  return {
    locations: context.state.locations,
    locationsLoading: context.state.loading,
    dispatch: context.dispatch,
    locationsService,
  };
};
