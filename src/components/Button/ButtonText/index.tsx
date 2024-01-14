import Text, {TextProps} from 'components/TextBase';
import React, {memo, useMemo} from 'react';
import {
  ActivityIndicator,
  ColorValue,
  DimensionValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import colors from 'assets/colors';
import stylesCommon from 'assets/stylesCommon';

interface ButtonTextProps {
  title?: string;
  style?: ViewStyle;
  titleColor?: string;
  textProps?: TextProps;
  onPress?: () => void;
  borderColor?: ColorValue | string;
  marginLeft?: number;
  backgroundColor?: ColorValue | string;
  blueLight?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  height?: DimensionValue;
  boderRadius?: number;
}

const ButtonText = memo(
  ({
    backgroundColor,
    title,
    style,
    titleColor = colors.text,
    onPress,
    marginLeft,
    disabled,
    isLoading,
    height,
    boderRadius,
    ...textProps
  }: ButtonTextProps) => {
    const buttonStyle = useMemo((): StyleProp<ViewStyle> => {
      return {
        marginLeft: marginLeft,
        backgroundColor: disabled
          ? String(backgroundColor) + '70'
          : backgroundColor,
        height: height,
        borderRadius: boderRadius || 100,
      };
    }, [backgroundColor, boderRadius, disabled, height, marginLeft]);
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.container, stylesCommon.flexRow, buttonStyle, style]}
        onPress={onPress}
        activeOpacity={0.54}>
        <Text
          color={disabled ? titleColor + '98' : titleColor}
          size={16}
          {...textProps.textProps}>
          {title}
        </Text>
        {!!isLoading && (
          <ActivityIndicator color={colors.white} style={stylesCommon.ml10} />
        )}
      </TouchableOpacity>
    );
  },
);

export default ButtonText;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    ...stylesCommon.center,
  },
});
