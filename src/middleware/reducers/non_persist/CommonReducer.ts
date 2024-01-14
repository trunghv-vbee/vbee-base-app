import {ActionData} from 'middleware/actions/ActionData';
import ActionKeys from 'middleware/actions/ActionKeys';

export interface CommonData {
  count: number;
}

const initialState: CommonData = {
  count: 0,
};

const commonReducer = (
  state = initialState,
  action: ActionData<CommonData>,
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
