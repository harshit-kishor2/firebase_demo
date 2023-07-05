import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomText = ({style, text}) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});
