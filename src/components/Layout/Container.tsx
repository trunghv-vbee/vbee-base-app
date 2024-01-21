import HeaderBase, {HeaderBaseProps} from 'components/Layout/Header/HeaderBase';
import React from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import colors from 'assets/colors';
import {height, width} from 'assets/sizes';
import images from 'assets/images';
import Footer from 'components/Layout/Footer';

interface Props extends HeaderBaseProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  style?: StyleProp<ViewStyle>;
  translucent?: boolean;
  dark?: boolean;
  isHideFooter?: boolean;
  title?: string;
  [key: string]: any;
}
const Container = ({
  children,
  hideHeader,
  style,
  translucent = true,
  dark,
  title,
  isHideFooter,
  ...props
}: Props) => {
  const ContainerComponent = translucent ? View : SafeAreaView;
  return (
    <ImageBackground style={[styles.flex]} source={images.background}>
      <StatusBar
        backgroundColor={colors.transparent}
        translucent={true}
        barStyle={dark ? 'dark-content' : 'light-content'}
      />
      {hideHeader ? null : <HeaderBase title={title} {...props} />}
      <ContainerComponent
        style={[styles.flex, translucent ? {} : styles.styleTranslucent]}>
        <View style={[styles.flex, style]}>{children}</View>
      </ContainerComponent>
      {!isHideFooter && <Footer />}
    </ImageBackground>
  );
};

export default Container;

const styles = StyleSheet.create({
  styleTranslucent: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  flex: {
    flex: 1,
  },
});
