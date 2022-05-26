import React, { FC, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

import { Text } from '../../components';
import { ApiError, useApi } from '../../providers/api';
import { book } from '../book';
import Toast from 'react-native-toast-message';
import { TogglerType, useTogglers } from '../../providers';
import { Buffer } from 'buffer';

interface IUser {
  email: string;
  displayName: string;
  avatar: string | null;
  language: string;
}

const Profile: FC<NavigationStackScreenProps> = props => {
  const { navigation } = props;

  const api = useApi();
  const { setTogglerValue } = useTogglers();
  const [profile, setProfile] = useState<IUser>({
    displayName: '',
    email: '',
    avatar: '',
    language: '',
  });
  // const [photo, setPhoto] = useState<ImagePickerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    api
      .fetchJson({
        url: '/profile',
      })
      .then(data => {
        setProfile(data);
      })
      .catch(console.log);

    setIsLoading(false);
  }, []);

  const submitHandle = async () => {
    if (profile) {
      try {
        await api
          .fetchJson({
            url: '/profile',
            method: 'POST',
            data: {
              displayName: profile.displayName,
              email: profile.email,
            },
          })
          .then(() => {
            api.setToken(null);
            setTogglerValue(TogglerType.authorized, false);
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Profile updated',
            });
          })
          .catch((error: ApiError) => {
            console.log(error.getLocalizedValidationErrors());
          });
      } catch (error) {
        console.error((error as ApiError).message);
      }
    }
  };

  // const handleChoosePhoto = () => {
  //   launchImageLibrary(
  //     { mediaType: 'photo', includeBase64: true },
  //     response => {
  //       if (response) {
  //         if (response?.assets) {
  //           console.info(Object.keys(response?.assets[0]));
  //         }
  //         setPhoto(response);
  //       }
  //     },
  //   );
  // };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={64} color="#FFF" />
      </View>
    );
  }

  return (
    <View style={styles.main_menu}>
      <View>
        <Text style={styles.header}>BrainStorm</Text>
      </View>
      <View style={styles.controls}>
        <Text style={styles.subtitle}>Profile</Text>
        {/* <View style={styles.avatarView}>
          <Image
            source={{
              uri: photo?.assets?.length
                ? `data:image/jpeg;base64,${photo?.assets[0].base64}`
                : profile?.avatar
                ? `data:image/jpeg;base64,${Buffer.from(
                    profile.avatar,
                    'base64',
                  )}`
                : 'https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png',
            }}
            style={styles.avatar}
          />
        </View>
        <TouchableHighlight
          underlayColor="#00aaff"
          style={styles.button}
          onPress={handleChoosePhoto}>
          <Text style={styles.textButtonText}>Upload</Text>
        </TouchableHighlight> */}
        <TextInput
          style={styles.input}
          placeholder="Display name"
          value={profile?.displayName || ''}
          autoComplete="name"
          onChangeText={text => {
            setProfile({
              ...profile,
              displayName: text,
            });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={profile?.email || ''}
          autoComplete="email"
          onChangeText={text => {
            setProfile({
              ...profile,
              email: text,
            });
          }}
        />
        <TouchableHighlight
          underlayColor="#00aaff"
          style={styles.button}
          onPress={submitHandle}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#ff1a1a"
          style={[styles.button, styles.redButton]}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>
      </View>
    </View>
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
  avatarView: {
    borderRadius: 50,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginBottom: 10,
    borderColor: '#00aaff',
    borderWidth: 1,
    borderRadius: 36,
    marginTop: 24,
  },
  redButton: {
    borderWidth: 0,
    backgroundColor: '#ff1a1a',
  },
  buttonText: {
    fontSize: 24,
  },
  textButton: {
    opacity: 0.6,
  },
  textButtonText: {
    fontSize: 14,
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

export default Profile;
