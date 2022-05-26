import React, { FC, useRef } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Text } from '../../../components';

interface IBoxProps {
  number: number;
  style: StyleProp<ViewStyle>;
  onClickBox?: (number: number) => void;
  animated?: boolean;
}

const AnimatedTouchableHighlight =
  Animated.createAnimatedComponent(TouchableHighlight);

export const Box: FC<IBoxProps> = props => {
  const { number, style = null, onClickBox, animated } = props;

  const scale = useRef(new Animated.Value(1)).current;

  const animationScale = (toValue = 1) =>
    Animated.timing(scale, {
      toValue: toValue,
      duration: 150,
      useNativeDriver: false,
    });

  const onClick = async () => {
    if (animated && onClickBox) {
      onClickBox(number);
      Animated.sequence([animationScale(0.6), animationScale(1)]).start();
    }
  };

  return (
    <AnimatedTouchableHighlight
      underlayColor="#1ac6ff"
      style={[styles.box, style, { transform: [{ scale: scale }] }]}
      touchSoundDisabled={true}
      onPress={() => {
        onClick();
      }}>
      <Text style={styles.text}>{number}</Text>
    </AnimatedTouchableHighlight>
  );
};

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bfff',
    borderWidth: 8,
    borderColor: '#0099e6',
    borderRadius: 22,
    marginBottom: 10,
  },
  text: {
    fontSize: 60,
  },
});
