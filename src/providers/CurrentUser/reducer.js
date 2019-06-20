import * as ActionTypes from './ActionTypes';
import { AuthToken } from '../../utils/authToken';

export const initialState = {
  currentUser: null,
  loading: null,
};

export function reducer(state, action) {
  switch (action.type) {
    // fetch current user
    case ActionTypes.FETCH_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FETCH_CURRENT_USER_SUCCESS:
      return { currentUser: action.payload, loading: false };
    case ActionTypes.FETCH_CURRENT_USER_FAILURE:
      return { ...state, loading: false };

    // update current user
    case ActionTypes.UPDATE_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.UPDATE_CURRENT_USER_SUCCESS:
      return { currentUser: action.payload, loading: false };
    case ActionTypes.UPDATE_CURRENT_USER_FAILURE:
      return { ...state, loading: false };

    // destroy current user
    case ActionTypes.DESTROY_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.DESTROY_CURRENT_USER_SUCCESS:
      return { currentUser: null, loading: false };
    case ActionTypes.DESTROY_CURRENT_USER_FAILURE:
      return { ...state, loading: false };

    // login / logout
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.LOGIN_SUCCESS:
      return { currentUser: action.payload, loading: false };
    case ActionTypes.LOGIN_FAILURE:
      return { ...state, loading: false };
    case ActionTypes.LOGOUT:
      AuthToken.delete();
      return { ...state, currentUser: null };

    // signup
    case ActionTypes.SIGNUP_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.SIGNUP_SUCCESS:
      return { currentUser: action.payload, loading: false };
    case ActionTypes.SIGNUP_FAILURE:
      return { ...state, loading: false };

    // verify email
    case ActionTypes.VERIFY_EMAIL_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.VERIFY_EMAIL_SUCCESS:
      return { currentUser: action.payload, loading: false };
    case ActionTypes.VERIFY_EMAIL_FAILURE:
      return { ...state, loading: false };
    // verify email
    case ActionTypes.SEND_VERIFICATION_EMAIL_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.SEND_VERIFICATION_EMAIL_SUCCESS:
      return { ...state, loading: false };
    case ActionTypes.SEND_VERIFICATION_EMAIL_FAILURE:
      return { ...state, loading: false };

    // reset password
    case ActionTypes.RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.RESET_PASSWORD_SUCCESS:
      return { currentUser: action.payload, loading: false };
    case ActionTypes.RESET_PASSWORD_FAILURE:
      return { ...state, loading: false };

    // forgot password
    case ActionTypes.FORGOT_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false };
    case ActionTypes.FORGOT_PASSWORD_FAILURE:
      return { ...state, loading: false };

    // default
    default:
      return state;
  }
}