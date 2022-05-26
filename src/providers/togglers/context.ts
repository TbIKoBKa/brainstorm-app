import { createContext } from 'react';

export enum TogglerType {
  pause = 'pause',
  authorized = 'authorized',
  connected = 'connected',
  loading = 'loading',
}

export type TTogglers = Record<TogglerType, boolean>;

export interface ITogglersContext {
  togglers: TTogglers;
  setTogglerValue: (toggler: TogglerType, value: boolean) => void;
  resetTogglers: () => void;
}

export const TogglersContext = createContext<ITogglersContext>(undefined!);
