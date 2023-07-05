import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../../views';
import {RoutesName} from '../../helpers';

const DashboardStack = createStackNavigator();
const DashboardNavigator = ({navigation}) => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <DashboardStack.Screen
        name={RoutesName.DASHBOARD}
        component={Dashboard}
        options={({route}) => ({
          title: 'Home',
          headerBackTitleVisible: false,
        })}
      />
    </DashboardStack.Navigator>
  );
};
export default DashboardNavigator;
