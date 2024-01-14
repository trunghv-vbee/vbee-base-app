import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'assets/colors';
import HomeScreen from 'screens/home/HomeScreen';
import CustomTab from 'navigation/CustomTab';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/src/types';
import Routes from 'navigation/service/Routes';

const Tab = createBottomTabNavigator();
const MainTab = memo(() => {
  const renderCustomTab = (props: BottomTabBarProps) => (
    <CustomTab {...props} />
  );
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={renderCustomTab}>
        <Tab.Screen name={Routes.HomeScreen} component={HomeScreen} />
      </Tab.Navigator>
    </View>
  );
});

export default MainTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
