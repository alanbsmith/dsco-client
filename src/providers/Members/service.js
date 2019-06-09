import * as ActionTypes from './ActionTypes';

class MembersService {
  constructor (hooks) {
    this.dispatch = hooks.dispatch;
    this.addAlert = hooks.addAlert;
    this.destroyMemberMutation = hooks.destroyMember;
    this.createOrganizerMutation = hooks.createOrganizer;
    this.removeOrganizerMutation = hooks.removeOrganizer;
  }

  async createOrganizer(data) {
    this.dispatch({ type: ActionTypes.CREATE_ORGANIZER_REQUEST });

    await this.createMutation({ variables: { input: data } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: 'Organizer created!' });
        return this.dispatch({
          type: ActionTypes.CREATE_ORGANIZER_SUCCESS,
          payload: data.createOrganizer,
        })
      })
      .catch((err) => {
        console.warn(err);
        const { message } = err.graphQLErrors[0];
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.CREATE_ORGANIZER_FAILURE });
      })
  }

  async removeOrganizer(data) {
    this.dispatch({ type: ActionTypes.REMOVE_ORGANIZER_REQUEST });

    await this.removeMutation({ variables: { input: data } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: 'Organizer removed!' });
        return this.dispatch({
          type: ActionTypes.REMOVE_ORGANIZER_SUCCESS,
          payload: data.removeOrganizer,
        })
      })
      .catch((err) => {
        console.warn(err);
        const { message } = err.graphQLErrors[0];
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.REMOVE_ORGANIZER_FAILURE });
      })
  }

  async destroyMember(data) {
    this.dispatch({ type: ActionTypes.DESTROY_MEMBER_REQUEST });

    await this.removeMutation({ variables: { input: data } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: 'Member deleted!' });
        return this.dispatch({
          type: ActionTypes.DESTROY_MEMBER_SUCCESS,
          payload: data.destroyMember,
        })
      })
      .catch((err) => {
        console.warn(err);
        const { message } = err.graphQLErrors[0];
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.DESTROY_MEMBER_FAILURE });
      })
  }
}

export default MembersService;