import React, { FC, useState } from 'react';

import { ITogglersContext, TTogglers, TogglersContext } from './context';

const initialState: TTogglers = {
  pause: false,
  authorized: false,
  connected: false,
  loading: false,
};

export const TogglersProvider: FC = props => {
  const { children } = props;

  const [togglers, setTogglers] = useState<TTogglers>(initialState);

  const setTogglerValue: ITogglersContext['setTogglerValue'] = (
    toggler,
    value,
  ) => {
    setTogglers(prev => ({ ...prev, [toggler]: value }));
  };

  const resetTogglers = () => {
    setTogglers(initialState);
  };

  return (
    <TogglersContext.Provider
      value={{ togglers, setTogglerValue, resetTogglers }}>
      {children}
    </TogglersContext.Provider>
  );
};
