import React, {useEffect} from 'react';
import images from 'assets/images';
import Container from 'components/Layout/Container';
import stylesCommon from 'assets/stylesCommon';
import Image from 'components/Image';
import TextBase from 'components/TextBase';
import ButtonIcon from 'components/Button/ButtonIcon';
import ButtonText from 'components/Button/ButtonText';
import colors from 'assets/colors';
import ButtonIconText from 'components/Button/ButtonIconText';
import HeaderHome from 'components/Layout/Header/HeaderHome';
import {View} from 'react-native';
import {showLoading} from 'components/Loading/LoadingComponent';
import Switch from 'components/Switch';
import TextInputBase from 'components/TextInputBase';
import Routes from 'navigation/service/Routes';
import {reset} from 'navigation/service/RootNavigation';
import ModalBase from 'components/Modal/ModalBase';
import ModalNotify from 'components/Modal/ModalNotify';
import ModalBottom from 'components/Modal/ModalBottom';
import ModalSelect from 'components/Modal/ModalSelect';
import SelectBox from 'components/SelectBox';
import RadioButton from 'components/Button/RadioButton';
import DateTimePicker from 'components/DateTime/DateTimePicker';

const SplashScreen = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     reset(Routes.LoginScreen);
  //   }, 2000);
  // }, []);
  return (
    <Container
      title={'Trang chủ'}
      dark={true}
      hideHeader={true}
      style={stylesCommon.center}>
      <Image source={images.ic_logo} />
      {/*<ModalSelect*/}
      {/*  onFinish={() => {}}*/}
      {/*  isVisibleModal={true}*/}
      {/*  title={'Title'}*/}
      {/*  textButtonHeader={'Xong'}>*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      borderBottomColor: colors.borderColor,*/}
      {/*      borderBottomWidth: 1,*/}
      {/*      paddingLeft: 32,*/}
      {/*    }}>*/}
      {/*    <RadioButton isSelected={true} label={'Nam'} />*/}
      {/*  </View>*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      borderBottomColor: colors.borderColor,*/}
      {/*      borderBottomWidth: 1,*/}
      {/*      paddingLeft: 32,*/}
      {/*    }}>*/}
      {/*    <RadioButton isSelected={false} label={'Nữ'} />*/}
      {/*  </View>*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      borderBottomColor: colors.borderColor,*/}
      {/*      borderBottomWidth: 1,*/}
      {/*      paddingLeft: 32,*/}
      {/*    }}>*/}
      {/*    <RadioButton isSelected={false} label={'Khác'} />*/}
      {/*  </View>*/}
      {/*</ModalSelect>*/}
      <DateTimePicker title={'Chon ngày'} visible={true} />
    </Container>
  );
};

export default SplashScreen;
