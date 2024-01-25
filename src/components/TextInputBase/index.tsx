import Text from 'components/TextBase';
import {FormikErrors, FormikTouched, FormikValues} from 'formik';
import React, {Dispatch, SetStateAction} from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import colors from 'assets/colors';
import _ from 'lodash';
import stylesCommon from 'assets/stylesCommon';
import images from 'assets/images';
import ButtonIcon from 'components/Button/ButtonIcon';

interface Props extends TextInputProps {
  isShowIconRight?: boolean;
  iconRight?: any;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconRightStyle?: StyleProp<ViewStyle>;
  iconRightPress?: () => void;
  backgroundColor?: ColorValue | string;
  iconLeft?: any;
  iconLeftStyle?: StyleProp<ViewStyle>;
  isShowIconLeft?: boolean;
  iconPressLeft?: () => void;
  multiline?: boolean;
  editable?: boolean;
  errors?: FormikErrors<FormikValues>;
  touched?: FormikTouched<FormikValues>;
  name?: string;
}

export default ({
  isShowIconRight,
  iconRight,
  iconRightStyle,
  containerStyle,
  backgroundColor,
  iconRightPress,
  isShowIconLeft,
  iconLeft,
  iconPressLeft,
  errors,
  touched,
  name,
  inputStyle,
  iconLeftStyle,
  ...props
}: Props) => {
  let errorName = _.get(errors, name || '');
  let touchedName = _.get(touched, name || '');
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
        containerStyle,
        !!errorName && touchedName && styles.borderError,
        props.multiline && styles.multi,
      ]}>
      {!!isShowIconLeft && !!iconLeft && (
        <ButtonIcon
          onPress={iconPressLeft}
          icon={iconLeft}
          style={iconLeftStyle}
          backgroundColor={colors.transparent}
        />
      )}
      <TextInput
        style={[styles.textInput, inputStyle]}
        placeholderTextColor={props.placeholderTextColor || colors.white32}
        {...props}
      />
      {isShowIconRight && !!iconRight && (
        <ButtonIcon
          onPress={iconRightPress}
          icon={iconRight}
          style={iconRightStyle}
          backgroundColor={colors.transparent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  borderError: {
    borderColor: colors.red,
    borderWidth: 1,
  },
  container2: {},
  container: {
    paddingHorizontal: 16,
    ...stylesCommon.flexRow,
  },
  iconView: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 12,
    ...stylesCommon.center,
  },
  iconLeftView: {
    width: 24,
    height: 24,
    ...stylesCommon.center,
    marginRight: 13,
  },
  multi: {
    paddingBottom: 11,
  },
  textInput: {
    fontSize: 15,
    minHeight: 48,
    color: colors.white,
  },
});
