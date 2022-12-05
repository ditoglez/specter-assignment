import { isServer } from '../utils/isServer';

export const getFetchInstance = () => {
  const prefixUrl = isServer
    ? process.env.API_BASE_URL
    : window.env.API_BASE_URL;

  return {
    fetch: (path: string) => {
      return fetch(`${prefixUrl}${path}`);
    },
  };
};
