import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { locationsQuery } from './query';

const LocationsContext = createContext();

export const LocationsProvider = props => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { data, loading, err } = useQuery(locationsQuery());

  const value = useMemo(
    () => {
      return {
        locations,
        setLocations,
        isLoading,
      };
    },
    [locations, isLoading]
  );

  function handleUpdate() {
    if (loading) {
      return setLoading(loading);
    }
    if (!loading && data) {
      setLocations(data.locations);
      return setLoading(false);
    }
    if (err) {
      console.warn(err);
      return setLoading(false);
    }
  }

  useEffect(handleUpdate, [loading]);

  return <LocationsContext.Provider value={value} {...props} />;
};

export const useLocations = () => {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error(`useLocations must be used within a LocationsProvider`);
  }

  return {
    locations: context.Locations,
    locationsLoading: context.isLoading,
    setLocations: context.setLocations,
  };
};

