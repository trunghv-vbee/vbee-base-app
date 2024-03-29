import DrawerStack from 'navigation/DrawerStack';
import React, {memo} from 'react';
import SplashScreen from 'screens/splash/SplashScreen';
import LoginScreen from 'screens/auth/LoginScreen';
import Routes from 'navigation/service/Routes';
import {createStackNavigator} from '@react-navigation/stack';
import ImagePreviewScreen from 'screens/common/Image/ImagePreviewScreen';
import {MainParamList} from 'navigation/service/NavigationParams';

const Stack = createStackNavigator<MainParamList>();

const RootStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.SplashScreen}>
      <Stack.Screen component={LoginScreen} name={Routes.LoginScreen} />
      <Stack.Screen component={DrawerStack} name={Routes.DrawerStack} />
      <Stack.Screen component={SplashScreen} name={Routes.SplashScreen} />
      <Stack.Screen
        component={ImagePreviewScreen}
        name={Routes.ImagePreviewScreen}
      />
    </Stack.Navigator>
  );
});

export default RootStack;
