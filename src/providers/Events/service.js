import * as ActionTypes from './ActionTypes';

class EventService {
  constructor (hooks) {
    this.dispatch = hooks.dispatch;
    this.addAlert = hooks.addAlert;
    this.createMutation = hooks.create;
    this.updateMutation = hooks.update;
    this.destroyMutation = hooks.destroy;
    this.addAttendeeMutation = hooks.addAttendee;
    this.removeAttendeeMutation = hooks.removeAttendee;
    this.refetchQuery = hooks.refetch;
  }

  async refetch() {
    this.dispatch({ type: ActionTypes.FETCH_EVENTS_REQUEST });
    await this.refetchQuery()
      .then(({ data }) => {
        return this.dispatch({
          type: ActionTypes.FETCH_EVENTS_SUCCESS,
          payload: data.events,
        });
      })
      .catch((err) => {
        console.warn(err);
        this.dispatch({ type: ActionTypes.FETCH_EVENTS_FAILURE });
      })
  }

  async create(input) {
    this.dispatch({ type: ActionTypes.CREATE_EVENT_REQUEST });

    await this.createMutation({ variables: { input } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: 'Event created!' });
        return this.dispatch({
          type: ActionTypes.CREATE_EVENT_SUCCESS,
          payload: data.createEvent,
        })
      })
      .catch((err) => {
        console.warn(err);
        const { message } = err.graphQLErrors[0];
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.CREATE_EVENT_FAILURE });
      })
  }

  async update(input) {
    this.dispatch({ type: ActionTypes.UPDATE_EVENT_REQUEST });

    await this.updateMutation({ variables: { input } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: 'Event updated!' });
        return this.dispatch({
          type: ActionTypes.UPDATE_EVENT_SUCCESS,
          payload: data.updateEvent,
        })
      })
      .catch((err) => {
        console.warn(err);
        const { message } = err.graphQLErrors[0];
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.UPDATE_EVENT_FAILURE });
      })
  }

  async destroy(id) {
    this.dispatch({ type: ActionTypes.DESTROY_EVENT_REQUEST });

    await this.destroyMutation({ variables: { id } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: 'Event deleted!' });
        return this.dispatch({
          type: ActionTypes.DESTROY_EVENT_SUCCESS,
          payload: data.destroyEvent,
        })
      })
      .catch((err) => {
        console.warn(err);
        const { message } = err.graphQLErrors[0];
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.DESTROY_EVENT_FAILURE });
      })
  }

  async addAttendee(input) {
    this.dispatch({ type: ActionTypes.ADD_ATTENDEE_REQUEST });

    await this.addAttendeeMutation({ variables: { input } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: "Thanks! We'll see you there!" });
        this.dispatch({
          type: ActionTypes.ADD_ATTENDEE_SUCCESS,
          payload: data.addAttendee,
        });
        this.refetch();
      })
      .catch((err) => {
        console.warn(err);
        const { message } = err.graphQLErrors[0];
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.ADD_ATTENDEE_FAILURE });
      })
  }

  async removeAttendee(input) {
    this.dispatch({ type: ActionTypes.REMOVE_ATTENDEE_REQUEST });

    await this.removeAttendeeMutation({ variables: { input } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: "Thanks! We'll catch you next time!" });
        this.dispatch({
          type: ActionTypes.REMOVE_ATTENDEE_SUCCESS,
          payload: data.removeAttendee,
        });
        this.refetch();
      })
      .catch((err) => {
        console.warn(err);
        const { message } = err.graphQLErrors[0];
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.REMOVE_ATTENDEE_FAILURE });
      })
  }
}

export default EventService;
