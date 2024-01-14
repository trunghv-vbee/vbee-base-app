import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTab from 'navigation/MainTab';
import CustomSideBar from 'components/Layout/SideBar/CustomSideBar';
import Routes from 'navigation/service/Routes';
import {DrawerContentComponentProps} from '@react-navigation/drawer/src/types';
import HomeScreen from 'screens/home/HomeScreen';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  const renderCustomDrawer = (props: DrawerContentComponentProps) => (
    <CustomSideBar {...props} />
  );
  return (
    <Drawer.Navigator
      drawerContent={renderCustomDrawer}
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.HomeScreen}>
      <Drawer.Screen name={Routes.HomeScreen} component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
