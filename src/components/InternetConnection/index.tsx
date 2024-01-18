import React, {useEffect, useRef, useCallback} from 'react';
import {Animated, StyleSheet, Text, StatusBar, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import colors from 'assets/colors';

export const InternetConnection = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const show = useCallback(
    (isConnected: boolean) => {
      Animated.timing(animation, {
        toValue: isConnected
          ? 0
          : Platform.OS === 'android'
          ? 85 - (StatusBar.currentHeight ? 0 : 0)
          : 75,
        duration: 500,
        useNativeDriver: false,
      }).start();
    },
    [animation],
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      show(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: colors.red, height: animation},
      ]}>
      <Text style={styles.text}>{'No internet connection'}</Text>
    </Animated.View>
  );
};
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    margin: 10,
    color: 'white',
    textAlign: 'center',
  },
});
