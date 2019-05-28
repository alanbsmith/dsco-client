import React from 'react';

import { PageLayout } from './components/PageLayout';
import { Flexbox } from './elements/Flex';
import { TopNav } from './components/TopNav';

function App(props) {
  return (
    <Flexbox flexDirection="column" flex={1}>
      <TopNav />
      {props.children}
      <PageLayout.Footer />
    </Flexbox>
  );
}

export default App;
