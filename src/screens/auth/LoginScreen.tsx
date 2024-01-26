import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ButtonText from 'components/Button/ButtonText';
import strings from 'assets/strings';
import colors from 'assets/colors';
import Container from 'components/Layout/Container';
import stylesCommon from 'assets/stylesCommon';
import {MainParamList} from 'navigation/service/NavigationParams';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Routes from 'navigation/service/Routes';
import TextBase from 'components/TextBase';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ButtonIcon from 'components/Button/ButtonIcon';
import images from 'assets/images';
import Image from 'components/Image';
import TextInputBase from 'components/TextInputBase';
import {getIn, useFormik} from 'formik';
import {ValidateLogin} from 'screens/auth/components/Validate';
import useStateCustom from 'hooks/useStateCustom';
import {goBack} from 'navigation/service/RootNavigation';

const LoginScreen = (
  props: NativeStackScreenProps<MainParamList, Routes.LoginScreen>,
) => {
  const [state, setState] = useStateCustom({
    security: true,
  });
  const _onLogin = () => {
    props.navigation.navigate(Routes.DrawerStack);
  };
  const goToPolicy = () => {
    props.navigation.navigate(Routes.TermsAndPoliciesScreen);
  };
  const formik = useFormik({
    initialValues: {username: '', password: ''},
    validationSchema: ValidateLogin,
    onSubmit: () => {
      _onLogin();
    },
  });
  const inset = useSafeAreaInsets();
  return (
    <Container hideHeader={true} isHideFooter={true} style={stylesCommon.flex1}>
      <View
        style={[
          styles.container,
          {
            marginTop: inset.top + 30,
          },
        ]}>
        <View style={styles.containerHeader}>
          <View style={[stylesCommon.flex1, {alignItems: 'flex-start'}]}>
            <ButtonIcon onPress={goBack} icon={images.ic_close} />
          </View>
          <Image source={images.ic_logo_primary} style={{}} />
          <View style={stylesCommon.flex1} />
        </View>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{padding: 32, flex: 1}}>
            <TextBase
              center={true}
              color={colors.primary}
              fontWeight={'600'}
              marginBottom={24}
              marginTop={20}>
              {strings.login}
            </TextBase>
            <TextInputBase
              placeholder={'Sô điện thoại'}
              name={'username'}
              errors={formik.errors}
              onChangeText={formik.handleChange('username')}
              value={formik.values.username}
              touched={formik.touched}
              containerStyle={{
                width: '100%',
                borderColor: colors.primary,
                borderWidth: 1,
                height: 45,
                borderRadius: 50,
                paddingLeft: 10,
                backgroundColor: colors.white,
              }}
              inputStyle={{
                paddingHorizontal: 15,
                color: colors.text,
                flex: 1,
              }}
              keyboardType={'number-pad'}
              iconRight={images.close}
              maxLength={10}
              iconRightPress={() => formik.setFieldValue('username', '')}
              isShowIconRight={!!formik.values.username}
              iconLeft={images.ic_phone}
              isShowIconLeft={true}
              placeholderTextColor={colors.gray64}
            />
            <TextInputBase
              placeholder={'Mật khẩu'}
              name={'password'}
              errors={formik.errors}
              onChangeText={formik.handleChange('password')}
              value={formik.values.password}
              touched={formik.touched}
              iconRightPress={() => setState({security: !state.security})}
              secureTextEntry={state.security}
              containerStyle={{
                width: '100%',
                height: 45,
                borderRadius: 50,
                paddingLeft: 10,
                backgroundColor: colors.gray04,
                marginTop: 12,
              }}
              inputStyle={{
                paddingHorizontal: 15,
                color: colors.text,
                flex: 1,
              }}
              iconRight={
                !state?.security ? images.ic_eye_active : images.ic_eye
              }
              isShowIconRight={true}
              iconLeft={images.ic_key}
              isShowIconLeft={true}
              placeholderTextColor={colors.gray64}
            />

            {getIn(formik.touched, 'username') &&
            !!getIn(formik.errors, 'username') ? (
              <TextBase
                center={true}
                color={colors.red}
                marginTop={10}
                size={14}>
                {getIn(formik.errors, 'username')}
              </TextBase>
            ) : (
              getIn(formik.touched, 'password') &&
              !!getIn(formik.errors, 'password') && (
                <TextBase
                  center={true}
                  color={colors.red}
                  marginTop={10}
                  size={14}>
                  {getIn(formik.errors, 'password')}
                </TextBase>
              )
            )}
            <ButtonText
              backgroundColor={colors.primary}
              boderRadius={50}
              style={styles.button}
              height={50}
              onPress={formik.handleSubmit}
              title={strings.login}
              textProps={{
                size: 16,
                lineHeight: 26,
                color: colors.white,
                fontWeight: '600',
              }}
            />
            <View style={[stylesCommon.flexRowSpace, stylesCommon.pt08]}>
              <ButtonText
                boderRadius={50}
                height={50}
                title={'Quên mật khẩu'}
                textProps={{
                  size: 14,
                  lineHeight: 20,
                  color: colors.primary,
                  fontWeight: '500',
                  textDecorationLine: 'underline',
                }}
              />
              <ButtonText
                boderRadius={50}
                height={50}
                title={'Đăng ký miễn phí'}
                textProps={{
                  size: 14,
                  lineHeight: 20,
                  color: colors.primary,
                  fontWeight: '500',
                  textDecorationLine: 'underline',
                }}
              />
            </View>
          </View>
          <View style={{paddingBottom: 50}}>
            <TextBase
              marginTop={24}
              center={true}
              marginHorizontal={40}
              size={12}
              color={colors.gray64}>
              Bằng cách đăng nhập, bạn đồng ý với{' '}
              <TextBase
                size={12}
                onPress={goToPolicy}
                textDecorationLine={'underline'}
                color={colors.gray64}>
                Điều khoản
              </TextBase>{' '}
              và{' '}
              <TextBase
                size={12}
                onPress={goToPolicy}
                textDecorationLine={'underline'}
                color={colors.gray64}>
                Chính sách quyền riêng tư
              </TextBase>{' '}
              của chúng tôi
            </TextBase>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 24,
  },
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
});
