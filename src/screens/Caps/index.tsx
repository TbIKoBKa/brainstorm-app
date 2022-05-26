import React, { FC, useState } from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { CapsBody } from './CapsBody';
import { CapsFooter } from './CapsFooter';
import { CapsHeader } from './CapsHeader';
import { Game } from '../../components';

import { randomInt } from '../../utils';

const correctCap = randomInt(2);

const Caps: FC<NavigationStackScreenProps> = () => {
  const [isMixing, setIsMixing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState({ message: '', combo: 0 });

  const onClickCap = (number: number) => {
    if (number === correctCap) {
      setResult(prevState => ({ message: 'Hit', combo: prevState.combo + 1 }));
    } else {
      setResult({ message: 'Loose', combo: 0 });
    }
  };

  return (
    <Game>
      <CapsHeader isMixing={isMixing} isAnimating={isAnimating} />
      <CapsBody
        correctCap={correctCap}
        isMixing={isMixing}
        setIsMixing={setIsMixing}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
        onClickCap={onClickCap}
      />
      <CapsFooter result={result} />
    </Game>
  );
};

export default Caps;
