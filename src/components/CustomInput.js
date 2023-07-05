import React, {Component} from 'react';
import {TextInput, View, Text} from 'react-native';
import CustomText from './CustomText';

const CustomInput = ({
  label,
  placeholder,
  onChangeText,
  onBlur,
  value,
  error,
  errorText,
  keyboardType,
  returnKeyType,
  secureTextEntry,
}) => {
  const {inputStyle, labelStyle, containerStyle} = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        style={inputStyle}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {error && errorText && (
        <CustomText
          style={{marginBottom: 5, color: 'red'}}
          text={errorText}></CustomText>
      )}
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#333',
    fontSize: 16,
    lineHeight: 23,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
  },
  labelStyle: {
    fontSize: 18,
    color: '#737373',
    paddingBottom: 10,
    position: 'relative',
  },
  containerStyle: {
    flexDirection: 'column',
    margin: 10,
  },
};

export default CustomInput;
