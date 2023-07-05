import {DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View, Pressable, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Container, CustomIcon, CustomText, ICON_TYPE} from '../../components';
import NavigationService from '../NavigationService';
import {AppConst} from '../../helpers';
import {logoutAction} from '../../store/auth.slice';

const DrawerContent = props => {
  const {navigation, authReducer, onLogoutAction} = props;

  const onLogoutClick = () =>
    Alert.alert('Do you want to Log out?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('Logout');
          onLogoutAction().then(res => {
            console.log(res, 'Logout');
          });
        },
      },
    ]);

  return (
    <Container useSafeAreaView={true} style={styles.containerView}>
      <View style={styles.userInfoSection}>
        <View style={styles.profile_view}>
          <CustomIcon
            origin={ICON_TYPE.ICONICONS}
            name={'logo-github'}
            size={82}
            color={'red'}
          />
        </View>
        <CustomText text={authReducer?.userDetails?.email ?? 'test'} />
        <Pressable onPress={() => NavigationService.closeDrawer()}>
          <CustomIcon
            origin={ICON_TYPE.ANT_ICON}
            name={'closecircleo'}
            size={30}
            color={'red'}
          />
        </Pressable>
      </View>
      <View style={{flex: 1}}>
        <DrawerItem
          icon={() => (
            <CustomIcon
              origin={ICON_TYPE.ANT_ICON}
              name={'logout'}
              color={'white'}
              size={20}
            />
          )}
          labelStyle={{
            color: 'white',
            fontSize: 18,
          }}
          label={`Logout`}
          onPress={() => {
            NavigationService.closeDrawer();
            onLogoutClick();
          }}
        />
      </View>
      <DrawerItem
        labelStyle={{
          color: 'white',
        }}
        label={`Version ${AppConst.VERSION}`}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {authReducer: state.authReducer};
};

const mapDispatchToProps = dispatch => ({
  onLogoutAction: params => dispatch(logoutAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 25,
  },
  profile_view: {
    height: 82,
    width: 82,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 41,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoSection: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: '#FFFFFF4D',
    borderBottomWidth: 1,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerView: {flex: 1, backgroundColor: '#FF9F1C'},
});
