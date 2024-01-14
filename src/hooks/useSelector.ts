import isEqual from 'react-fast-compare';
import {useSelector as useReduxSelector} from 'react-redux';
import {RootReducer} from 'model/redux/Reducer';
export function useSelector<T>(
  selector: (state: RootReducer) => T,
  equalityFn = isEqual,
): T {
  const state = useReduxSelector<RootReducer, RootReducer>(x => x, equalityFn);
  return selector(state);
}
