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
  locationName: yup
    .string()
    .when('locationId', (locationId, schema) => {
      return locationId === 'other'
        ? schema.required('Location name is required')
        : yup.string();
    }),
  address: yup
    .string()
    .when('locationId', (locationId, schema) => {
      return locationId === 'other'
        ? schema.required('Address is required')
        : yup.string();
    }),
  city: yup
    .string()
    .when('locationId', (locationId, schema) => {
      return locationId === 'other'
        ? schema.required('City is required')
        : yup.string();
    }),
  state: yup
    .string()
    .when('locationId', (locationId, schema) => {
      return locationId === 'other'
        ? schema.required('State is required')
        : yup.string();
    }),
  zip: yup
    .string()
    .when('locationId', (locationId, schema) => {
      return locationId === 'other'
        ? schema.required('zip is required')
        : yup.string();
    }),
  website: yup
    .string()
    .when('locationId', (locationId, schema) => {
      return locationId === 'other'
        ? schema.required('Website is required')
        : yup.string();
    }),
  startTime: yup
    .date()
    .required('Start time is required')
    .min(moment(), 'Start time must be in the future'),
  endTime: yup
    .date()
    .when('startTime', (st) => {
      return yup
        .date()
        .required('End time is required')
        .min(moment(st).add(1, 'minute'), `End time must be after ${moment(st).format('lll')}`);
    }),
})

export function UpdateEventForm({ event, closeModal }) {
  const { locations, locationsService } = useLocations();
  const { eventService } = useEvents();

  const initialValues = {
    name: event.name,
    details: event.details,
    locationId: event.location.id,
    startTime: event.startTime,
    endTime: event.endTime,
    locationName: '',
    address: '',
    city: '',
    state: 'CO',
    zip: '',
    website: '',
  }

  function handleSubmit(values) {
    const { locationName, address, city, state, zip, website, ...eventValues } = values;
    // if using a new location, create that location first
    if (eventValues.locationId.toLowerCase() === 'other') {
      return locationsService.create({
        name: locationName,
        address,
        city,
        state,
        zip,
        website,
      }).then((newLocation) => {
        return eventService.update({
          ...eventValues,
          id: event.id,
          locationId: newLocation.id
        })
      }).then(closeModal)
    }
    // if using an existing location
    return eventService.update({ ...eventValues, id: event.id }).then(closeModal);
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
              <option value="">--</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
              <option value="other">Other</option>
            </ValidatedSelectField>
            {
              formikProps.values.locationId === 'other' && (
                <>
                  <ValidatedTextField {...formikProps} name="locationName" label="location name" />
                  <ValidatedTextField {...formikProps} name="address" />
                  <ValidatedTextField {...formikProps} name="city" />
                  <ValidatedTextField {...formikProps} name="state" />
                  <ValidatedTextField {...formikProps} name="zip" label="Zipcode" />
                  <ValidatedTextField {...formikProps} name="website" />
                </>
              )
            }
            <ValidatedTextField {...formikProps} name="startTime" label={startTimeLabel} type="datetime-local" />
            <ValidatedTextField {...formikProps} name="endTime" label={endTimeLabel} type="datetime-local" />
            <ButtonList>
              <Button type="submit" disabled={!isValid} variant={isValid ? 'primary' : 'disabled'}>Update Event</Button>
            </ButtonList>
          </Form>
        )
      }}
    </Formik>
  );
}

