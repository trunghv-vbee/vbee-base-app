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

const LoginScreen = (
  props: NativeStackScreenProps<MainParamList, Routes.LoginScreen>,
) => {
  const _onLogin = () => {
    props.navigation.navigate(Routes.DrawerStack);
  };
  return (
    <Container hideHeader={true} style={stylesCommon.center}>
      <ButtonText
        backgroundColor={colors.white}
        boderRadius={50}
        style={styles.button}
        height={50}
        onPress={_onLogin}
        title={strings.useService}
        textProps={{
          size: 16,
          lineHeight: 26,
          color: colors.primary,
          fontWeight: '600',
        }}
      />
      <TextBase marginTop={24} size={16} lineHeight={24} color={colors.white}>
        Hoặc nhắn tin theo cú pháp
      </TextBase>
      <TextBase
        color={colors.white}
        lineHeight={28}
        size={20}
        fontWeight={'700'}>
        DK ABC gửi 0000
      </TextBase>
      <TextBase color={colors.label} lineHeight={24}>
        (Miễn phí cước tin nhắn)
      </TextBase>
      <TextBase
        marginTop={24}
        center={true}
        marginHorizontal={40}
        size={12}
        color={colors.label}>
        Bằng cách đăng nhập, bạn đồng ý với{' '}
        <TextBase
          size={12}
          textDecorationLine={'underline'}
          color={colors.label}>
          Điều khoản
        </TextBase>{' '}
        và{' '}
        <TextBase
          size={12}
          textDecorationLine={'underline'}
          color={colors.label}>
          Chính sách quyền riêng tư
        </TextBase>{' '}
        của chúng tôi
      </TextBase>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    width: '70%',
  },
});
