import {useNavigation} from '@react-navigation/native';
import Text from 'components/TextBase';
import React from 'react';
import {
  ImageSourcePropType,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Image,
} from 'react-native';
import colors from 'assets/colors';
import images from 'assets/images';
import scale, {statusBarHeight} from 'utils/scale';
import ButtonIcon from 'components/Button/ButtonIcon';
import stylesCommon from 'assets/stylesCommon';
export interface HeaderHomeProps {
  onBack?: () => void;
  buttonRight?: React.ReactNode;
  hideButtonRight?: boolean;
}
const HeaderHome = ({
  onBack,
  buttonRight,
  hideButtonRight,
}: HeaderHomeProps) => {
  const router = useNavigation();

  const onPressBack = () => (onBack ? onBack() : router.goBack());
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupHeader}>
        <View style={styles.button}>
          <ButtonIcon
            backgroundColor={colors.transparent}
            onPress={onPressBack}
            icon={images.ic_menu}
          />
        </View>
        <View>
          <Image
            source={images.ic_logo}
            style={{
              height: 20,
              resizeMode: 'contain',
            }}
          />
        </View>
        {buttonRight ? (
          buttonRight
        ) : hideButtonRight ? null : (
          <View style={[{width: 60}]} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HeaderHome);

const styles = StyleSheet.create({
  icon: {height: 23, width: 23, marginRight: 8},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  buttonHeader: {},
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {flex: 1},
  txtTitle: {
    fontSize: scale(14),
    color: colors.white,
    fontWeight: 'bold',
  },
  containerTitle: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  iconBack: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  container: {
    paddingTop: statusBarHeight + scale(15),
  },
});
