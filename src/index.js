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
import { EventsProvider } from './providers/Events';
import { LocationsProvider } from './providers/Locations';
import { MembersProvider } from './providers/Members';
// pages
import { Account } from './pages/Account';
import { CreateEvent } from './pages/CreateEvent';
import { EventSurvey } from './pages/EventSurvey';
import { ForgotPassword } from './pages/ForgotPassword';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ManageSubscriptions } from './pages/ManageSubscriptions';
import { ResetPassword } from './pages/ResetPassword';
import { Signup } from './pages/Signup';
import { VerifyEmail } from './pages/VerifyEmail';
// routes
import { ProtectedRoute } from './routes/ProtectedRoute';
import { OrganizerRoute } from './routes/OrganizerRoute';
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
      <MembersProvider>
        <LocationsProvider>
          <EventsProvider>
            <ThemeProvider theme={theme}>
              <Global styles={globalStyles} />
              <BrowserRouter>
                <AlertsProvider>
                  <App>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <ProtectedRoute exact path="/account" component={Account} />
                      <OrganizerRoute exact path="/events/create" component={CreateEvent} />
                      <OrganizerRoute exact path="/events/schedule_survey" component={EventSurvey} />
                      <Route exact path="/forgot_password" component={ForgotPassword} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/manage_subscriptions/:token" component={ManageSubscriptions} />
                      <Route exact path="/reset_password/:token" component={ResetPassword} />
                      <Route exact path="/signup" component={Signup} />
                      <Route exact path="/verify_email/:token" component={VerifyEmail} />
                      <Route component={Home} />
                    </Switch>
                  </App>
                </AlertsProvider>
              </BrowserRouter>
            </ThemeProvider>
          </EventsProvider>
        </LocationsProvider>
      </MembersProvider>
    </CurrentUserProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
