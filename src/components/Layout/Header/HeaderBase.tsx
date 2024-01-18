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

export interface HeaderBaseProps {
  title?: string;
  hideBackButton?: boolean;
  onBack?: () => void;
  buttonRight?: React.ReactNode;
  buttonLeft?: React.ReactNode;
  iconLeft?: ImageSourcePropType;
  hideButtonRight?: boolean;
  titleStyle?: StyleProp<ViewStyle>;
  subTitle?: string | null;
  iconTile?: ImageSourcePropType;
}
const HeaderBase = ({
  title,
  hideBackButton,
  onBack,
  buttonRight,
  buttonLeft,
  iconLeft,
  hideButtonRight,
  titleStyle,
  subTitle,
  iconTile,
}: HeaderBaseProps) => {
  const router = useNavigation();

  const onPressBack = () => (onBack ? onBack() : router.goBack());
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupHeader}>
        <View style={styles.button}>
          {hideBackButton ? null : buttonLeft ? (
            buttonLeft
          ) : (
            <ButtonIcon
              backgroundColor={colors.transparent}
              onPress={onPressBack}
              icon={iconLeft ? iconLeft : images.ic_back}
            />
          )}
        </View>
        <View
          style={[
            styles.containerTitle,
            titleStyle,
            iconTile ? styles.rowCenter : {},
          ]}>
          {iconTile && <Image source={iconTile} style={styles.icon} />}
          <View>
            <Text
              size={20}
              fontWeight={'500'}
              color={colors.white}
              lineHeight={28}>
              {title}
            </Text>
          </View>
        </View>
        {buttonRight ? (
          buttonRight
        ) : hideButtonRight ? null : (
          <View style={[stylesCommon.flexRowSpaceAround]}>
            {/*<ButtonIconHeader*/}
            {/*  icon={images.ic_search}*/}
            {/*  onPress={onSearchCategory}*/}
            {/*/>*/}
            {/*<ButtonIconHeader*/}
            {/*  icon={images.ic_cart}*/}
            {/*  count={cart?.adOrderCount}*/}
            {/*  marginLeft={10}*/}
            {/*  marginRight={10}*/}
            {/*  onPress={onCart}*/}
            {/*/>*/}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HeaderBase);

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
    paddingRight: scale(10),
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(15),
    paddingHorizontal: scale(16),
  },
  container: {
    paddingTop: statusBarHeight + scale(15),
  },
});
