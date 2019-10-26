import React from 'react';

import { useAuth0 } from '../hooks/useAuth0';

const AuthenticatedPage = ({ children }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return children;
};

export default AuthenticatedPage;
