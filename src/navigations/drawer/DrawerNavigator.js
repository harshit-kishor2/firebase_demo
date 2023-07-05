import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from './DrawerContent';
import DashboardNavigator from '../stack/DashboardNavigator';
import {RoutesName} from '../../helpers';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition={'left'}
      drawerType={'slide'}
      // edgeWidth={10}
      // drawerStyle={{
      //     width: Metrices.drawerWidth,
      // }}
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'grey',
          width: '70%',
        },
      }}>
      <Drawer.Screen
        name={RoutesName.DASHBOARD_NAVIGATOR}
        component={DashboardNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
