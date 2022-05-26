import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

import leftBrain from '../../assets/img/leftBrain.png';
import rightBrain from '../../assets/img/rightBrain.png';
import gear from '../../assets/img/gear.png';

export const AnimatedLogo = () => {
  const posLeftBrain = useRef(new Animated.Value(0)).current;
  const posRightBrain = useRef(new Animated.Value(0)).current;
  const rotateGear = useRef(new Animated.Value(0)).current;

  //@ts-ignore
  const styles = getStyles({ posLeftBrain, posRightBrain });

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(posLeftBrain, {
              toValue: -30,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(posRightBrain, {
              toValue: 30,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(posLeftBrain, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(posRightBrain, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateGear, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateGear, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
    ).start();
  }, []);

  const rotateDegGear = rotateGear.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.logoContainer}>
      <Animated.Image
        source={leftBrain}
        style={[styles.logoBrain, styles.logoBrainLeft]}
      />
      <Animated.Image
        source={rightBrain}
        style={[styles.logoBrain, styles.logoBrainRight]}
      />
      <Animated.Image
        source={gear}
        style={[styles.gear, { transform: [{ rotate: rotateDegGear }] }]}
      />
    </View>
  );
};

interface IStylesProps {
  posLeftBrain: number;
  posRightBrain: number;
}

const getStyles = (props: IStylesProps) => {
  return StyleSheet.create({
    logoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    logoBrain: {
      height: 180,
      width: 100,
      zIndex: 100,
    },
    logoBrainLeft: {
      transform: [{ translateX: props.posLeftBrain }],
    },
    logoBrainRight: {
      marginStart: 10,
      transform: [{ translateX: props.posRightBrain }],
    },
    gear: {
      height: 80,
      width: 80,
      position: 'absolute',
      top: 50,
    },
  });
};
