import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
// // providers
import { useLocations } from '../../providers/Locations';
import { useEvents } from '../../providers/Events';
// // components
import { ValidatedTextArea } from '../../components/ValidatedTextArea';
import { ValidatedTextField } from '../../components/ValidatedTextField';
import { ValidatedSelectField } from '../../components/ValidatedSelectField';
// // elements
import { Button } from '../../elements/Button';
import { ButtonList } from '../../elements/ButtonList';
import { Form } from '../../elements/Form';


const createEventSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required'),
  details: yup
    .string()
    .required('Event details are required'),
  locationId: yup
    .string()
    .required('Location is required'),
  startTime: yup
    .date()
    .required('Start time is required'),
  endTime: yup
    .date()
    .when('startTime', (st, schema) => {
      return yup
        .date()
        .required('End time is required')
        .min(moment(st).add(1, 'minute'), `End time must be after ${moment(st).format('lll')}`);
    }),
})

export function CreateEventForm() {
  const { locations } = useLocations();
  const { eventService } = useEvents();

  const initialValues = {
    name: '',
    details: '',
    locationId: '',
    startTime: '',
    endTime: '',
  }

  function handleSubmit(values) {
    return eventService.create(values);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createEventSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => {
        const { values, isValid } = formikProps
        const startTimeLabel = `Start${values.startTime ? `: ${moment(values.startTime).format('dddd, MMMM Do @ h:mma')}` : ''}`.trim();
        const endTimeLabel = `End${values.endTime ? `: ${moment(values.endTime).format('dddd, MMMM Do @ h:mma')}` : ''}`.trim();
        return (
          <Form as={FormikForm}>
            <ValidatedTextField {...formikProps} name="name" />
            <ValidatedTextArea {...formikProps} name="details" />
            <ValidatedSelectField name="locationId" label="Choose a location" {...formikProps}>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </ValidatedSelectField>
            <ValidatedTextField {...formikProps} name="startTime" label={startTimeLabel} type="datetime-local" />
            <ValidatedTextField {...formikProps} name="endTime" label={endTimeLabel} type="datetime-local" />
            <ButtonList>
              <Button type="submit" disabled={!isValid} variant={isValid ? 'primary' : 'disabled'}>Create Event</Button>
            </ButtonList>
          </Form>
        )
      }}
    </Formik>
  );
}

