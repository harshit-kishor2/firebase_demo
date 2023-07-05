import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RoutesName} from '../../helpers';
import {LoginScreen, RegisterScreen} from '../../views';

const RootStack = createStackNavigator();
const RootStackNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name={RoutesName.LOGIN} component={LoginScreen} />
      <RootStack.Screen name={RoutesName.REGISTER} component={RegisterScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
