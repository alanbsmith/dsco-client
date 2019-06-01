import React from 'react';

import { PageLayout } from './components/PageLayout';
import { Box } from './elements/Box';
import { TopNav } from './components/TopNav';

function App(props) {
  return (
    <Box flexDirection="column" flex={1}>
      <TopNav />
      {props.children}
      <PageLayout.Footer />
    </Box>
  );
}

export default App;
