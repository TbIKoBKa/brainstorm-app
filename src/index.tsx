import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Toast from 'react-native-toast-message';

import { TogglersProvider } from './providers';
import { Screens } from './screens';
import { ApiProvider } from './providers/api';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        hidden
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ApiProvider baseUrl="http://192.168.0.105:3000">
        <TogglersProvider>
          <Screens />
        </TogglersProvider>
      </ApiProvider>
      <Toast autoHide />
    </SafeAreaView>
  );
};

export default App;
