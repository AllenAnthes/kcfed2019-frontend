import React, { useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import ClickStuff from './pages/ClickStuff';
import Auth0Provider from './hooks/useAuth0';
import Nav from './components/Nav';
import PrivateMessages from './pages/PrivateMessages';
import { SnackbarProvider } from 'notistack';
import Profile from './pages/Profile';
import { light } from './theme';
import SwipePage from './pages/SwipePage';
import MyBusiness from './pages/MyBusiness';
import User from './pages/User';
import SwipeBusinesses from './pages/SwipeBusinesses';
const domain = process.env.REACT_APP_DOMAIN || 'ucmo.auth0.com';
const client_id = process.env.REACT_APP_CLIENT_ID || 'ovgpuezFccL1dIEicco4k9s3gRpOjQrw';
const audience = process.env.REACT_APP_AUDIENCE || 'kcfed-2019';

// A function that routes the user to the right place after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
  );
};

function App() {
  const redirectCallback = useCallback(onRedirectCallback, []);

  return (
    <MuiThemeProvider theme={light}>
      <Auth0Provider
        domain={domain}
        client_id={client_id}
        audience={audience}
        redirect_uri={window.location.origin}
        onRedirectCallback={redirectCallback}
      >
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          autoHideDuration={3000}
        >
          <Router>
            <Nav>
              <Switch>
                <Route exact path="/">
                  <ClickStuff />
                </Route>
                <Route path="/users/:skillset">
                  <SwipePage />
                </Route>

                <Route path={'/user/:id'}>
                  <User />
                </Route>

                <Route path="/users">
                  <SwipePage />
                </Route>

                <Route path="/businesses">
                  <SwipeBusinesses />
                </Route>

                <Route path="/private">
                  <PrivateMessages />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/business">
                  <MyBusiness />
                </Route>
              </Switch>
            </Nav>
          </Router>
        </SnackbarProvider>
      </Auth0Provider>
    </MuiThemeProvider>
  );
}

export default App;
