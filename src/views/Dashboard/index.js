import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from '../../components';

const Dashboard = () => {
  return (
    <View style={{height: '100%'}}>
      <Header title={'Home'} />
      <Text>Dashboard</Text>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
