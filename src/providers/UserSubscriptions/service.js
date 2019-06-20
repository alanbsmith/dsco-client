import * as ActionTypes from './ActionTypes';

class UserSubscriptionsService {
  constructor (hooks) {
    this.dispatch = hooks.dispatch;
    this.addAlert = hooks.addAlert;
    this.destroyUserSubscriptionMutation = hooks.destroyUserSubscription;
    this.createUserSubscriptionMutation = hooks.createUserSubscription;
  }

  async createUserSubscription(data) {
    this.dispatch({ type: ActionTypes.CREATE_USER_SUBSCRIPTION_REQUEST });

    await this.createUserSubscriptionMutation({ variables: { input: data } })
      .then(({ data }) => {
        return this.dispatch({
          type: ActionTypes.CREATE_USER_SUBSCRIPTION_SUCCESS,
          payload: data.createUserSubscription,
        })
      })
      .catch((err) => {
        console.warn(err);
        const message = err.graphQLErrors ? err.graphQLErrors[0].message : 'Update failed';
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.CREATE_USER_SUBSCRIPTION_FAILURE });
      })
  }

  async destroyUserSubscription(data) {
    this.dispatch({ type: ActionTypes.DESTROY_USER_SUBSCRIPTION_REQUEST });

    await this.destroyUserSubscriptionMutation({ variables: { input: data } })
      .then(({ data }) => {
        return this.dispatch({
          type: ActionTypes.DESTROY_USER_SUBSCRIPTION_SUCCESS,
          payload: data.destroyUserSubscription,
        })
      })
      .catch((err) => {
        console.warn(err);
        const message = err.graphQLErrors ? err.graphQLErrors[0].message : 'Update failed';
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.DESTROY_USER_SUBSCRIPTION_FAILURE });
      })
  }
}

export default UserSubscriptionsService;