import * as ActionTypes from './ActionTypes';

export const initialState = {
  events: [],
  loading: null,
};

function updateEvent(state, updated) {
  return state.events.map(ev => {
    if (ev.id === updated.id) {
      return updated;
    }
    return ev;
  })
}

function destroyEvent(state, id) {
  return state.events.filter(ev => (ev.id !== id));
}

function updateAttendee(state, attendee) {
  return state.events.map(ev => {
    if (ev.id === attendee.eventId) {
      ev.attendees = ev.attendees.concat(attendee);
    }
    return ev;
  })
}

export function reducer(state, action) {
  switch (action.type) {
    // fetch events
    case ActionTypes.FETCH_EVENTS_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FETCH_EVENTS_SUCCESS:
      return {
        events: action.payload,
        loading: false,
      };
    case ActionTypes.FETCH_EVENTS_FAILURE:
      return { ...state, loading: false };

    // create event
    case ActionTypes.CREATE_EVENT_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.CREATE_EVENT_SUCCESS:
      return {
        events: state.events.concat(action.payload),
        loading: false,
      };
    case ActionTypes.CREATE_EVENT_FAILURE:
      return { ...state, loading: false };

    // update event
    case ActionTypes.UPDATE_EVENT_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.UPDATE_EVENT_SUCCESS:
      return {
        events: updateEvent(state, action.payload),
        loading: false,
      };
    case ActionTypes.UPDATE_EVENT_FAILURE:
      return { ...state, loading: false };

    // destroy event
    case ActionTypes.DESTROY_EVENT_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.DESTROY_EVENT_SUCCESS:
      return {
        events: destroyEvent(state, action.payload),
        loading: false,
      };
    case ActionTypes.DESTROY_EVENT_FAILURE:
      return { ...state, loading: false };

    // add attendee
    case ActionTypes.ADD_ATTENDEE_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.ADD_ATTENDEE_SUCCESS:
      return {
        events: updateAttendee(state, action.payload),
        loading: false,
      };
    case ActionTypes.ADD_ATTENDEE_FAILURE:
      return { ...state, loading: false };

    // remove attendee
    case ActionTypes.REMOVE_ATTENDEE_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.REMOVE_ATTENDEE_SUCCESS:
      return {
        events: updateAttendee(state, action.payload),
        loading: false,
      };
    case ActionTypes.REMOVE_ATTENDEE_FAILURE:
      return { ...state, loading: false };

    // default  
    default:
      return state;
  }
}
