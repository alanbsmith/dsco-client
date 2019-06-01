import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
// providers
import { AlertsProvider } from './providers/Alerts';
import { CurrentUserProvider } from './providers/CurrentUser';
// pages
import { Account } from './pages/Account';
import { ForgotPassword } from './pages/ForgotPassword';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ResetPassword } from './pages/ResetPassword';
import { Signup } from './pages/Signup';
// routes
import { ProtectedRoute } from './routes/ProtectedRoute';
// sw
import * as serviceWorker from './serviceWorker';

import theme from './config/theme';
import globalStyles from './config/globalStyles';
import { AuthToken } from './utils/authToken';

const uri = process.env.NODE_ENV === 'production' ? 'https://dsco-api.herokuapp.com/api' : 'http://localhost:8080/api';

const client = new ApolloClient({
  uri,
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = AuthToken.get();
    operation.setContext({
      headers: {
        authorization: token ? `${token}` : '',
      },
    });
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <CurrentUserProvider>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <BrowserRouter>
          <AlertsProvider>
            <App>
              <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute exact path="/account" component={Account} />
                <Route exact path="/forgot_password" component={ForgotPassword} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/reset_password" component={ResetPassword} />
                <Route exact path="/signup" component={Signup} />
                <Route component={Home} />
              </Switch>
            </App>
          </AlertsProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CurrentUserProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
