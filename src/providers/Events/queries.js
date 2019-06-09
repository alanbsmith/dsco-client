import gql from 'graphql-tag';
import { locationParams } from '../Locations/queries';

export const eventParams = `
  id
  name
  details
  location {
    ${locationParams}
  }
  googleCalendarLink
  attendees {
    eventId
    userId
    hasDeclined
  }
  startTime
  endTime
`;

// queries
export function eventsQuery(params = eventParams) {
  return gql`
    {
      events {
        ${params}
      }
    }
  `;
}

export function eventQuery(id, params = eventParams) {
  return gql`
    {
      event(id: ${id}) {
        ${params}
      }
    }
  `;
}

// mutations
export const CREATE_EVENT = gql`
  mutation CreateEvent($input: EventInput!) {
    createEvent(input: $input) {
      ${eventParams}
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($input: EventInput!) {
    updateEvent(input: $input) {
      ${eventParams}
    }
  }
`;

export const DESTROY_EVENT = gql`
  mutation DestroyEvent($id: ID!) {
    destroyEvent(id: $id) {
      id
    }
  }
`;

export const ADD_ATTENDEE = gql`
  mutation AddAttendee($input: UpdateAttendeeInput!) {
    addAttendee(input: $input) {
      id
      userId
      eventId
    }
  }
`;

export const REMOVE_ATTENDEE = gql`
  mutation RemoveAttendee($input: UpdateAttendeeInput!) {
    removeAttendee(input: $input) {
      id
      userId
      eventId
    }
  }
`;
