// In App.js in a new project

import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import {NavigationContainer} from '@react-navigation/native';
import LinkingConfiguration from 'navigation/service/LinkingConfiguration';
import * as React from 'react';
import 'react-native-gesture-handler';
import RootStack from './RootStack';
import {isReadyRef, navigationRef} from './service/RootNavigation';

function RootApp() {
  useReduxDevToolsExtension(navigationRef);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      onReady={() => {
        isReadyRef.current = true;
      }}
      ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
}

export default RootApp;
