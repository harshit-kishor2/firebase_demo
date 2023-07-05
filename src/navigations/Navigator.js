import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {isMountedRef, navigationRef} from './NavigationService';
import RootStackNavigator from './stack/RootStackNavigator';
import {connect, useSelector} from 'react-redux';
import {isAuthenticate} from '../store/auth.slice';
import DrawerNavigator from './drawer/DrawerNavigator';

const Navigator = props => {
  const {isAuthenticated} = props;
  console.log('Data', isAuthenticated);

  //
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? <DrawerNavigator /> : <RootStackNavigator />}
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer?.isAuthenticate,
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
