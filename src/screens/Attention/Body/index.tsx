import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Body } from '../../../components';
import { Box } from '../Box';
import { calculateBoxSize } from '../../../utils/boxSizes';

interface IAttentionBody {
  display: { w: number; h: number };
  numbers: number[];
  onClickBox: (number: number) => void;
}

export const AttentionBody: FC<IAttentionBody> = props => {
  const { display, numbers, onClickBox } = props;

  let boxSize = calculateBoxSize(display);

  return (
    <Body>
      {numbers.map((number, index) => (
        <View key={index} style={styles.boxContainer}>
          <Box
            number={number}
            style={{ width: boxSize, height: boxSize }}
            onClickBox={onClickBox}
            animated={true}
          />
        </View>
      ))}
    </Body>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AttentionBody;
