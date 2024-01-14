import React from 'react';
import Modal from 'react-native-modal';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';

// Components
// Styles
import colors from 'assets/colors';
import scale from 'utils/scale';
import ButtonIcon from 'components/Button/ButtonIcon';
import images from 'assets/images';
import TextBase from 'components/TextBase';
import ButtonText from 'components/Button/ButtonText';
import stylesCommon from 'assets/stylesCommon';

interface Props {
  isVisibleModal: boolean;
  title?: string;
  description?: string;
  isShowIconClose?: boolean;
  buttonTitleLeft?: string;
  buttonTitleRight?: string;
  onCloseModal: () => void;
  styleTitle?: StyleProp<TextStyle>;
  styleDescription?: StyleProp<TextStyle>;
}
function ModalNotify({
  isVisibleModal,
  title,
  description,
  onCloseModal,
  styleTitle,
  styleDescription,
  buttonTitleLeft,
  buttonTitleRight,
  isShowIconClose,
}: Props) {
  return (
    <Modal
      isVisible={isVisibleModal}
      style={styles.container}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      backdropOpacity={0.5}
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}>
      <View style={styles.content}>
        <View style={styles.body}>
          <View style={styles.containerBody}>
            {title && (
              <TextBase
                size={16}
                fontWeight={'500'}
                center={true}
                color={colors.text}
                style={[styles.title, styleTitle]}>
                {title}
              </TextBase>
            )}
            {!!isShowIconClose && (
              <ButtonIcon
                iconStyle={styles.icon}
                icon={images.ic_close}
                style={styles.buttonClose}
              />
            )}
          </View>
          <View style={[stylesCommon.pl16, stylesCommon.pr16]}>
            {description && (
              <TextBase
                size={16}
                lineHeight={24}
                style={[styles.description, styleDescription]}>
                {description}
              </TextBase>
            )}
            <View
              style={[
                stylesCommon.flexRow,
                stylesCommon.pb16,
                stylesCommon.pt16,
              ]}>
              {!!buttonTitleLeft && (
                <ButtonText
                  title={buttonTitleLeft}
                  style={stylesCommon.flex1}
                  titleColor={colors.gray64}
                  textProps={{
                    textDecorationLine: 'underline',
                  }}
                />
              )}
              {!!buttonTitleRight && (
                <ButtonText
                  title={buttonTitleRight}
                  backgroundColor={colors.primary}
                  style={stylesCommon.flex1}
                  titleColor={colors.white}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalNotify.defaultProps = {
  onCloseModal: () => {},
  styleTitle: {},
  styleDescription: {},
};

export default ModalNotify;

const styles = StyleSheet.create({
  icon: {
    height: 15,
    width: 15,
  },
  container: {
    margin: 20,
    justifyContent: 'center',
  },

  content: {
    backgroundColor: colors.white,
    borderRadius: 14,
  },

  body: {
    // paddingHorizontal: 16,
    // paddingTop: 20,
    // paddingBottom: 16,
  },
  containerBody: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    justifyContent: 'center',
  },
  buttonClose: {position: 'absolute', right: 0},
  title: {
    paddingHorizontal: 30,
  },

  description: {
    textAlign: 'center',
    marginTop: scale(16),
  },
});
