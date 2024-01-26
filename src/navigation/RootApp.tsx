// In App.js in a new project

import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import LinkingConfiguration from 'navigation/service/LinkingConfiguration';
import * as React from 'react';
import 'react-native-gesture-handler';
import RootStack from './RootStack';
import {isReadyRef, navigationRef} from './service/RootNavigation';
import colors from 'assets/colors';

import {NavigationContainer} from '@react-navigation/native';

function RootApp() {
  useReduxDevToolsExtension(navigationRef);
  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: colors.transparent,
          background: colors.primary,
          card: colors.transparent,
          text: colors.primary,
          border: colors.transparent,
          notification: colors.transparent,
        },
        dark: true,
      }}
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
