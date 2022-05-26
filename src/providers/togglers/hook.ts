import { useContext } from 'react';

import { TogglersContext } from './context';

export const useTogglers = () => {
  return useContext(TogglersContext);
};
