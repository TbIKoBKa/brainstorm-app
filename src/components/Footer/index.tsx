import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '../Text';

export interface IFooterProps {
  result: {
    message?: string;
    combo?: number;
  };
}

export const Footer: FC<IFooterProps> = ({ result, children }) => {
  return (
    <View style={styles.footer}>
      {children}
      <Text style={styles.text}>
        {result.message ? `${result.message}!` : ''}
        {result.combo && result.combo > 0 ? ` x${result.combo}` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  text: {},
});
