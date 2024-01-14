import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import loggerMiddleware from 'middleware/enhancers/logger';
import {useDispatch} from 'react-redux';
import rootReducer from 'middleware/reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'middleware/reducers/rootSaga';

// Setup Middlewares
const sagaMiddleware = createSagaMiddleware();
// Create Store
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .prepend(sagaMiddleware)
      .concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

sagaMiddleware.run(rootSaga);

// Setup Store persistence
// @ts-ignore
let persistor = persistStore(store);

export {store, persistor};
