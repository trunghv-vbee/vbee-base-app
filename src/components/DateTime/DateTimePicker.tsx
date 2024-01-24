import BottomModal from 'components/Modal/ModalBottom';
import Text from 'components/TextBase';
import TextBase from 'components/TextBase';
import moment, {Moment} from 'moment';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from 'assets/colors';
import ButtonText from 'components/Button/ButtonText';
import {Calendar, DateData} from 'react-native-calendars';
import scale from 'utils/scale';
import stylesCommon from 'assets/stylesCommon';
import ButtonIcon from 'components/Button/ButtonIcon';
import images from 'assets/images';
import Image from 'components/Image';
import {MarkedDates} from 'react-native-calendars/src/types';
import MonthList from 'components/DateTime/MonthList';
import useStateCustom from 'hooks/useStateCustom';
import YearList from 'components/DateTime/YearList';
import strings from 'assets/strings';
import {LocaleConfig} from 'react-native-calendars/src';
import {textSectionTitleColor} from 'react-native-calendars/src/style';
LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Thg 1',
    'Thg 2',
    'Thg 3',
    'Thg 4',
    'Thg 5',
    'Thg 6',
    'Thg 7',
    'Thg 8',
    'Thg 9',
    'Thg 10',
    'Thg 11',
    'Thg 12',
  ],
  dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'],
};
LocaleConfig.defaultLocale = 'vi';
interface Props {
  title?: string;
  textButton?: string;
  value?: string;
  onDateSelected?: (date: Moment, dateString: string) => void;
  visible: boolean;
  onCloseModal?: () => void;
  format?: string;
  maximumDate?: Moment;
  minimumDate?: Moment;
}
interface State {
  date: Moment;
  type: 'month' | 'date' | 'year';
}
const DateTimePicker = (props: Props) => {
  const [state, setState] = useStateCustom<State>({
    date: moment(),
    type: 'date',
  });

  const handleClose = () => {
    setState({type: 'date'});
    props.onCloseModal && props.onCloseModal();
  };
  const onPressClose = useCallback(() => {
    if (props.onDateSelected) {
      props.onDateSelected(
        state.date,
        moment(state.date).format(props.format || 'DD/MM/YYYY'),
      );
      handleClose();
    }
  }, [state.date, props]);

  const _changeMonth = useCallback(
    (isNext: boolean) => {
      let currentDate = moment(state.date).clone();
      if (isNext) {
        currentDate.add(1, 'month');
      } else {
        currentDate.subtract(1, 'month');
      }
      setState({date: currentDate});
    },
    [setState, state.date],
  );

  const _changeYear = useCallback(
    (isNext: boolean, amount?: number) => {
      let currentDate = moment(state.date).clone();
      if (isNext) {
        currentDate.add(amount || 1, 'year');
      } else {
        currentDate.subtract(amount || 1, 'year');
      }
      setState({date: currentDate});
    },
    [setState, state.date],
  );

  const _onChangeMonth = useCallback(
    (isNext: boolean) => () => {
      switch (state.type) {
        case 'date':
          _changeMonth(isNext);
          break;
        case 'month':
          _changeYear(isNext);
          break;
        case 'year':
          _changeYear(isNext, 12);
          break;
      }
    },
    [_changeMonth, _changeYear, state.type],
  );

  const _onDateChange = useCallback(
    (dateData: DateData) => {
      setState({date: moment(dateData.dateString, 'YYYY-MM-DD')});
    },
    [setState],
  );

  const markedDate = useMemo(
    (): MarkedDates => ({
      [state.date.format('YYYY-MM-DD')]: {
        selected: true,
        customStyles: {
          text: {
            color: colors.primary,
            fontWeight: '700',
            fontSize: scale(16),
          },
          container: {
            backgroundColor: colors.primary + 20,
          },
        },
      },
    }),
    [state.date],
  );

  const _renderHeader = () => null;

  const onShowMonth = useCallback(() => {
    setState({
      type: state?.type == 'month' ? 'year' : 'month',
    });
  }, [setState, state?.type]);

  const getDate = useMemo(() => {
    switch (state?.type) {
      case 'date':
        return state.date.format('MMMM YYYY');
      case 'month':
        return state.date.format('YYYY');
      case 'year':
        let dateClone = state.date.clone();
        return (
          state.date.format('YYYY') +
          '-' +
          dateClone.add(11, 'year').format('YYYY')
        );
    }
  }, [state.date, state?.type]);

  const onSelectMonth = useCallback(
    (month: number) => {
      let currentDate = state.date.clone();
      currentDate.set('month', month);
      setState({date: currentDate, type: 'date'});
    },
    [setState, state.date],
  );
  const onSelectYear = useCallback(
    (year: number) => {
      let currentDate = state.date.clone();
      currentDate.set('year', year);
      setState({date: currentDate, type: 'month'});
    },
    [setState, state.date],
  );

  var renderDatePicker = useCallback(() => {
    return (
      <View style={styles.containerDate}>
        <View
          style={[
            stylesCommon.flexRowSpace,
            stylesCommon.pl20,
            stylesCommon.pr20,
          ]}>
          <TouchableOpacity
            onPress={onShowMonth}
            style={[stylesCommon.flexRow]}>
            <TextBase ucfirst={true} marginRight={5} fontWeight={'600'}>
              {getDate}
            </TextBase>
            <Image source={images.ic_arrow} style={styles.iconMonth} />
          </TouchableOpacity>
          <View style={[stylesCommon.flexRow, stylesCommon.pl20]}>
            <ButtonIcon
              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
              icon={images.ic_arrow}
              onPress={_onChangeMonth(false)}
              tintColor={colors.primary}
            />
            <ButtonIcon
              icon={images.ic_arrow}
              tintColor={colors.primary}
              iconStyle={{transform: [{rotate: '90deg'}]}}
              style={[stylesCommon.ml30]}
              onPress={_onChangeMonth(true)}
              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
            />
          </View>
        </View>
        {state?.type == 'month' && (
          <MonthList onChange={onSelectMonth} month={state.date.format('MM')} />
        )}
        {state?.type == 'year' && (
          <YearList onChange={onSelectYear} year={state.date.format('YYYY')} />
        )}
        {state?.type == 'date' && (
          <Calendar
            initialDate={state.date.format('YYYY-MM-DD')}
            onDayPress={_onDateChange}
            hideArrows={true}
            firstDay={0}
            markingType={'custom'}
            theme={{
              textSectionTitleColor: colors.gray80,
            }}
            markedDates={markedDate}
            renderHeader={_renderHeader}
          />
        )}
      </View>
    );
  }, [
    onShowMonth,
    getDate,
    _onChangeMonth,
    state?.type,
    state.date,
    onSelectMonth,
    _onDateChange,
    markedDate,
  ]);

  return (
    <BottomModal isVisibleModal={props.visible} onCloseModal={handleClose}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.containerButtonLeft}>
            <ButtonIcon
              icon={images.ic_close}
              onPress={handleClose}
              backgroundColor={colors.transparent}
              style={styles.buttonLeft}
            />
          </View>
          <Text fontWeight={'500'} center size={17}>
            {props.title ?? strings.chooseDate}
          </Text>
          <View style={styles.containerButtonRight}>
            <ButtonText
              title={props.textButton || strings.done}
              onPress={onPressClose}
              backgroundColor={colors.primary}
              titleColor={colors.white}
            />
          </View>
        </View>
        {renderDatePicker()}
      </View>
    </BottomModal>
  );
};

export default React.memo(DateTimePicker);

const styles = StyleSheet.create({
  containerButtonRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  containerButtonLeft: {flex: 1, alignItems: 'flex-start'},
  buttonLeft: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconMonth: {
    tintColor: colors.primary,
    transform: [{rotate: '90deg'}],
    height: 12,
    width: 12,
    resizeMode: 'contain',
  },
  containerHeader: {
    paddingVertical: 8,
    paddingRight: 10,
    backgroundColor: colors.gray,
    borderBottomColor: colors.gray16,
    borderBottomWidth: 1,
    ...stylesCommon.flexRowSpace,
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
  },
  containerDate: {
    paddingVertical: 20,
  },
  styleButton: {
    backgroundColor: colors.primary,
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    height: 'auto',
  },
  textButton: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 17,
  },
  textTitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 23,
  },
  datePicker: {
    alignSelf: 'center',
    height: 210,
    paddingVertical: 30,
  },
});
