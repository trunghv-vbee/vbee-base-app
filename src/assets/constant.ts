import DeviceInfo from 'react-native-device-info';

const Constant = {
  AppName: DeviceInfo.getApplicationName(),
  versionName: DeviceInfo.getVersion(),
  versionCode: DeviceInfo.getBuildNumber(),
};

export default Constant;
