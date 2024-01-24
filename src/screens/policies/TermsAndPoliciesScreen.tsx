import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import stylesCommon from 'assets/stylesCommon';
import TextBase from 'components/TextBase';
import colors from 'assets/colors';
import strings from 'assets/strings';
import ButtonIcon from 'components/Button/ButtonIcon';
import images from 'assets/images';
import scale from 'utils/scale';
import Container from 'components/Layout/Container';
import {goBack} from 'navigation/service/RootNavigation';

const TermsAndPoliciesScreen = () => {
  return (
    <Container
      hideHeader={true}
      translucent={true}
      isHideFooter={true}
      style={styles.container}>
      <View style={[stylesCommon.flexRowSpace, styles.containerHeader]}>
        <View style={stylesCommon.flex1} />
        <TextBase
          center={true}
          size={20}
          style={{paddingHorizontal: 10}}
          fontWeight={'500'}
          lineHeight={28}>
          {strings.tempsAndPolicies}
        </TextBase>
        <View style={[stylesCommon.flex1, {alignItems: 'flex-end'}]}>
          <ButtonIcon
            icon={images.ic_close}
            onPress={goBack}
            style={{
              backgroundColor: colors.gray04,
              padding: 13,
            }}
            iconStyle={{height: 12, width: 12}}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 16}}>
          <TextBase
            size={20}
            fontWeight={'700'}
            color={colors.primary}
            lineHeight={28}>
            Tiêu đề 01
          </TextBase>
          <TextBase
            lineHeight={20}
            marginTop={12}
            size={14}
            color={colors.text}>
            Nội dung chi tiết phần 01 hiển thị tại đây
          </TextBase>
          {['01', '02', '03'].map((e, i) => {
            return (
              <View key={i} style={[stylesCommon.flexRow, stylesCommon.mt06]}>
                <View
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: colors.black,
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                  }}
                />
                <TextBase lineHeight={20} size={14} color={colors.text}>
                  Thông tin {e}
                </TextBase>
              </View>
            );
          })}
          <TextBase
            size={16}
            color={colors.text}
            fontWeight={'700'}
            marginTop={18}>
            Tiêu đề phụ 01
          </TextBase>
          <TextBase
            lineHeight={20}
            marginTop={12}
            size={14}
            color={colors.text}>
            Nội dung chi tiết phần 02 hiển thị tại đây
          </TextBase>
          {['01', '02', '03'].map((e, i) => {
            return (
              <View key={i} style={[stylesCommon.flexRow, stylesCommon.mt06]}>
                <View
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: colors.black,
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                  }}
                />
                <TextBase lineHeight={20} size={14} color={colors.text}>
                  Thông tin {e}
                </TextBase>
              </View>
            );
          })}
          <TextBase
            size={20}
            marginTop={32}
            fontWeight={'700'}
            color={colors.primary}
            lineHeight={28}>
            Tiêu đề 01
          </TextBase>
          <TextBase
            lineHeight={20}
            marginTop={12}
            size={14}
            color={colors.text}>
            Nội dung chi tiết phần 01 hiển thị tại đây
          </TextBase>
          {['01', '02', '03'].map((e, i) => {
            return (
              <View key={i} style={[stylesCommon.flexRow, stylesCommon.mt06]}>
                <View
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: colors.black,
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                  }}
                />
                <TextBase lineHeight={20} size={14} color={colors.text}>
                  Thông tin {e}
                </TextBase>
              </View>
            );
          })}
          <TextBase
            size={16}
            color={colors.text}
            fontWeight={'700'}
            marginTop={18}>
            Tiêu đề phụ 01
          </TextBase>
          <TextBase
            lineHeight={20}
            marginTop={12}
            size={14}
            color={colors.text}>
            Nội dung chi tiết phần 02 hiển thị tại đây
          </TextBase>
          {['01', '02', '03'].map((e, i) => {
            return (
              <View key={i} style={[stylesCommon.flexRow, stylesCommon.mt06]}>
                <View
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: colors.black,
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                  }}
                />
                <TextBase lineHeight={20} size={14} color={colors.text}>
                  Thông tin {e}
                </TextBase>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Container>
  );
};

export default TermsAndPoliciesScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    paddingTop: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  containerHeader: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray16,
    paddingBottom: scale(10),
  },
});
