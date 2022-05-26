import React, { FC } from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

interface IPauseButtonProps {
  sourceIcon: ImageSourcePropType;
  style: StyleProp<ImageStyle>;
  onPress: () => void;
}

export const PauseButton: FC<IPauseButtonProps> = props => {
  const { style, onPress, sourceIcon } = props;

  return (
    <TouchableHighlight
      underlayColor="transparent"
      style={[styles.button]}
      onPress={onPress}>
      <Image source={sourceIcon} resizeMode="stretch" style={style} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    end: 10,
    top: 10,
  },
});
