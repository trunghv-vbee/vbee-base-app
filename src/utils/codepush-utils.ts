import codePush from 'react-native-code-push';

export default {
  async checkupDate() {
    return codePush.checkForUpdate();
  },
};
