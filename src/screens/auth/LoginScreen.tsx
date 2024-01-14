import React from 'react';
import {StyleSheet} from 'react-native';
import ButtonText from 'components/Button/ButtonText';
import strings from 'assets/strings';
import colors from 'assets/colors';
import Container from 'components/Layout/Container';
import stylesCommon from 'assets/stylesCommon';
import {NavigationProp} from '@react-navigation/core/src/types';
import {MainParamList} from 'navigation/service/NavigationParams';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Routes from 'navigation/service/Routes';

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
        title={strings.login}
        textProps={{
          size: 18,
          lineHeight: 26,
          color: colors.blue3,
          fontWeight: '600',
        }}
      />
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
