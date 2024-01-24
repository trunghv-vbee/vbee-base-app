import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import images from 'assets/images';
import colors from 'assets/colors';
import scale from 'utils/scale';
import TextBase from 'components/TextBase';

interface ColapsibleProps {
  title: string;
  content: React.ReactNode;
}

const Collapsible = (props: ColapsibleProps) => {
  const [isShowContent, setIsShowContent] = useState(false);
  const showContent = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setIsShowContent(!isShowContent);
  };
  return (
    <View
      style={[
        isShowContent
          ? styles.container
          : {
              backgroundColor: colors.gray04,
            },
        {paddingHorizontal: 16, borderRadius: scale(12), marginBottom: 12},
      ]}>
      <TouchableOpacity
        onPress={showContent}
        style={[
          styles.button,
          isShowContent
            ? {
                borderBottomColor: colors.gray,
                borderBottomWidth: 1,
              }
            : {},
        ]}>
        <TextBase size={16} fontWeight={'700'}>
          {props.title}
        </TextBase>
        <Image
          source={images.ic_arrow}
          style={{
            tintColor: colors.gray43,
            resizeMode: 'contain',
            marginRight: 5,
            transform: [{rotate: isShowContent ? '90deg' : '-90deg'}],
          }}
        />
      </TouchableOpacity>
      {!!isShowContent && (
        <View style={styles.containerContent}>
          <View>{props.content}</View>
        </View>
      )}
    </View>
  );
};

export default Collapsible;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  textTitle: {
    flex: 1,
    paddingRight: scale(15),
    paddingVertical: scale(15),
  },
  containerContent: {
    paddingVertical: scale(15),
  },
  textContent: {
    fontSize: scale(15),
    color: colors.gray16,
    lineHeight: scale(24),
  },
});
