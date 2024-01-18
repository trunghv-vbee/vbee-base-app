/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {LocalizationProvider} from 'assets/languages/Translations';
import LoadingComponent from 'components/Loading/LoadingComponent';
import {persistor, store} from 'middleware/stores';
import RootApp from 'navigation/RootApp';
import * as React from 'react';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import 'utils/string-utils';
import RootView from './src/RootView';
import CodePush from 'react-native-code-push';
import LoadingManager from 'components/Loading/LoadingManager';
import {StyleSheet} from 'react-native';

const App = () => {
  const loadingRef: any = React.useRef();
  React.useEffect(() => {
    loadingRef && LoadingManager.register(loadingRef);
    return () => {
      LoadingManager.unregister(loadingRef);
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider>
          <RootView>
            <MenuProvider>
              <RootApp />
              <FlashMessage style={styles.flashMessage} />
            </MenuProvider>
            <LoadingComponent ref={loadingRef} />
          </RootView>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  flashMessage: {paddingTop: 20},
});
let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  //   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: false,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};
export default CodePush(codePushOptions)(App);
