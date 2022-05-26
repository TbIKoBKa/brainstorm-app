import React, { FC } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Cap } from '../Cap';

interface ICapsContainerProps {
  caps: number[];
  correctCap: number;
  translateY: Animated.Value;
  onChooseCap: (index: number) => void;
  onPressBody: () => void;
}

export const CapsContainer: FC<ICapsContainerProps> = props => {
  const { caps, correctCap, translateY, onChooseCap, onPressBody } = props;

  return (
    <View style={styles.caps}>
      {caps.map((item, index) => (
        <Cap
          key={index}
          index={index}
          correct={index === correctCap ? true : false}
          pos={item}
          translateY={translateY}
          onChooseCap={onChooseCap}
          onPressBody={onPressBody}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  caps: {
    flex: 1,
    flexDirection: 'row',
  },
});
