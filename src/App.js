import React from 'react';
// components
import { AppAlerts } from './components/AppAlerts';
import { PageLayout } from './components/PageLayout';
import { TopNav } from './components/TopNav';
// elements
import { Box } from './elements/Box';

function App(props) {
  return (
    <Box flexDirection="column" flex={1}>
      <TopNav />
      <AppAlerts />
      {props.children}
      <PageLayout.Footer />
    </Box>
  );
}

export default App;
