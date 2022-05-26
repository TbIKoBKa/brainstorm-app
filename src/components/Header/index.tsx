import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { PauseButton } from '../Pause/button';
import { useTogglers, TogglerType } from '../../providers';
import menu from '../../assets/img/menu.png';

export const Header: FC = props => {
  const { children } = props;

  const { setTogglerValue } = useTogglers();

  return (
    <View style={styles.header}>
      {children}
      <PauseButton
        sourceIcon={menu}
        onPress={() => setTogglerValue(TogglerType.pause, true)}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  button: {
    width: 50,
    height: 50,
  },
});
