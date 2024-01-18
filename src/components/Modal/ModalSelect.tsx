import React from 'react';
import Modal from 'react-native-modal';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Components
// Styles
import colors from 'assets/colors';
import scale from 'utils/scale';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Animated from 'react-native-reanimated';
import TextBase from 'components/TextBase';
import ButtonIcon from 'components/Button/ButtonIcon';
import images from 'assets/images';
import ButtonText from 'components/Button/ButtonText';

interface Props {
  isVisibleModal: boolean;
  children?: React.ReactNode;
  onCloseModal: () => void;
  onFinish: () => void;
  scrollEnabled?: boolean;
  isTransaction?: boolean;
  title: string;
  textButtonHeader: string;
  styleTitle?: StyleProp<TextStyle>;
}
function ModalSelect({
  isVisibleModal,
  children,
  onCloseModal,
  title,
  scrollEnabled,
  styleTitle,
  textButtonHeader,
  onFinish,
}: Props) {
  const ContainerView = scrollEnabled ? KeyboardAwareScrollView : View;
  const _onFinish = () => {
    onCloseModal && onCloseModal();
    onFinish && onFinish();
  };
  return (
    <Modal
      isVisible={isVisibleModal}
      style={styles.container}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.6}
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      onBackButtonPress={onCloseModal}>
      <ContainerView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.containerModal}>
        <View style={[styles.content]}>
          <View style={styles.containerBody}>
            <ButtonIcon
              iconStyle={styles.icon}
              icon={images.ic_close}
              onPress={onCloseModal}
              style={styles.buttonClose}
            />
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
            <ButtonText
              title={textButtonHeader}
              backgroundColor={colors.primary}
              titleColor={colors.white}
              onPress={_onFinish}
              style={{paddingHorizontal: 15}}
            />
          </View>
          {children && children}
        </View>
      </ContainerView>
    </Modal>
  );
}

ModalSelect.defaultProps = {
  onCloseModal: () => {},
  styleTitle: {},
  styleDescription: {},
};

export default ModalSelect;

const styles = StyleSheet.create({
  containerModal: {flexGrow: 1, justifyContent: 'flex-end'},
  container: {
    justifyContent: 'flex-end',
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
  },

  content: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 40,
  },
  containerBody: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonClose: {
    paddingHorizontal: 16,
  },
  title: {},
  icon: {
    height: 15,
    width: 15,
  },
});
