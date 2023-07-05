import React from 'react';
import {SplashScreen} from './views';
import {Provider as ReduxProvider} from 'react-redux';
import store from './store';
import Toast, {ToastProvider} from 'react-native-toast-notifications';
const App = () => {
  return (
    <ToastProvider>
      <ReduxProvider store={store}>
        <Toast ref={ref => (global['toast'] = ref)} />
        <SplashScreen />
      </ReduxProvider>
    </ToastProvider>
  );
};

export default App;
