import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export const Body: FC = props => {
  const { children } = props;

  return <View style={styles.body}>{children}</View>;
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

export default Body;
