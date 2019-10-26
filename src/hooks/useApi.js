import { useAuth0 } from './useAuth0';

// used for setting the correct URL when deployed, when ran locally for development it should be
// left blank in order to use the proxy to be backend (defined in package.json)
const API_ROOT = process.env.REACT_APP_API_ROOT || '';

/**
 * Returns a wrapper around the browser's fetch API that handles setting auth
 * details, content-type, etc.
 */
export const useApi = () => {
  const { getTokenSilently } = useAuth0();

  const request = async (path, config) => {
    const token = await getTokenSilently().catch(() => '');

    const response = await fetch(API_ROOT + path, {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token && `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(config.body),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  return {
    get: async (path, config = {}) => request(path, { ...config, method: 'GET' }),
    post: async (path, config = {}) => request(path, { ...config, method: 'POST' }),
  };
};
