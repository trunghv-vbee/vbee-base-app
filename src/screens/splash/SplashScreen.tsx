import React, {useEffect} from 'react';
import images from 'assets/images';
import Container from 'components/Layout/Container';
import stylesCommon from 'assets/stylesCommon';
import Image from 'components/Image';
import Routes from 'navigation/service/Routes';
import {reset} from 'navigation/service/RootNavigation';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      reset(Routes.LoginScreen);
    }, 2000);
  }, []);
  return (
    <Container
      title={'Trang chủ'}
      dark={true}
      hideHeader={true}
      style={stylesCommon.center}>
      <Image source={images.ic_logo} />
    </Container>
  );
};

export default SplashScreen;
