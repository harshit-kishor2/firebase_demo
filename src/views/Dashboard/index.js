import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Spacer} from '../../components';
import CustomText from './../../components/CustomText';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);

  const renderFlatList = ({item, index}) => {
    return (
      <View style={styles.list_container} key={index}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item?.image}} style={styles.image} />
        </View>
        <View style={styles.title}>
          <CustomText
            style={{fontSize: 16}}
            text={
              item?.title.length <= 50
                ? item.title
                : item.title.slice(0, 50) + '...'
            }
          />
          <CustomText
            style={{fontSize: 15, color: '#0007'}}
            text={`Rating : ${item?.rating?.rate} (${item?.rating?.count})`}
          />
        </View>
        <View style={styles.priceContainer}>
          <CustomText style={{fontSize: 18}} text={'$' + item?.price} />
        </View>
      </View>
    );
  };
  const renderEmptyList = () => {
    return (
      <View style={styles.emptylist}>
        <CustomText text={'No Data Found'} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header title={'Home'} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist_container}
        data={products}
        renderItem={renderFlatList}
        ListEmptyComponent={renderEmptyList}
        ItemSeparatorComponent={Spacer}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {height: '100%'},
  flatlist_container: {
    flexGrow: 1,
    paddingBottom: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  emptylist: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  list_container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    height: 100,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  imageContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  priceContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
