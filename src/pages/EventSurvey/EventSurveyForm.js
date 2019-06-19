import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
// // providers
import { useEvents } from '../../providers/Events';
// // components
import { ValidatedTextField } from '../../components/ValidatedTextField';
import { ValidatedSelectField } from '../../components/ValidatedSelectField';
// // elements
import { Button } from '../../elements/Button';
import { ButtonList } from '../../elements/ButtonList';
import { Form } from '../../elements/Form';

const eventSurveySchema = yup.object().shape({
  eventId: yup
    .string()
    .required('Event is required'),
  surveyUrl: yup
    .string()
    .url('Survey link must be a valid URL')
    .required('Survey url is required'),
  sendAt: yup
    .date()
    .required('Scheduled time is required'),
})

export function EventSurveyForm() {
  const { events, eventService } = useEvents();

  const initialValues = {
    eventId: '',
    surveyUrl: '',
    sendAt: '',
  }

  function handleSubmit(values) {
    return eventService.scheduleSurvey(values);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={eventSurveySchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => {
        const { values, isValid } = formikProps
        const sendAtLabel = `Schedule for${values.sendAt ? `: ${moment(values.sendAt).format('dddd, MMMM Do @ h:mma')}` : ''}`.trim();
        return (
          <Form as={FormikForm}>
            <ValidatedSelectField name="eventId" label="Event" {...formikProps}>
              <option>Select an event</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.name}</option>
              ))}
            </ValidatedSelectField>
            <ValidatedTextField {...formikProps} name="surveyUrl" label="Survey URL" />
            <ValidatedTextField {...formikProps} name="sendAt" label={sendAtLabel} type="datetime-local" />
            <ButtonList>
              <Button type="submit" disabled={!isValid} variant={isValid ? 'primary' : 'disabled'}>Schedule Survey</Button>
            </ButtonList>
          </Form>
        )
      }}
    </Formik>
  );
}