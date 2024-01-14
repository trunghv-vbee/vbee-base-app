import React from 'react';
import Modal from 'react-native-modal';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';

// Components
// Styles
import colors from 'assets/colors';
import scale from 'utils/scale';

interface Props {
  isVisibleModal: boolean;
  title?: string;
  description?: string;
  children: React.ReactNode;
  onCloseModal: () => void;
  styleTitle?: StyleProp<TextStyle>;
  styleDescription?: StyleProp<TextStyle>;
}
function ModalBase({
  isVisibleModal,
  title,
  description,
  children,
  onCloseModal,
  styleTitle,
  styleDescription,
}: Props) {
  return (
    <Modal
      isVisible={isVisibleModal}
      style={styles.container}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      backdropOpacity={0.8}
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}>
      <View style={styles.content}>
        <View style={styles.body}>
          {title && <Text style={[styles.title, styleTitle]}>{title}</Text>}
          {description && (
            <Text style={[styles.description, styleDescription]}>
              {description}
            </Text>
          )}
        </View>
        {children && children}
      </View>
    </Modal>
  );
}

ModalBase.defaultProps = {
  onCloseModal: () => {},
  styleTitle: {},
  styleDescription: {},
};

export default ModalBase;

const styles = StyleSheet.create({
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

  title: {
    fontSize: scale(18),
    textAlign: 'center',
    fontWeight: 'bold',
  },

  description: {
    fontSize: scale(16),
    textAlign: 'center',
    marginTop: 10,
  },
});
