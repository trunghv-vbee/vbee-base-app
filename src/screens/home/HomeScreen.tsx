import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Container from 'components/Layout/Container';
import scale from 'utils/scale';
import Image from 'components/Image';
import images from 'assets/images';
import HeaderHome from 'components/Layout/Header/HeaderHome';

const HomeScreen = () => {
  return (
    <Container hideHeader={true} style={styles.container}>
      <HeaderHome />
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  floatBtn: {
    position: 'absolute',
    bottom: scale(32),
    right: scale(16),
  },
});
