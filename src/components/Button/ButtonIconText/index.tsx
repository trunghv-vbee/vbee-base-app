import Image from 'components/Image';
import Text, {TextProps} from 'components/TextBase';
import React, {memo, useMemo} from 'react';
import {
  ColorValue,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import colors from 'assets/colors';
import stylesCommon from 'assets/stylesCommon';

interface ButtonTextProps {
  title?: string;
  borderColor?: ColorValue | string;
  icon?: ImageSourcePropType;
  tintColor?: string;
  style?: ViewStyle;
  iconStyle?: any;
  titleColor?: string;
  backgroundColor?: string;
  textProps?: TextProps;
  onPress?: () => void;
  disabled?: boolean;
}

const ButtonIconText = memo(
  ({
    title,
    icon,
    style,
    tintColor,
    iconStyle,
    titleColor = colors.text,
    onPress,
    borderColor = colors.transparent,
    backgroundColor,
    disabled,
    ...textProps
  }: ButtonTextProps) => {
    const buttonStyle = useMemo((): StyleProp<ViewStyle> => {
      return {borderColor: borderColor, backgroundColor};
    }, [backgroundColor, borderColor]);
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
          disabled ? styles.opacity : {},
          buttonStyle,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.54}>
        {icon && (
          <Image tintColor={tintColor} style={[iconStyle]} source={icon} />
        )}
        <Text color={titleColor} marginLeft={8} {...textProps.textProps}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  },
);

export default ButtonIconText;

const styles = StyleSheet.create({
  opacity: {opacity: 0.3},
  container: {
    borderRadius: 100,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    ...stylesCommon.center,
    ...stylesCommon.flexRow,
  },
});
