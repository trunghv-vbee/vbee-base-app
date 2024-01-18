import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import stylesCommon from 'assets/stylesCommon';
import Routes from 'navigation/service/Routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp, useRoute} from '@react-navigation/native';

const ImagePreviewScreen = (
  props: NativeStackScreenProps<MainParamList, Routes.ImagePreviewScreen>,
) => {
  const route = useRoute<RouteProp<MainParamList, Routes.ImagePreviewScreen>>();
  const data = props?.route.params.data;
  console.log('data: ', route.params.data);
  const index = props?.route.params.index;
  console.log('index: ', index);
  const onRequestClose = () => {
    props?.navigation.goBack();
  };
  return (
    <View style={stylesCommon.flex1}>
      <ImageView
        images={data}
        imageIndex={index}
        visible={true}
        doubleTapToZoomEnabled={true}
        onRequestClose={onRequestClose}
      />
    </View>
  );
};

export default ImagePreviewScreen;
