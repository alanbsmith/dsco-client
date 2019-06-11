import React from 'react';
// components
import { PageLayout } from '../../components/PageLayout';
import { CreateEventForm } from './CreateEventForm';
// elements
import { Heading } from '../../elements/Heading';

export function CreateEvent() {
  return (
    <>
      <PageLayout.Header>
        <Heading>New Event</Heading>
      </PageLayout.Header>
      <PageLayout.Main>
        <CreateEventForm />
      </PageLayout.Main>
    </>
  );
}
