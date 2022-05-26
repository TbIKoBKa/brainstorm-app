import { createContext } from 'react';

export interface IJwt {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
}

type TMethods = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

export interface IPayload {
  [key: string]: any;
}

export interface IFetchProps {
  url: string;
  method?: TMethods;
  data?: IPayload | FormData;
}

export interface IApiContext {
  fetchJson: (data: IFetchProps) => Promise<any>;
  setToken: (jwt: IJwt | null) => Promise<void>;
  getToken: () => Promise<IJwt | null>;
  isAccessTokenExpired: () => Promise<boolean>;
  isRefreshTokenExpired: () => Promise<boolean>;
  refreshToken: () => Promise<any> | void;
}

export const ApiContext = createContext<IApiContext>(undefined!);
