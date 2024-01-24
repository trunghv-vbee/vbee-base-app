import React, {useMemo, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import colors from 'assets/colors';
import scale, {width} from 'utils/scale';
import TextBase from 'components/TextBase';
import moment from 'moment';
import stylesCommon from 'assets/stylesCommon';

interface Props {
  onChange: (month: number) => void;
  month: string;
}

const MonthList = (props: Props) => {
  const _onSelectedMonth = (month: number) => () => {
    props.onChange && props.onChange(month);
  };
  return (
    <View style={styles.container}>
      {moment.months().map((value, i) => {
        const isSelected = parseInt(props.month) == i + 1;
        return (
          <TouchableOpacity
            key={i.toString()}
            onPress={_onSelectedMonth(i)}
            style={[styles.containerText]}>
            <View
              style={[
                stylesCommon.center,
                stylesCommon.flex1,
                isSelected ? styles.containerSelected : {},
              ]}>
              <TextBase
                ucfirst={true}
                fontWeight={isSelected ? '600' : '400'}
                color={isSelected ? colors.primary : colors.text}>
                {value}
              </TextBase>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default React.memo(MonthList);

const styles = StyleSheet.create({
  textLabelMonth: {
    color: colors.text,
    fontSize: scale(22),
    lineHeight: scale(27),
  },
  textLabel: {
    color: colors.text,
    fontSize: scale(22),
    lineHeight: scale(27),
  },
  containerText: {
    width: width / 4,
    height: width / 4,
    padding: 4,
  },
  containerSelected: {
    backgroundColor: colors.gray16,
    borderRadius: 10,
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: scale(20),
  },
});
