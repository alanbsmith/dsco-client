import React from 'react';
// components
import { PageLayout } from '../../components/PageLayout';
import { EventSurveyForm } from './EventSurveyForm';
// elements
import { Heading } from '../../elements/Heading';

export function EventSurvey() {
  return (
    <>
      <PageLayout.Header>
        <Heading>Schedule Survey Email</Heading>
      </PageLayout.Header>
      <PageLayout.Main>
        <EventSurveyForm />
      </PageLayout.Main>
    </>
  );
}
