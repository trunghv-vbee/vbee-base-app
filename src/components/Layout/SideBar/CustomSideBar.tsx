import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import colors from 'assets/colors';
import images from 'assets/images';
import strings from 'assets/strings';
import ExpandableViewSeparate, {
  ExpandableItemComponent,
} from './ExpandableViewSeparate';
import {useAppDispatch} from 'middleware/stores';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {MainParamList} from 'navigation/service/NavigationParams';
import Routes from 'navigation/service/Routes';
import {onLogout} from 'middleware/actions/persist/AuthAction';
import scale from 'utils/scale';
// import DrawerItemList from './DrawerItemList';

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
    <DrawerContentScrollView {...props}>
      <Animated.View>
        <View style={styles.containerHeader}>
          <View style={styles.containerProfile}>
            <Image source={images.ic_home} />
          </View>
        </View>

        <ExpandableViewSeparate {...props} />
        <ExpandableItemComponent
          onPress={logout}
          item={{
            category_name: strings.login,
            icon: images.ic_logout,
            isSubMenu: true,
          }}
          {...props}
        />
      </Animated.View>
    </DrawerContentScrollView>
  );
};

export default CustomSideBar;

const styles = StyleSheet.create({
  containerHeader: {overflow: 'hidden', paddingLeft: 16, paddingRight: 16},
  imageAvatar: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
  },
  containerProfile: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
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
