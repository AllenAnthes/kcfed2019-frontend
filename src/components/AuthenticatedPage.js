import React from 'react';

import { useAuth0 } from '../hooks/useAuth0';
import { useCurrentUser } from '../hooks/useCurrentUser';

const AuthenticatedPage = ({ children }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
  const { user, loading: loadingUser } = useCurrentUser();

  if (loading || loadingUser || !user) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return children(user);
};

export default AuthenticatedPage;
