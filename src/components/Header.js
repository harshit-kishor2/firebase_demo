import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {CustomIcon, ICON_TYPE} from './CustomIcon';

const Header = ({title, showBackBtn = false, showNotif = true}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerView}>
      <View style={styles.DrawerIcon}>
        {showBackBtn ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CustomIcon
              origin={ICON_TYPE.ICONICONS}
              name="md-chevron-back"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <CustomIcon
              origin={ICON_TYPE.MATERIAL_COMMUNITY}
              name="menu"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.DashboardText}>
        <Text style={styles.Dashboard}>{title}</Text>
      </View>
      <View style={styles.NotificationIcon}>
        {showNotif ? (
          <TouchableOpacity>
            <CustomIcon
              origin={ICON_TYPE.ICONICONS}
              name="notifications-outline"
              size={35}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    height: Platform.OS === 'ios' ? 100 : 65,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  Dashboard: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  DashboardText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  NotificationIcon: {
    alignSelf: 'center',
  },
  DrawerIcon: {
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
