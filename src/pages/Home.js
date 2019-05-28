import React from 'react';

import { PageLayout } from '../components/PageLayout';
import { Heading } from '../elements/Heading';
import { Text } from '../elements/Text';

export const Home = () => (
  <>
    <PageLayout.Header>
      <Heading>Design Systems</Heading>
      <Text textTransform="uppercase" letterSpacing="2px" fontSize="sm">colorado</Text>
    </PageLayout.Header>
    <PageLayout.Main />
  </>
);
