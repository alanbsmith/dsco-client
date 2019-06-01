import React, { createContext, useContext, useState, useMemo } from 'react';

const AlertsContext = createContext();

export const AlertsProvider = props => {
  const [alerts, setAlerts] = useState([]);

  const value = useMemo(() => {
    return {
      alerts,
      setAlerts,
    };
  }, [alerts]);

  return <AlertsContext.Provider value={value} {...props} />;
}

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error(`useAlerts must be used within a AlertsProvider`);
  }

  function addAlert({ type, message }) {
    const newAlert = {
      message,
      type,
      timeStamp: Date.now(),
    };
    const newAlerts = context.alerts.concat(newAlert);
    context.setAlerts(newAlerts);
  };

  function removeAlert(alertTimeStamp) {
    const newAlerts = context.alerts.filter((alert) => {
      return alert.timeStamp !== alertTimeStamp;
    })
    context.setAlerts(newAlerts);
  };

  return {
    addAlert,
    alerts: context.alerts,
    removeAlert,
  };
}
