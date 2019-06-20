import * as ActionTypes from './ActionTypes';

export const initialState = {
  subscriptions: [],
  loading: null,
};

export function reducer(state, action) {
  switch (action.type) {
    // fetch subscriptions
    case ActionTypes.FETCH_SUBSCRIPTIONS_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FETCH_SUBSCRIPTIONS_SUCCESS:
      return {
        subscriptions: action.payload,
        loading: false,
      };
    case ActionTypes.FETCH_SUBSCRIPTIONS_FAILURE:
      return { ...state, loading: false };
    // default  
    default:
      return state;
  }
}
