import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { Text, AnimatedLogo } from '../../components';
import { TogglerType, useTogglers } from '../../providers';
import { useApi } from '../../providers/api';
import { book } from '../book';

const Home: FC<NavigationStackScreenProps> = props => {
  const { navigation } = props;

  const [gamesListVisible, setGamesListVisible] = useState(false);
  const { togglers, setTogglerValue } = useTogglers();
  const api = useApi();

  useEffect(() => {
    if (!togglers.authorized) {
      navigation.replace(book.login);
    }
  }, [navigation, togglers.authorized]);

  const logoutHandle = () => {
    setTogglerValue(TogglerType.authorized, false);
    api.setToken(null);
  };

  return (
    <View style={styles.main_menu}>
      <View>
        <Text style={styles.header}>BrainStorm</Text>
      </View>
      <AnimatedLogo />
      <View style={styles.controls}>
        {gamesListVisible ? (
          <>
            <TouchableHighlight
              underlayColor="#00aaff"
              style={styles.button}
              onPress={() => {
                navigation.navigate(book.attention);
              }}>
              <Text>Attention</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#00aaff"
              style={styles.button}
              onPress={() => {
                navigation.navigate(book.caps);
              }}>
              <Text>Caps</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#ff1a1a"
              style={[styles.button, styles.redButton]}
              onPress={() => {
                setGamesListVisible(false);
              }}>
              <Text>Back</Text>
            </TouchableHighlight>
          </>
        ) : (
          <>
            <TouchableHighlight
              underlayColor="#00aaff"
              style={styles.button}
              onPress={() => {
                setGamesListVisible(true);
              }}>
              <Text>Play</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#00aaff"
              style={styles.button}
              onPress={() => {
                navigation.navigate(book.profile);
              }}>
              <Text>Profile</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#00aaff"
              style={styles.button}
              onPress={logoutHandle}>
              <Text>Logout</Text>
            </TouchableHighlight>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_menu: {
    flex: 1,
    width: '100%',
    backgroundColor: '#4dc3ff',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    fontSize: 64,
    textShadowColor: '#000',
    textShadowRadius: 20,
    flexBasis: 100,
  },
  controls: {
    marginTop: 40,
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginBottom: 10,
    borderColor: '#00aaff',
    borderWidth: 3,
    borderRadius: 36,
  },
  redButton: {
    borderWidth: 0,
    backgroundColor: '#ff1a1a',
  },
  footer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default Home;
