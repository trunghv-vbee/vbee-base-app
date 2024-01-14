import {LoginSave} from 'model/auth/auth';
import ActionKeys from 'middleware/actions/ActionKeys';

export function saveLoginData(data: LoginSave) {
  return {
    type: ActionKeys.AUTH.LOGIN,
    data,
  };
}

export function onLogout() {
  return {
    type: ActionKeys.AUTH.LOGOUT,
  };
}
