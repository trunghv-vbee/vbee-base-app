import React from 'react';
import {StyleSheet} from 'react-native';
import ButtonText from 'components/Button/ButtonText';
import strings from 'assets/strings';
import colors from 'assets/colors';
import Container from 'components/Layout/Container';
import stylesCommon from 'assets/stylesCommon';
import {MainParamList} from 'navigation/service/NavigationParams';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Routes from 'navigation/service/Routes';
import TextBase from 'components/TextBase';
import Image from 'components/Image';
import images from 'assets/images';

const WelcomeScreen = (
  props: NativeStackScreenProps<MainParamList, Routes.WelcomeScreen>,
) => {
  const _onLogin = () => {
    props.navigation.navigate(Routes.LoginScreen);
  };
  const goToPolicy = () => {
    props.navigation.navigate(Routes.TermsAndPoliciesScreen);
  };
  const goToHome = () => {
    props.navigation.navigate(Routes.DrawerStack);
  };
  return (
    <Container hideHeader={true} style={stylesCommon.center}>
      <Image source={images.icon} />
      <ButtonText
        backgroundColor={colors.white}
        boderRadius={50}
        style={styles.button}
        height={50}
        onPress={goToHome}
        title={strings.useService}
        textProps={{
          size: 16,
          lineHeight: 26,
          color: colors.primary,
          fontWeight: '600',
        }}
      />
      <ButtonText
        title={'Đăng nhập'}
        titleColor={colors.white80}
        style={{marginTop: 10}}
        onPress={_onLogin}
        textProps={{textDecorationLine: 'underline'}}
      />
      {/*<TextBase marginTop={24} size={16} lineHeight={24} color={colors.white}>*/}
      {/*  Hoặc nhắn tin theo cú pháp*/}
      {/*</TextBase>*/}
      {/*<TextBase*/}
      {/*  color={colors.white}*/}
      {/*  lineHeight={28}*/}
      {/*  size={20}*/}
      {/*  fontWeight={'700'}>*/}
      {/*  DK ABC gửi 0000*/}
      {/*</TextBase>*/}
      {/*<TextBase color={colors.label} lineHeight={24}>*/}
      {/*  (Miễn phí cước tin nhắn)*/}
      {/*</TextBase>*/}
      <TextBase
        marginTop={24}
        center={true}
        marginHorizontal={40}
        size={12}
        color={colors.label}>
        Bằng cách đăng nhập, bạn đồng ý với{' '}
        <TextBase
          size={12}
          onPress={goToPolicy}
          textDecorationLine={'underline'}
          color={colors.label}>
          Điều khoản
        </TextBase>{' '}
        và{' '}
        <TextBase
          size={12}
          textDecorationLine={'underline'}
          onPress={goToPolicy}
          color={colors.label}>
          Chính sách quyền riêng tư
        </TextBase>{' '}
        của chúng tôi
      </TextBase>
    </Container>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    width: '70%',
    marginTop: 30,
  },
});
