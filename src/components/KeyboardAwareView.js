import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React from 'react';
  
  const KeyboardAwareView = ({style, children}) => {
    return (
      <KeyboardAvoidingView
        style={style}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoidingView>
    );
  };
  
  export default KeyboardAwareView;
  
  