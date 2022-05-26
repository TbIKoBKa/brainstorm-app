import React, { FC, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApiContext, IFetchProps, IJwt } from './context';
import { fetchJson } from './fetch';

interface IApiProviderProps {
  baseUrl: string;
  storageName?: string;
}

export const ApiProvider: FC<IApiProviderProps> = props => {
  const { baseUrl, storageName = 'jwt', children } = props;

  const read = async (key: string) => {
    const jwt = await AsyncStorage.getItem(key);
    return jwt ? (JSON.parse(jwt) as IJwt) : null;
  };

  const save = async (key: string, jwt: IJwt | null) => {
    const json = JSON.stringify(jwt);
    await AsyncStorage.setItem(key, json);
  };

  const setToken = async (jwt: IJwt | null) => {
    return save(storageName, jwt);
  };

  const getToken = async () => {
    return read(storageName);
  };

  const isAccessTokenExpired = async () => {
    const jwt = await getToken();

    return !!jwt && jwt.accessTokenExpiresAt < Date.now();
  };

  const isRefreshTokenExpired = async () => {
    const jwt = await getToken();

    return !!jwt && jwt.refreshTokenExpiresAt < Date.now();
  };

  const refreshToken = async () => {
    const jwt = await getToken();

    if (jwt) {
      return fetchJson(`${baseUrl}/auth/refresh`, {
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        }),
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          refreshToken: jwt.refreshToken,
        }),
      })
        .then((json: IJwt) => {
          setToken(json);
          return json;
        })
        .catch(e => {
          console.error(e);
          setToken(null);
          return null;
        });
    }

    return null;
  };

  const getAuthToken = async () => {
    let jwt = await getToken();

    if (jwt) {
      if (await isAccessTokenExpired()) {
        if (await isRefreshTokenExpired()) {
          setToken(null);
          throw Object.assign(new Error('unauthorized'), { status: 401 });
        }

        jwt = await refreshToken();
      }
    }

    return jwt ? jwt.accessToken : '';
  };

  const prepare =
    (fetch: (input: RequestInfo, init?: RequestInit) => Promise<any>) =>
    async (fetchProps: IFetchProps): Promise<any> => {
      const { url, method = 'GET', data = {} } = fetchProps;
      const newUrl = new URL(`${baseUrl}${url}`);
      const hasData =
        method === 'POST' || method === 'PUT' || method === 'PATCH';

      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${await getAuthToken()}`);

      if (!(data instanceof FormData)) {
        if (hasData) {
          headers.append('Content-Type', 'application/json; charset=utf-8');
        } else {
          Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
              data[key].map((value: string) =>
                newUrl.searchParams.append(`${key}[]`, value),
              );
            } else {
              newUrl.searchParams.append(key, data[key] as string);
            }
          });
        }
      }

      return fetch(newUrl.toString(), {
        headers,
        credentials: 'include',
        mode: 'cors',
        method,
        body: hasData
          ? data instanceof FormData
            ? data
            : JSON.stringify(data)
          : undefined,
      });
    };

  return (
    <ApiContext.Provider
      value={{
        fetchJson: prepare(fetchJson),
        setToken,
        getToken,
        isAccessTokenExpired,
        isRefreshTokenExpired,
        refreshToken,
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export function useApi() {
  return useContext(ApiContext);
}
