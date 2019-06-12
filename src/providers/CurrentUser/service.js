import { AuthToken } from '../../utils/authToken';
import * as ActionTypes from './ActionTypes';

class CurrentUserService {
  constructor (hooks) {
    this.dispatch = hooks.dispatch;
    this.addAlert = hooks.addAlert;
    this.refetchQuery = hooks.refetch;
    this.loginMutation = hooks.login;
    this.signupMutation = hooks.signup;
    this.verifyEmailMutation = hooks.verifyEmail;
    this.forgotPasswordMutation = hooks.forgotPassword;
    this.resetPasswordMutation = hooks.resetPassword;
    this.updateCurrentUserMutation = hooks.updateCurrentUser;
    this.destroyCurrentUserMutation = hooks.destroyCurrentUser;
  }

  async refetch() {
    this.dispatch({ type: ActionTypes.FETCH_CURRENT_USER_REQUEST });

    await this.refetchQuery()
      .then(({ data }) => {
        return this.dispatch({
          type: ActionTypes.FETCH_CURRENT_USER_SUCCESS,
          payload: data.currentUser,
        })
      })
      .catch((err) => {
        console.warn(err);
        const message = err.graphQLErrors ? err.graphQLErrors[0].message : 'Failed to get user information';
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.FETCH_CURRENT_USER_FAILURE });
      })
  }

  async login(input) {
    this.dispatch({ type: ActionTypes.LOGIN_REQUEST });

    await this.loginMutation({ variables: { input } })
      .then(({ data }) => {
        const { user, token } = data.login;
        AuthToken.set(token);
        return this.dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: user,
        })
      })
      .catch((err) => {
        console.warn(err);
        const message = err.graphQLErrors ? err.graphQLErrors[0].message : 'Login attempt was unsuccessful';
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.LOGIN_FAILURE });
      })
  }

  async signup(input) {
    this.dispatch({ type: ActionTypes.SIGNUP_REQUEST });

    await this.signupMutation({ variables: { input } })
      .then(({ data }) => {
        const { user, token } = data.signup;
        AuthToken.set(token);
        this.addAlert({ type: 'success', message: 'Your account has been created! Welcome to DSCO!' });
        return this.dispatch({
          type: ActionTypes.SIGNUP_SUCCESS,
          payload: user,
        })
      })
      .catch((err) => {
        console.warn(err);
        const message = err.graphQLErrors ? err.graphQLErrors[0].message : 'Your account was not successfully created';
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.SIGNUP_FAILURE });
      })
  }

  async verifyEmail(input) {
    this.dispatch({ type: ActionTypes.VERIFY_EMAIL_REQUEST });

    await this.verifyEmailMutation({ variables: { input } })
      .then(({ data }) => {
        const { user, token } = data.verifyEmail;
        AuthToken.set(token);
        this.addAlert({ type: 'success', message: 'Thanks! Your email address has been verified!!' });
        return this.dispatch({
          type: ActionTypes.VERIFY_EMAIL_SUCCESS,
          payload: user,
        })
      })
      .catch((err) => {
        console.warn(err);
        this.addAlert({ type: 'danger', message: 'Email verification was unsuccessful' });
        this.dispatch({ type: ActionTypes.VERIFY_EMAIL_FAILURE });
      })
  }

  async forgotPassword(input) {
    this.dispatch({ type: ActionTypes.FORGOT_PASSWORD_REQUEST });

    await this.forgotPasswordMutation({ variables: { input } })
      .then(() => {
        this.addAlert({ type: 'success', message: 'Thanks! If an account exists we\'ll send you an email to reset your password.' });
        return this.dispatch({ type: ActionTypes.FORGOT_PASSWORD_SUCCESS })
      })
      .catch((err) => {
        console.warn(err);
        this.addAlert({ type: 'danger', message: 'Forgot password request was unsuccessful' });
        this.dispatch({ type: ActionTypes.FORGOT_PASSWORD_FAILURE });
      })
  }

  async resetPassword(input) {
    this.dispatch({ type: ActionTypes.RESET_PASSWORD_REQUEST });

    await this.resetPasswordMutation({ variables: { input } })
      .then(({ data }) => {
        const { user, token } = data.resetPassword;
        AuthToken.set(token);
        this.addAlert({ type: 'success', message: 'Your password has been successfully reset!' });
        return this.dispatch({
          type: ActionTypes.RESET_PASSWORD_SUCCESS,
          payload: user,
        })
      })
      .catch((err) => {
        console.warn(err);
        const message = err.graphQLErrors ? err.graphQLErrors[0].message : 'Your request to reset your password was unsuccessful';
        this.addAlert({ type: 'danger', message });
        this.dispatch({ type: ActionTypes.RESET_PASSWORD_FAILURE });
      })
  }

  async updateCurrentUser(input) {
    this.dispatch({ type: ActionTypes.UPDATE_CURRENT_USER_REQUEST });

    await this.updateCurrentUserMutation({ variables: { input } })
      .then(({ data }) => {
        const { user, token } = data.updateCurrentUser;
        AuthToken.set(token);
        this.addAlert({ type: 'success', message: 'Your account information has been updated!' });
        return this.dispatch({
          type: ActionTypes.UPDATE_CURRENT_USER_SUCCESS,
          payload: user,
        })
      })
      .catch((err) => {
        console.warn(err);
        this.addAlert({ type: 'danger', message: 'Your attempt to update your account was unsuccessful' });
        this.dispatch({ type: ActionTypes.UPDATE_CURRENT_USER_FAILURE });
      })
  }

  async destroyCurrentUser(id) {
    this.dispatch({ type: ActionTypes.DESTROY_CURRENT_USER_REQUEST });
    await this.destroyCurrentUserMutation({ variables: { input: id } })
      .then(({ data }) => {
        AuthToken.delete();
        this.addAlert({ type: 'success', message: 'Your account has been successfully deleted' });
        this.dispatch({ type: ActionTypes.DESTROY_CURRENT_USER_SUCCESS })
      })
      .catch((err) => {
        console.warn(err);
        this.addAlert({ type: 'danger', message: 'Your delete account request was unsuccessful' });
        this.dispatch({ type: ActionTypes.DESTROY_CURRENT_USER_FAILURE });
      })
  }
}

export default CurrentUserService;