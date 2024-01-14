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

type TimeType = 'date' | 'time' | 'datetime';
interface Props {
  title?: string;
  value?: string;
  type?: TimeType;
  onPressClose?: (date: Moment, dateString: string) => void;
  visible: boolean;
  onCloseModal?: () => void;
  format?: string;
  maximumDate?: Date;
  minimumDate?: Date;
}
interface State {
  date: Moment;
  type: 'month' | 'date' | 'year';
}
const DateTimePicker = React.memo(
  forwardRef((props: Props) => {
    const [state, setState] = useStateCustom<State>({
      date: moment(),
      type: 'date',
    });
    console.log('=>(DateTimePicker.tsx:50) state', state);

    const onPressClose = useCallback(() => {
      if (props.onPressClose) {
        props.onPressClose(
          state.date,
          moment(state.date).format(props.format || 'DD/MM/YYYY'),
        );
      }
      props.onCloseModal && props.onCloseModal();
    }, [state.date, props]);

    const _changeMonth = useCallback(
      (isNext: boolean) => {
        let currentDate = moment(state.date).clone();
        if (isNext) {
          currentDate.add(1, 'year');
        } else {
          currentDate.subtract(1, 'year');
        }
        setState({date: currentDate});
      },
      [setState, state.date],
    );

    const _changeYear = useCallback(
      (isNext: boolean) => {
        let currentDate = moment(state.date).clone();
        if (isNext) {
          currentDate.add(1, 'months');
        } else {
          currentDate.subtract(1, 'months');
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
            _changeMonth(isNext);
            break;
          case 'year':
            _changeYear(isNext);
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
          return state.date.format('MMM YYYY');
        case 'month':
          return state.date.format('YYYY');
        case 'year':
          return state.date.format('YYYY');
      }
    }, [state.date, state?.type]);

    const onSelectMonth = useCallback(
      (month: number) => {
        let currentDate = state.date.clone();
        console.log('=>(DateTimePicker.tsx:125) month', month);
        currentDate.set('month', month);
        console.log(
          "=>(DateTimePicker.tsx:125) currentDate.format'DD/MM/YYYY",
          currentDate.format('DD/MM/YYYY'),
        );
        setState({date: currentDate, type: 'date'});
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
              <TextBase fontWeight={'600'}>{getDate}</TextBase>
              <Image source={images.ic_back} style={styles.iconMonth} />
            </TouchableOpacity>
            <View style={[stylesCommon.flexRow, stylesCommon.pl20]}>
              <ButtonIcon
                hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
                icon={images.ic_back}
                onPress={_onChangeMonth(false)}
                tintColor={colors.primary}
              />
              <ButtonIcon
                icon={images.ic_back}
                tintColor={colors.primary}
                iconStyle={{transform: [{rotate: '180deg'}]}}
                style={[stylesCommon.ml30]}
                onPress={_onChangeMonth(true)}
                hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
              />
            </View>
          </View>
          {state?.type == 'month' && (
            <MonthList
              onChange={onSelectMonth}
              initValue={state.date.format('YYYY-MM-DD')}
            />
          )}
          {state?.type == 'date' && (
            <Calendar
              initialDate={state.date.format('YYYY-MM-DD')}
              onDayPress={_onDateChange}
              hideArrows={true}
              firstDay={0}
              markingType={'custom'}
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
      <BottomModal
        isVisibleModal={props.visible}
        onCloseModal={props.onCloseModal}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <ButtonIcon
              icon={images.ic_close}
              backgroundColor={colors.transparent}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            />
            <Text fontWeight={'500'} center size={17}>
              {props.title ?? 'Choose Date'}
            </Text>
            <ButtonText
              title={'Xong'}
              backgroundColor={colors.primary}
              titleColor={colors.white}
            />
          </View>
          {renderDatePicker()}
        </View>
      </BottomModal>
    );
  }),
);

export default DateTimePicker;

const styles = StyleSheet.create({
  iconMonth: {
    tintColor: colors.primary,
    transform: [{rotate: '180deg'}],
    height: 12,
    width: 12,
    resizeMode: 'contain',
    marginLeft: 6,
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
