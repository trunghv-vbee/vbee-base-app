import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import colors from 'assets/colors';
import scale from 'utils/scale';

interface Props {
  onChange: (month: number, year: number) => void;
  initValue?: string;
}

const PickerItem = Picker.Item;

const monthList = [
  {label: 'T 1', value: 1},
  {label: 'T 2', value: 2},
  {label: 'T 3', value: 3},
  {label: 'T 4', value: 4},
  {label: 'T 5', value: 5},
  {label: 'T 6', value: 6},
  {label: 'T 7', value: 7},
  {label: 'T 8', value: 8},
  {label: 'T 9', value: 9},
  {label: 'T 10', value: 10},
  {label: 'T 11', value: 11},
  {label: 'T 12', value: 12},
  {label: 'T 1', value: 1},
  {label: 'T 2', value: 2},
  {label: 'T 3', value: 3},
  {label: 'T 4', value: 4},
  {label: 'T 5', value: 5},
  {label: 'T 6', value: 6},
  {label: 'T 7', value: 7},
  {label: 'T 8', value: 8},
  {label: 'T 9', value: 9},
  {label: 'T 10', value: 10},
  {label: 'T 11', value: 11},
  {label: 'T 12', value: 12},
  {label: 'T 1', value: 1},
  {label: 'T 2', value: 2},
  {label: 'T 3', value: 3},
  {label: 'T 4', value: 4},
  {label: 'T 5', value: 5},
  {label: 'T 6', value: 6},
  {label: 'T 7', value: 7},
  {label: 'T 8', value: 8},
  {label: 'T 9', value: 9},
  {label: 'T 10', value: 10},
  {label: 'T 11', value: 11},
  {label: 'T 12', value: 12},
];

const yearList = [
  '1990',
  '1991',
  '1992',
  '1993',
  '1994',
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
];

const MonthPicker = (props: Props) => {
  const init = props.initValue?.split('/');
  let month = 11;
  let year = 30;
  if (init?.length == 2) {
    month = monthList.findIndex(e => {
      const indexMonth = init ? init[0] : 11;
      if (e.value == indexMonth) {
        return true;
      }
      return false;
    });
    year = yearList.findIndex(e => {
      const indexYear = init ? init[1] : 30;
      if (e === indexYear) {
        return true;
      }
      return false;
    });
  }
  const [monthSelected, setMonth] = useState<number>(month);
  const [yearSelected, setYear] = useState<number>(year);
  const setMonthSelected = (index: number) => {
    setMonth(index);
    const month = monthList[index].value;

    const year = parseInt(yearList[yearSelected]);
    props.onChange(month, year);
  };

  const setYearSelected = (index: number) => {
    setYear(index);
    const month = monthList[monthSelected].value;
    const year = parseInt(yearList[index]);
    props.onChange(month, year);
  };
  return (
    <View style={style.container}>
      <Picker
        style={style.picker}
        selectedValue={monthSelected}
        itemStyle={style.textLabelMonth}
        onValueChange={setMonthSelected}>
        {monthList.map((value, i) => (
          <PickerItem label={value.label} value={i} key={i} />
        ))}
      </Picker>
      <Picker
        style={style.picker}
        selectedValue={yearSelected}
        itemStyle={style.textLabel}
        onValueChange={setYearSelected}>
        {yearList.map((value, i) => (
          <PickerItem label={value} value={i} key={i} />
        ))}
      </Picker>
    </View>
  );
};

export default React.memo(MonthPicker);

const style = StyleSheet.create({
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
  picker: {
    flex: 1,
    height: scale(180),
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },
});
