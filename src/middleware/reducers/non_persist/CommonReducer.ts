import {ActionData} from 'middleware/actions/ActionData';
import ActionKeys from 'middleware/actions/ActionKeys';
import {CommonReducer} from 'model/redux/Reducer';

const initialState: CommonReducer = {
  count: 0,
};

const commonReducer = (
  state = initialState,
  action: ActionData<CommonReducer>,
) => {
  switch (action.type) {
    case ActionKeys.SET_COUNT_NOTIFICATION:
      return {
        ...state,
        count: action.data.count,
      };
    default:
      return state;
  }
};

export default commonReducer;
