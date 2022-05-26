import React, { FC, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableHighlight } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import Toast from 'react-native-toast-message';

import { Text } from '../../components';
import { ApiError, useApi } from '../../providers/api';
import { book } from '../book';
import { TogglerType, useTogglers } from '../../providers';

const Login: FC<NavigationStackScreenProps> = props => {
  const { navigation } = props;
  const { setTogglerValue } = useTogglers();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const api = useApi();

  const submitHandle = async () => {
    try {
      const response = await api.fetchJson({
        url: '/auth/login',
        method: 'POST',
        data: {
          email,
          password,
        },
      });
      console.log(response);
      await api.setToken(response);
      setTogglerValue(TogglerType.authorized, true);
      navigation.navigate(book.home);
    } catch (error) {
      console.log((error as ApiError).status);
      switch ((error as ApiError).status) {
        case 400:
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Invalid data',
          });
          break;
        case 401:
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Invalid credentials',
          });
          break;
        default:
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Unknown error',
          });
      }
    }
  };

  return (
    <View style={styles.main_menu}>
      <View>
        <Text style={styles.header}>BrainStorm</Text>
      </View>
      <View style={styles.controls}>
        <Text style={styles.subtitle}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          autoComplete="email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          autoComplete="password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableHighlight
          underlayColor="#00aaff"
          style={styles.button}
          onPress={submitHandle}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.textButton}
          onPress={() => {
            navigation.navigate(book.signup);
          }}>
          <Text style={styles.textButtonText}>Sign up</Text>
        </TouchableHighlight>
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
  },
  header: {
    fontSize: 64,
    textShadowColor: '#000',
    textShadowRadius: 20,
    flexBasis: 160,
  },
  controls: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 36,
    textShadowColor: '#000',
    textShadowRadius: 10,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginBottom: 10,
    borderColor: '#00aaff',
    borderWidth: 1,
    width: 200,
    borderRadius: 36,
    marginTop: 24,
  },
  buttonText: {
    fontSize: 24,
  },
  textButton: {
    opacity: 0.6,
  },
  textButtonText: {
    fontSize: 16,
    opacity: 0.6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#26b7ff',
    borderRadius: 12,
    padding: 8,
    flexShrink: 0,
    borderColor: '#23a1e0',
    borderWidth: 1,
    color: '#fff',
    marginBottom: 12,
  },
});

export default Login;
