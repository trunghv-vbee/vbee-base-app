import {Dispatch, ReducerAction, ReducerState, useReducer} from 'react';

const useStateCustom = <T>(initialState: T): [T, Dispatch<Partial<T>>] => {
  const [state, setState] = useReducer(
    (preState: T, newState: Partial<T>) => ({
      ...preState,
      ...newState,
    }),
    {...initialState},
    (preState: T) => ({
      ...preState,
    }),
  );
  return [state, setState];
};

export default useStateCustom;
