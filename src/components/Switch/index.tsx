import React, {useMemo, useRef} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import colors from 'assets/colors';
import scale from 'utils/scale';

interface Props {
  style?: ViewStyle;
  enable?: boolean;
  backgroundActive?: string;
  backgroundInactive?: string;
  circleActiveColor?: string;
  circleInActiveColor?: string;
  onPress?: () => void;
}

export default ({
  style,
  enable,
  backgroundActive,
  backgroundInactive,
  circleActiveColor,
  circleInActiveColor,
  onPress,
}: Props) => {
  const transX = useRef(new Animated.Value(0)).current;
  const viewToggle = enable
    ? {backgroundColor: backgroundActive}
    : {backgroundColor: backgroundInactive};

  const translateStyle = useMemo((): StyleProp<ViewStyle> => {
    return {transform: [{translateX: transX}]};
  }, [transX]);

  const containerSwitchStyle = useMemo((): StyleProp<ViewStyle> => {
    return {
      borderWidth: enable ? scale(1.5) : 0.5,
      borderColor: enable ? circleActiveColor : colors.transparent,
    };
  }, [circleActiveColor, enable]);

  const colorStyle = useMemo((): StyleProp<ViewStyle> => {
    return {backgroundColor: enable ? circleActiveColor : circleInActiveColor};
  }, [circleActiveColor, circleInActiveColor, enable]);

  const _onPress = () => {
    if (enable) {
      Animated.timing(transX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (enable === false) {
      Animated.timing(transX, {
        toValue: 12,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    onPress && onPress();
  };

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View style={[styles.container, viewToggle, style]}>
        <Animated.View
          style={[styles.circleToggle, colorStyle, translateStyle]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(34),
    height: scale(22),
    borderRadius: scale(16),
    justifyContent: 'center',
    borderColor: colors.primary,
  },
  circleToggle: {
    width: scale(16),
    margin: scale(2),
    height: scale(16),
    borderRadius: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
});
