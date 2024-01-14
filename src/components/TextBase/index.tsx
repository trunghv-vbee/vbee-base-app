import React from 'react';
import {ColorValue, StyleProp, Text, TextStyle} from 'react-native';
import colors from 'assets/colors';
import scale from 'utils/scale';

export interface TextProps {
  color?: ColorValue | string;
  size?: number;
  style?: StyleProp<TextStyle>;
  uppercase?: boolean;
  ucfirst?: boolean;
  lowercase?: boolean;
  children?: any;
  left?: boolean;
  text_placeholder?: boolean;
  right?: boolean;
  center?: boolean;
  onPress?: () => void;
  lineHeight?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  maxWidth?: number;
  numberOfLines?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
}

export default ({
  left,
  right,
  center,
  color,
  size,
  style,
  uppercase,
  lowercase,
  children,
  onPress,
  numberOfLines,
  fontWeight,
  ucfirst,
  ...props
}: TextProps) => {
  let _children = '';
  if (typeof children === 'string') {
    if (ucfirst) {
      _children =
        children.charAt(0).toUpperCase() + children.slice(1).toLowerCase();
    } else if (uppercase) {
      _children = children.toUpperCase();
    } else if (lowercase) {
      _children = children.toLowerCase();
    }
  }

  let textAlign: 'left' | 'center' | 'right' | 'auto' | 'justify' | undefined =
    'left';

  if (left) {
    textAlign = 'left';
  }
  if (right) {
    textAlign = 'right';
  }
  if (center) {
    textAlign = 'center';
  }

  return (
    <Text
      {...props}
      style={[
        {
          // fontFamily: FontFamily + '-' + fontStyle,
          color: color || colors.text,
          fontSize: scale(size || 14),
          lineHeight: props?.lineHeight,
          textAlign: textAlign,
          marginBottom: props?.marginBottom,
          marginLeft: props?.marginLeft,
          marginRight: props?.marginRight,
          marginTop: props?.marginTop,
          marginHorizontal: props?.marginHorizontal,
          marginVertical: props?.marginVertical,
          textDecorationLine: props?.textDecorationLine,
          maxWidth: props?.maxWidth,
          fontWeight: fontWeight,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      onPress={onPress}>
      {_children || children}
    </Text>
  );
};
