import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Container from 'components/Layout/Container';
import TextBase from 'components/TextBase';
import strings from 'assets/strings';
import Image from 'components/Image';
import ButtonIcon from 'components/Button/ButtonIcon';
import images from 'assets/images';
import stylesCommon from 'assets/stylesCommon';
import colors from 'assets/colors';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {MainParamList} from 'navigation/service/NavigationParams';
import Routes from 'navigation/service/Routes';
import scale from 'utils/scale';

const IntroduceScreen = () => {
  const navigation =
    useNavigation<NavigationProp<MainParamList, Routes.LoginScreen>>();
  return (
    <Container
      hideHeader={true}
      isHideFooter={true}
      translucent={false}
      style={styles.container}>
      <View style={[stylesCommon.flexRowSpace, styles.containerHeader]}>
        <TextBase
          size={24}
          color={colors.white}
          fontWeight={'700'}
          marginLeft={16}
          lineHeight={32}>
          {strings.introduce}
        </TextBase>
        <ButtonIcon
          icon={images.ic_close}
          onPress={navigation.goBack}
          style={{
            backgroundColor: colors.gray08,
            padding: 10,
          }}
          iconStyle={{height: 12, width: 12, tintColor: colors.white}}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[stylesCommon.flex1, {padding: 16}]}>
          <Image source={images.ic_bg} style={styles.img} />
          <TextBase
            size={20}
            fontWeight={'700'}
            color={colors.white}
            marginTop={24}
            lineHeight={28}>
            Tiêu đề 01
          </TextBase>
          <TextBase
            lineHeight={20}
            marginTop={12}
            size={14}
            color={colors.white}>
            Nội dung chi tiết phần 01 hiển thị tại đây với định dạng rich text
            format.
          </TextBase>
          {['01', '02', '03'].map((e, i) => {
            return (
              <View key={i} style={[stylesCommon.flexRow, stylesCommon.mt06]}>
                <View
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: colors.white,
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                  }}
                />
                <TextBase lineHeight={20} size={14} color={colors.white}>
                  Thông tin {e}
                </TextBase>
              </View>
            );
          })}
          <TextBase
            size={16}
            color={colors.white}
            fontWeight={'700'}
            marginTop={18}>
            Tiêu đề phụ 01
          </TextBase>
          <TextBase
            lineHeight={20}
            marginTop={12}
            size={14}
            color={colors.white}>
            Nội dung chi tiết phần 02 hiển thị tại đây
          </TextBase>
          {['01', '02', '03'].map((e, i) => {
            return (
              <View key={i} style={[stylesCommon.flexRow, stylesCommon.mt06]}>
                <View
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: colors.white,
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                  }}
                />
                <TextBase lineHeight={20} size={14} color={colors.white}>
                  Thông tin {e}
                </TextBase>
              </View>
            );
          })}
          <Image
            source={images.ic_bg}
            style={[styles.img, stylesCommon.mt12]}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default IntroduceScreen;

const styles = StyleSheet.create({
  container: {},
  containerHeader: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray32,
    paddingBottom: scale(16),
  },
  img: {
    height: 204,
    borderRadius: 12,
    width: '100%',
  },
});
