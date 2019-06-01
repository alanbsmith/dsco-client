import React from 'react';
// providers
import { useAlerts } from '../../providers/Alerts';
// component-specific elements
import { Alerts } from './Alerts';
import { AlertBanner } from './AlertBanner';
// elements
import { Box } from '../../elements/Box';
import { Text } from '../../elements/Text';

export const AppAlerts = () => {
  const { alerts, removeAlert } = useAlerts();
  const appAlerts = alerts.map(({ message, timeStamp, type }) => (
    <AlertBanner key={timeStamp} variant={type}>
      <Box flex={1} p={2}>
        <Text>{message}</Text>
      </Box>
      <AlertBanner.Button aria-label="close alert" aria-pressed={false} onClick={() => removeAlert(timeStamp)}>x</AlertBanner.Button>
    </AlertBanner>
  ));
  return (
    <Alerts>
      {appAlerts}
    </Alerts>
  );
}
