import React from 'react';
import {View, SafeAreaView} from 'react-native';
import Metrices from '../helpers/Metrices';

const isIos = Metrices.isIos;

const Container = ({children, useSafeAreaView, style, ...other}) => {
  const Element = useSafeAreaView && isIos ? SafeAreaView : View;
  return (
    <Element
      style={[{flex: 1, width: '100%', backgroundColor: '#fff'}, style]}
      {...other}>
      {children}
    </Element>
  );
};

export default Container;
