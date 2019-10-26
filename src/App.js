import React, { useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClickStuff from './pages/ClickStuff';
import Auth0Provider from './hooks/useAuth0';
import PublicMessages from './pages/PublicMessages';
import Nav from './components/Nav';
import PrivateMessages from './pages/PrivateMessages';
// import { SnackbarProvider } from './hooks/useSnackbars';
import { SnackbarProvider } from 'notistack';
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

              <Route path="/public">
                <PublicMessages />
              </Route>
              <Route path="/private">
                <PrivateMessages />
              </Route>
            </Switch>
          </Nav>
        </Router>
      </SnackbarProvider>
    </Auth0Provider>
  );
}

export default App;
