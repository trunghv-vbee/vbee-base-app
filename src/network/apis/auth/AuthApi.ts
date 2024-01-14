import {RequestMethod} from './../../request';
import {LoginParams} from './AuthRequest';
import API from 'network/request';
import paths from 'network/paths';

class AuthApi {
  async LoginApi<T>(params: LoginParams) {
    return API.request<T>(RequestMethod.POST, paths.login, params, true);
  }
}
export default new AuthApi();
