import {Dimensions, Platform, StatusBar} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
export const {height, width} = Dimensions.get('screen');

const widthDesign = 375;
const heightDesign = 812;
const scale = (size: number, accordingHeight?: boolean) => {
  if (accordingHeight) {
    return (size * height) / heightDesign;
  }
  return (size * width) / widthDesign;
};
export const statusBarHeight =
  Platform.OS === 'ios'
    ? isIphoneX()
      ? scale(40)
      : scale(20)
    : StatusBar.currentHeight
    ? StatusBar.currentHeight
    : 0;
export default scale;
