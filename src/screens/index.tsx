import React, { FC, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Attention from './Attention';
import Caps from './Caps';
import Login from './Login';
import Signup from './Signup';
import { TogglerType, useTogglers } from '../providers';
import { Pause } from '../components';
import { book } from './book';
import { useApi } from '../providers/api';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Profile from './Profile';

const Stack = createNativeStackNavigator();

export const Screens: FC = () => {
  const { togglers, setTogglerValue } = useTogglers();
  const { getToken } = useApi();

  const checkAuthorized = async () => {
    setTogglerValue(TogglerType.loading, true);

    const token = await getToken();

    if (token) {
      setTogglerValue(TogglerType.authorized, true);
    }

    setTogglerValue(TogglerType.loading, false);
  };

  useEffect(() => {
    checkAuthorized();
  }, []);

  if (togglers.loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={64} color="#FFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={book.home}>
        <Stack.Screen name={book.home} component={Home} />
        <Stack.Screen name={book.attention} component={Attention} />
        <Stack.Screen name={book.caps} component={Caps} />
        <Stack.Screen name={book.login} component={Login} />
        <Stack.Screen name={book.signup} component={Signup} />
        <Stack.Screen name={book.profile} component={Profile} />
      </Stack.Navigator>
      {togglers.pause && <Pause />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4dc3ff',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
