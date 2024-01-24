import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import colors from 'assets/colors';
import images from 'assets/images';
import scale, {statusBarHeight} from 'utils/scale';
import ButtonIcon from 'components/Button/ButtonIcon';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainParamList} from 'navigation/service/NavigationParams';

export interface HeaderHomeProps {
  onPressLeft?: () => void;
  buttonRight?: React.ReactNode;
  hideButtonRight?: boolean;
}
const HeaderHome = (props: HeaderHomeProps) => {
  const router = useNavigation<DrawerNavigationProp<MainParamList>>();

  const onPressLeft = () =>
    props?.onPressLeft ? props?.onPressLeft() : router.openDrawer();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupHeader}>
        <View style={styles.button}>
          <ButtonIcon
            backgroundColor={colors.transparent}
            onPress={onPressLeft}
            icon={images.ic_menu}
            iconStyle={{height: 20, width: 20}}
          />
        </View>
        <View>
          <Image
            source={images.ic_logo}
            style={{
              height: 20,
              resizeMode: 'contain',
            }}
          />
        </View>
        {props?.buttonRight ? (
          props?.buttonRight
        ) : props?.hideButtonRight ? null : (
          <View style={[{flex: 1}]} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HeaderHome);

const styles = StyleSheet.create({
  icon: {height: 23, width: 23, marginRight: 8},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  buttonHeader: {},
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {flex: 1},
  txtTitle: {
    fontSize: scale(14),
    color: colors.white,
    fontWeight: 'bold',
  },
  containerTitle: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  iconBack: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  container: {
    paddingTop: statusBarHeight + scale(15),
  },
});
