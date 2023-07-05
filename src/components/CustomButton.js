import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, title, disable}) => {
  const styles = useStyles(disable);
  return (
    <Pressable
      onPress={disable ? null : onPress}
      style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const useStyles = disable =>
  StyleSheet.create({
    appButtonContainer: {
      backgroundColor: disable ? '#00968890' : '#009688',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    appButtonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
      alignSelf: 'center',
      textTransform: 'uppercase',
    },
  });
