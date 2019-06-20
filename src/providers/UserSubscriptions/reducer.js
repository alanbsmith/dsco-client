import * as ActionTypes from './ActionTypes';

export const initialState = {
  userSubscriptions: [],
  loading: null,
};

function destroyUserSubscription(state, { id }) {
  return state.userSubscriptions.filter(userSub => userSub.id !== id);
}

export function reducer(state, action) {
  switch (action.type) {
    // fetch user subscriptions
    case ActionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS:
      return {
        userSubscriptions: action.payload,
        loading: false,
      };
    case ActionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE:
      return { ...state, loading: false };

    // create user subscriptions
    case ActionTypes.CREATE_USER_SUBSCRIPTION_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.CREATE_USER_SUBSCRIPTION_SUCCESS:
      return {
        userSubscriptions: state.userSubscriptions.concat(action.payload),
        loading: false,
      };
    case ActionTypes.CREATE_USER_SUBSCRIPTION_FAILURE:
      return { ...state, loading: false };

    // destroy user subscriptions
    case ActionTypes.DESTROY_USER_SUBSCRIPTION_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.DESTROY_USER_SUBSCRIPTION_SUCCESS:
      return {
        userSubscriptions: destroyUserSubscription(state, action.payload),
        loading: false,
      };
    case ActionTypes.DESTROY_USER_SUBSCRIPTION_FAILURE:
      return { ...state, loading: false };

    // default  
    default:
      return state;
  }
}
