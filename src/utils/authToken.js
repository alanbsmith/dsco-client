const AUTH_TOKEN = 'dsco__token';

export const AuthToken = {
  get: () => {
    return localStorage.getItem(AUTH_TOKEN);
  },

  set: token => {
    return localStorage.setItem(AUTH_TOKEN, token);
  },

  delete: () => {
    return localStorage.removeItem(AUTH_TOKEN);
  },
};
