import React, {useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Image from 'components/Image';
import images from 'assets/images';
import stylesCommon from 'assets/stylesCommon';
import TextBase from 'components/TextBase';
import colors from 'assets/colors';

interface RadioButtonProps {
  isSelected: boolean;
  label: string;
}

const RadioButton = (props: RadioButtonProps) => {
  const [state, setState] = useState();
  const selectedStyle = useMemo((): StyleProp<ViewStyle> => {
    return {
      borderColor: props?.isSelected ? colors.primary : colors.borderColor,
    };
  }, [props.isSelected]);
  return (
    <TouchableOpacity style={[stylesCommon.flexRow, styles.container]}>
      <View style={[styles.containerSelected, selectedStyle]}>
        {!!props?.isSelected && <View style={styles.selected} />}
      </View>
      <TextBase
        color={props?.isSelected ? colors.primary : colors.text}
        fontWeight={'500'}
        size={16}
        marginLeft={10}>
        {props?.label}
      </TextBase>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  containerSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    padding: 2,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: colors.primary,
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});
