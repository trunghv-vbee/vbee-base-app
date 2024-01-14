import {ActionData} from 'middleware/actions/ActionData';
import ActionKeys from 'middleware/actions/ActionKeys';
import {AuthReducer, LoginSave} from 'model/auth/Auth';

const authState: AuthReducer = {
  loginToken: '',
  user: {
    userName: '',
    fullName: '',
    dob: 'string',
    phoneNumber: '',
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
