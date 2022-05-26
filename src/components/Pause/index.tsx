import React, { FC, useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PauseButton } from './button';
import { useTogglers, TogglerType } from '../../providers';
import { Text } from '../../components';
import cross from '../../assets/img/cross.png';

export const Pause: FC = () => {
  const navigation = useNavigation();
  const { setTogglerValue } = useTogglers();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressExit = () => {
    setTogglerValue(TogglerType.pause, false);
    navigation.goBack();
  };

  const onClosePause = () => {
    setTogglerValue(TogglerType.pause, false);
  };

  return (
    <>
      <Animated.View style={[styles.centered, { opacity: opacity }]}>
        <View style={styles.background} />
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text>Pause</Text>
            <PauseButton
              sourceIcon={cross}
              onPress={onClosePause}
              style={styles.image}
            />
          </View>
          <View>
            <TouchableHighlight
              underlayColor="#00aaff"
              style={styles.button}
              onPress={onPressExit}>
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.5,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: 36,
    borderWidth: 8,
    borderColor: '#00aaff',
    padding: 10,
    backgroundColor: '#4dc3ff',
  },
  modalHeader: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderColor: '#00aaff',
    borderWidth: 3,
    borderRadius: 36,
  },
  buttonText: {
    fontSize: 30,
  },
  image: {
    width: 30,
    height: 30,
  },
});
