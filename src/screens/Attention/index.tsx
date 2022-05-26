import React, { FC, useState } from 'react';
import { Dimensions } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { Game } from '../../components';
import { AttentionBody } from './Body';
import { AttentionFooter } from './Footer';
import { AttentionHeader } from './Header';
import { createBoxes } from '../../utils';

const window = Dimensions.get('window');

const Attention: FC<NavigationStackScreenProps> = () => {
  let [boxes, setBoxes] = useState(createBoxes(9, 20));
  let [result, setResult] = useState({ message: '', combo: 0 });

  let displaySize = { h: window.height, w: window.width };

  const onClickBox = (number: number) => {
    if (number === boxes.target) {
      setResult(prevState => ({ message: 'Hit', combo: prevState.combo + 1 }));
    } else {
      setResult({ message: 'Loose', combo: 0 });
    }
    setBoxes(createBoxes(9, 20));
  };

  return (
    <Game>
      <AttentionHeader number={boxes.target} />
      <AttentionBody
        display={displaySize}
        numbers={boxes.boxes}
        onClickBox={onClickBox}
      />
      <AttentionFooter result={result} />
    </Game>
  );
};

export default Attention;
