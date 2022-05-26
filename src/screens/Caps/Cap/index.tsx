import React, { FC, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  Image,
  TouchableHighlight,
  View,
} from 'react-native';

import cap from '../../../assets/img/cap.png';
import brain from '../../../assets/img/brain__pink.png';

interface ICap {
  correct: boolean;
  index: number;
  pos: number;
  translateY: Animated.Value;
  onChooseCap: (index: number) => void;
  onPressBody: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

export const Cap: FC<ICap> = props => {
  const { correct, index, pos, translateY, onChooseCap, onPressBody } = props;

  const posX = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.timing(posX, {
      toValue: pos === 0 ? -170 : pos === 1 ? -50 : 70,
      duration: 250,
      useNativeDriver: true,
    }).start();
  });

  const onPressCap = () => {
    onPressBody();
    onChooseCap(index);
  };

  return (
    <AnimatedTouchable
      activeOpacity={1}
      underlayColor="transparent"
      style={[styles.capContainer, { transform: [{ translateX: posX }] }]}
      onPress={onPressCap}>
      <View style={styles.cap}>
        <Animated.Image
          source={cap}
          style={[styles.capImage, { transform: [{ translateY: translateY }] }]}
        />
        {correct ? <Image source={brain} style={styles.brain} /> : null}
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  capContainer: {
    width: 100,
    height: '100%',
    position: 'absolute',
    left: '50%',
  },
  cap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  capImage: {
    width: '100%',
    resizeMode: 'center',
    zIndex: 100,
  },
  brain: {
    width: '50%',
    resizeMode: 'center',
    position: 'absolute',
    bottom: 100,
  },
});
