export const isApiConnected = (): boolean => {
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) {
    return !!process.env.REACT_APP_API_URL;
  }
  return false;
};

export const getApiUrl = (): string => {
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  return '';
};

export const useMockApi = (): boolean => {
  return !isApiConnected();
};