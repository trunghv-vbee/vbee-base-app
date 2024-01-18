import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import * as React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import colors from 'assets/colors';
import images from 'assets/images';
import strings from 'assets/strings';
import ExpandableViewSeparate from './ExpandableViewSeparate';
import {useAppDispatch} from 'middleware/stores';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {MainParamList} from 'navigation/service/NavigationParams';
import Routes from 'navigation/service/Routes';
import {onLogout} from 'middleware/actions/persist/AuthAction';
import scale from 'utils/scale';
import stylesCommon from 'assets/stylesCommon';
import ButtonIcon from 'components/Button/ButtonIcon';
import ButtonText from 'components/Button/ButtonText';
import TextBase from 'components/TextBase';

const CustomSideBar = (props: DrawerContentComponentProps) => {
  const navigation =
    useNavigation<NavigationProp<MainParamList, Routes.LoginScreen>>();
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(onLogout());
    props.navigation.closeDrawer();
    navigation.navigate(Routes.LoginScreen, {});
  };

  return (
    <ImageBackground style={[stylesCommon.flex1]} source={images.background}>
      <DrawerContentScrollView {...props}>
        <View style={styles.containerHeader}>
          <View style={styles.containerProfile}>
            <Image
              source={images.ic_logo}
              style={{height: 24, resizeMode: 'contain'}}
            />
            <ButtonIcon
              icon={images.ic_close}
              onPress={props.navigation.closeDrawer}
              style={{
                backgroundColor: colors.gray08,
                padding: 10,
              }}
              iconStyle={{height: 12, width: 12, tintColor: colors.white}}
            />
          </View>
        </View>
        <View>
          <ExpandableViewSeparate {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20}}>
        <View style={styles.groupProfile}>
          <View style={styles.containerName}>
            <TextBase
              ucfirst={true}
              size={20}
              color={colors.white}
              fontWeight={'700'}>
              Đ
            </TextBase>
          </View>
          <View style={[stylesCommon.flex1, stylesCommon.pl14]}>
            <TextBase
              size={16}
              lineHeight={24}
              color={colors.white}
              fontWeight={'500'}>
              Robert Đức
            </TextBase>
            <TextBase lineHeight={20} size={14} color={colors.white}>
              0987654321
            </TextBase>
          </View>
          <Image
            source={images.ic_back}
            style={{
              transform: [{rotate: '180deg'}],
            }}
          />
        </View>
        <ButtonText
          backgroundColor={colors.white16}
          titleColor={colors.white}
          title={strings.logout}
          onPress={logout}
          height={48}
        />
      </View>
    </ImageBackground>
  );
};

export default CustomSideBar;

const styles = StyleSheet.create({
  containerName: {
    backgroundColor: colors.white32,
    height: 50,
    width: 50,
    borderRadius: 25,
    ...stylesCommon.center,
  },
  groupProfile: {
    backgroundColor: colors.white16,
    borderRadius: scale(12),
    padding: 14,
    marginBottom: 12,
    paddingRight: 24,
    ...stylesCommon.flexRow,
  },
  containerHeader: {overflow: 'hidden'},
  imageAvatar: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
  },
  containerProfile: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: scale(26),
    paddingRight: scale(16),
    paddingBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray32,
  },
  txtName: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: '600',
    paddingTop: scale(15),
  },
  icon: {
    height: scale(20),
    width: scale(20),
    resizeMode: 'contain',
  },
  container: {},
});
