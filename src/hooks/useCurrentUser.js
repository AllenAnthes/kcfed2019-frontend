import { useAuth0 } from './useAuth0';
import { useApi } from './useApi';
import { useEffect, useState } from 'react';

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isAuthenticated } = useAuth0();
  const api = useApi();

  useEffect(() => {
    if (isAuthenticated) {
      api
        .get('/api/user/me')
        .then(res => {
          console.log(res);
          setUser(res);
        })
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  return { user, loading, error };
};
