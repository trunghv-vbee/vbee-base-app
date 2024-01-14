import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Image from 'components/Image';
import images from 'assets/images';
import stylesCommon from 'assets/stylesCommon';
import TextBase from 'components/TextBase';
import colors from 'assets/colors';

interface SelectBoxProps {
  isSelected: boolean;
  label: string;
}

const SelectBox = (props: SelectBoxProps) => {
  const [state, setState] = useState();
  return (
    <TouchableOpacity style={[stylesCommon.flexRow, styles.container]}>
      {props?.isSelected ? (
        <Image source={images.ic_selected} />
      ) : (
        <Image source={images.ic_unselected} />
      )}
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

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
