import Config from 'react-native-config';
const prefix = '/api/v1';
const paths = {
  prefix,
  baseUrl: Config.API_URL + prefix,
  login: 'login',
};
export default paths;
