import { ApiError } from './error';

export const fetchJson = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<any> => {
  return fetch(input, init).then(response => {
    if (response.status === 204) {
      return null;
    }

    if (![200, 201].includes(response.status)) {
      return response.json().then((json: Error) => {
        throw new ApiError(json.message, response.status);
      });
    }
    return response.json();
  });
};
