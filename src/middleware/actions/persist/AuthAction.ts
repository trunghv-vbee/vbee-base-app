import ActionKeys from 'middleware/actions/ActionKeys';
import {LoginSave} from 'model/auth/Auth';
import {Dispatch} from 'react';
import {ActionData} from 'middleware/actions/ActionData';

export function _saveLoginData(data: LoginSave) {
  return {
    type: ActionKeys.AUTH.LOGIN,
    data,
  };
}
export function onSaveLogin(data: LoginSave) {
  return (dispatch: Dispatch<ActionData<LoginSave>>) => {
    dispatch(_saveLoginData(data));
  };
}

export function onLogout() {
  return {
    type: ActionKeys.AUTH.LOGOUT,
  };
}
