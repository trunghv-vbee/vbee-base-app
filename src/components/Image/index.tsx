import {useNavigation} from '@react-navigation/native';
import {MainParamList} from 'navigation/service/NavigationParams';
import React, {useEffect, useState} from 'react';
import {
  ColorValue,
  Image,
  ImageProps,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {ImageSource} from 'react-native-image-viewing/dist/@types';
import Routes from 'navigation/service/Routes.ts';
import {NavigationProp} from '@react-navigation/core/src/types.tsx';

export interface IImageProps extends ImageProps {
  tintColor?: ColorValue | string;
  isPreview?: boolean;
  data?: ImageSource[];
  index?: number;
  defaultImage?: ImageSourcePropType;
}

export default ({
  tintColor,
  style,
  isPreview,
  data,
  index,
  defaultImage,
  ...props
}: IImageProps) => {
  const [_, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const {navigate} =
    useNavigation<NavigationProp<MainParamList, Routes.ImagePreviewScreen>>();
  const onPreviewImage = () => {
    if (data?.length) {
      navigate(Routes.ImagePreviewScreen, {data, index: index || 0});
    }
  };
  return (
    <TouchableOpacity onPress={onPreviewImage} disabled={!isPreview}>
      {!!error && defaultImage ? (
        <Image source={defaultImage} style={[{tintColor}, style]} />
      ) : (
        <Image
          onError={() => {
            setError(true);
          }}
          onLoad={() => {
            setIsLoading(true);
          }}
          style={[{tintColor}, style]}
          {...props}
        />
      )}
    </TouchableOpacity>
  );
};
