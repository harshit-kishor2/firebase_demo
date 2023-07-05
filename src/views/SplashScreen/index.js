import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import SplashView from './SplashView';
import Navigator from '../../navigations/Navigator';

const SplashScreen = props => {
  const {checkIsLoggedInUser} = props;

  const [isSplashEnd, setIsSplashEnd] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashEnd(true);
    }, 3000);
    // checkIsLoggedInUser();
  }, []);

  return isSplashEnd ? <Navigator /> : <SplashView />;
};

const mapStateToProps = state => {
  return {
    staticDataReducer: state.staticDataReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  checkIsLoggedInUser: () => dispatch(stayLoginAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
