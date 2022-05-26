import React, { FC, useEffect, useState } from 'react';

import { Text, Header } from '../../../components';

interface ICapsHeader {
  isMixing: boolean;
  isAnimating: boolean;
}

export const CapsHeader: FC<ICapsHeader> = props => {
  const { isAnimating, isMixing } = props;

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isMixing && !isAnimating) {
      setMessage('Click to mix');
    } else if (isMixing && isAnimating) {
      setMessage('Wait');
    } else if (isMixing && !isAnimating) {
      setMessage('Choose');
    }
  }, [isMixing, isAnimating]);

  return (
    <Header>
      <Text>{message}</Text>
    </Header>
  );
};
