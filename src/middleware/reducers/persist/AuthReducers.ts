import {ActionData} from 'middleware/actions/ActionData';
import ActionKeys from 'middleware/actions/ActionKeys';
import {AuthReducer} from 'model/redux/Reducer';
import {LoginSave} from 'model/auth/Auth';

const authState: AuthReducer = {
  loginToken: '',
  user: {
    userName: '',
    fullName: 'Robert Đức',
    dob: 'string',
    phoneNumber: '0987654321',
    email: '',
  },
};

export const authReducer = (
  state = authState,
  action: ActionData<LoginSave>,
) => {
  switch (action.type) {
    case ActionKeys.AUTH.LOGIN:
      return {
        ...state,
        token: action.data.accessToken,
        userProfile: action.data.user,
      };
    case ActionKeys.AUTH.LOGOUT:
      return {
        ...state,
        token: '',
        userProfile: {},
      };
    default:
      return state;
  }
};
