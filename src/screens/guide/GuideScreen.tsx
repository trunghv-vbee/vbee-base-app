import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import stylesCommon from 'assets/stylesCommon';
import TextBase from 'components/TextBase';
import strings from 'assets/strings';
import ButtonIcon from 'components/Button/ButtonIcon';
import images from 'assets/images';
import {goBack} from 'navigation/service/RootNavigation';
import colors from 'assets/colors';
import Container from 'components/Layout/Container';
import scale from 'utils/scale';
import Collapsible from 'screens/guide/Collapsible';
import Image from 'components/Image';

const GuideScreen = () => {
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
          {strings.userManual}
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
          <Collapsible
            title={'Hướng dẫn 01'}
            content={
              <View>
                <TextBase size={14} marginBottom={16}>
                  Nội dung hướng dẫn sử dụng chi tiết hiển thị tại đây với định
                  dạng rich text format.
                </TextBase>
                <Image source={images.ic_bg} style={styles.img} />
                <TextBase size={14} marginTop={16}>
                  Nội dung hướng dẫn sử dụng chi tiết hiển thị tại đây với định
                  dạng rich text format.
                </TextBase>
              </View>
            }
          />
          <Collapsible
            title={'Hướng dẫn 02'}
            content={
              <View>
                <TextBase size={14} marginBottom={16}>
                  Nội dung hướng dẫn sử dụng chi tiết hiển thị tại đây với định
                  dạng rich text format.
                </TextBase>
                <Image source={images.ic_bg} style={styles.img} />
                <TextBase size={14} marginTop={16}>
                  Nội dung hướng dẫn sử dụng chi tiết hiển thị tại đây với định
                  dạng rich text format.
                </TextBase>
              </View>
            }
          />
          <Collapsible
            title={'Hướng dẫn 03'}
            content={
              <View>
                <TextBase size={14} marginBottom={16}>
                  Nội dung hướng dẫn sử dụng chi tiết hiển thị tại đây với định
                  dạng rich text format.
                </TextBase>
                <Image source={images.ic_bg} style={styles.img} />
                <TextBase size={14} marginTop={16}>
                  Nội dung hướng dẫn sử dụng chi tiết hiển thị tại đây với định
                  dạng rich text format.
                </TextBase>
              </View>
            }
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default GuideScreen;

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
  img: {
    height: 204,
    borderRadius: 12,
    width: '100%',
  },
});
