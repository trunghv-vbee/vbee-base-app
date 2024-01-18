import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {authReducer} from './persist/AuthReducers';
import commonReducer from 'middleware/reducers/non_persist/CommonReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSetup = {
  key: 'root',
  storage: AsyncStorage,
};

export default combineReducers({
  auth: persistReducer(authSetup, authReducer),
  common: commonReducer,
});
