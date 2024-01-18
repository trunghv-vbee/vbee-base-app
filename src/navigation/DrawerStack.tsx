import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSideBar from 'components/Layout/SideBar/CustomSideBar';
import Routes from 'navigation/service/Routes';
import {DrawerContentComponentProps} from '@react-navigation/drawer/src/types';
import menus from 'navigation/service/menus';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  const renderCustomDrawer = (props: DrawerContentComponentProps) => (
    <CustomSideBar {...props} />
  );
  return (
    <Drawer.Navigator
      drawerContent={renderCustomDrawer}
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 100,
        drawerType: 'back',
        drawerStyle: {
          width: '100%',
        },
      }}
      initialRouteName={Routes.HomeScreen}>
      {menus.map(menu => {
        return (
          <Drawer.Screen
            key={menu.route}
            name={menu.route}
            component={menu.component}
          />
        );
      })}
    </Drawer.Navigator>
  );
};

export default DrawerStack;
