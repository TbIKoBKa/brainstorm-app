import React, { FC } from 'react';
import {
  StyleSheet,
  Text as NativeText,
  StyleProp,
  TextStyle,
} from 'react-native';

interface TextProps {
  style?: StyleProp<TextStyle>;
}

export const Text: FC<TextProps> = props => {
  const { children, style = null } = props;

  return <NativeText style={[styles.text, style]}>{children}</NativeText>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Georama-Medium',
    fontSize: 48,
    color: '#fff',
  },
});
