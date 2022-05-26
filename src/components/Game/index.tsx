import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

export const Game: FC = props => {
  const { children } = props;

  return <View style={styles.game}>{children}</View>;
};

const styles = StyleSheet.create({
  game: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#4dd2ff',
  },
});
