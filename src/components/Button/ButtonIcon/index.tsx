import Image from 'components/Image';
import React, {memo, useCallback} from 'react';
import {
  ColorValue,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import colors from 'assets/colors';
import stylesCommon from 'assets/stylesCommon';

interface ButtonIconProps extends TouchableOpacityProps {
  icon: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  width?: number;
  height?: number;
  marginRight?: number;
  backgroundColor?: ColorValue | string;
  tintColor?: ColorValue | string;
  marginLeft?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  disabled?: boolean;
  onPress?: () => void;
}

const ButtonIcon = memo(
  ({
    icon,
    backgroundColor,
    tintColor,
    marginRight,
    marginLeft,
    marginHorizontal,
    marginVertical,
    height,
    width,
    style,
    iconStyle,
    onPress,
    disabled,
    ...props
  }: ButtonIconProps) => {
    const _onPress = useCallback(() => {
      onPress && onPress();
    }, [onPress]);

    return (
      <TouchableOpacity
        {...props}
        activeOpacity={0.54}
        hitSlop={{top: 14, left: 14, right: 14, bottom: 14}}
        style={[
          styles.container,
          {
            backgroundColor: disabled
              ? colors.gray32
              : backgroundColor || colors.white,
            marginRight: marginRight,
            marginLeft: marginLeft,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            height: height,
            width: width,
          },
          style,
        ]}
        disabled={disabled}
        onPress={_onPress}>
        <Image
          tintColor={tintColor}
          style={[styles.icon, iconStyle]}
          source={icon}
        />
      </TouchableOpacity>
    );
  },
);

export default ButtonIcon;

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
  container: {
    borderRadius: 100,
    ...stylesCommon.center,
  },
});
