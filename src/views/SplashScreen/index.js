import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import SplashView from './SplashView';
import Navigator from '../../navigations/Navigator';
import {stayLoginAction} from '../../store/auth.slice';

const SplashScreen = props => {
  const {checkIsLoggedInUser} = props;

  const [isSplashEnd, setIsSplashEnd] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashEnd(true);
    }, 3000);
    checkIsLoggedInUser();
  }, []);

  return isSplashEnd ? <Navigator /> : <SplashView />;
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  checkIsLoggedInUser: () => dispatch(stayLoginAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
