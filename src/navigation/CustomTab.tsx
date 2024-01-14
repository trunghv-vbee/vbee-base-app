import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import scale from 'utils/scale';
import colors from 'assets/colors';
import React, {memo, useCallback} from 'react';
import Text from 'components/TextBase';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/src/types';
import strings from 'assets/strings';
import Image from 'components/Image';
import images from 'assets/images';
import Routes from 'navigation/service/Routes';
import stylesCommon from 'assets/stylesCommon';

const CustomTab = memo((props: BottomTabBarProps) => {
  const styleBtnUnfocused = useCallback(
    (index: number) => {
      return StyleSheet.create({
        unFocused: {
          backgroundColor: colors.white,
          borderBottomLeftRadius: index === props?.state.index + 1 ? 10 : 0,
          borderBottomRightRadius: index === props?.state.index - 1 ? 10 : 0,
        },
      });
    },
    [props?.state.index],
  );
  return (
    <View style={styles.container1}>
      <View style={styles.container}>
        {props?.state.routes.map((route: any, index: number) => {
          const isFocused = props?.state.index === index;

          const getIcon = () => {
            let icon: ImageSourcePropType = images.ic_home;
            switch (route.name) {
              case Routes.HomeScreen:
                icon = images.ic_home;
                break;
              default:
                break;
            }
            return icon ? (
              <Image
                source={icon}
                style={[styles.icon, isFocused ? styles.iconFocused : {}]}
              />
            ) : null;
          };
          const getTabName = () => {
            switch (route.name) {
              case Routes.HomeScreen:
                return strings.home;

              default:
                return strings.home;
            }
          };
          const onPress = () => {
            if (!isFocused) {
              return props?.navigation.navigate(route.name);
            }
          };
          return (
            <View
              key={index}
              style={[
                stylesCommon.flex1,
                isFocused ? styles.bgWhite : styles.bgPrimary,
              ]}>
              <TouchableOpacity
                onPress={onPress}
                style={[
                  styles.btn,
                  isFocused
                    ? styles.btnFocused
                    : styleBtnUnfocused(index).unFocused,
                ]}
                activeOpacity={1}>
                <View style={[styles.borderButton]}>
                  {getIcon()}
                  <Text
                    color={isFocused ? colors.white : colors.gray}
                    marginTop={10}
                    lineHeight={18}
                    fontWeight={isFocused ? '600' : '400'}
                    size={14}>
                    {getTabName()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
});
export default CustomTab;
const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: colors.white,
  },
  bgPrimary: {
    backgroundColor: colors.primary,
  },
  icon: {
    resizeMode: 'contain',
  },
  iconFocused: {
    tintColor: colors.white,
  },
  iconUnFocused: {},
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 6 + getBottomSpace(),
    paddingBottom: getBottomSpace() + scale(10),
    paddingTop: scale(14),
  },
  btnFocused: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  btnUnFocused: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  container1: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowOffset: {height: 2, width: 0},
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 2,
  },
  borderButton: {
    ...stylesCommon.center,
  },
  borderActive: {
    backgroundColor: colors.tealBlue20,
  },
});
