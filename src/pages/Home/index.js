import React from 'react';
// components
import { PageLayout } from '../../components/PageLayout';
// elements
import { Heading } from '../../elements/Heading';
import { Text } from '../../elements/Text';

export const Home = (props) => {
  return (
    <>
      <PageLayout.Header>
        <Heading>Design Systems</Heading>
        <Text textTransform="uppercase" letterSpacing="2px" fontSize="sm">colorado</Text>
      </PageLayout.Header>
      <PageLayout.Main />
    </>
  )
};
