import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import Color from '../theme/Color';
import { FlatList } from 'react-native-gesture-handler';
import Search from '../components/Search';
import TypeBar from '../components/TypeBar';
import Product from '../components/Product';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeanData';
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom';
import { useDispatch } from 'react-redux';
import { addSizeS, addSize250gm } from '../../store/addCartToReducer';
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const addCoffeeToCart = (idCoffee) => {
    dispatch(addSizeS({idCoffee}))
  }
  const addBeanToCart = (idBean) => {
    dispatch(addSize250gm({idBean}))
  }
  return (
    <View style={styles.container}>
      <HeaderTabNavigationCustom onPress={() => navigation.openDrawer()} />
      <View>
        <Text style={styles.title}>
          Find the best coffee for you
        </Text>
      </View>
      <Search />
      <TypeBar />
      <View>
        <FlatList
          data={CoffeeData}
          renderItem={({ item }) => (
            <Product
              name={item.name}
              rating={item.average_rating}
              image={item.imagelink_square}
              ingredient={item.special_ingredient}
              price={item.prices[0].price}
              onPress={() => navigation.navigate('CoffeeDetailScreen', { id: item.id })}
              add={() => addCoffeeToCart(item.id)}
            />
          )}
          keyExtractor={item => item.index}
          horizontal
        />
      </View>
      <Text style={[styles.titleCoffeeBean]}>
        Coffee beans
      </Text>
      <View>
        <FlatList
          data={BeansData}
          renderItem={({ item }) => (
            <Product
              name={item.name}
              rating={item.average_rating}
              image={item.imagelink_square}
              ingredient={item.special_ingredient}
              price={item.prices[0].price}
              onPress={() => navigation.navigate('BeanDetailScreen', { id: item.id })}
              add={() => addBeanToCart(item.id)}
            />
          )}
          horizontal
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.background,
    gap: 12
  },
  title: {
    width: '70%',
    fontSize: 28,
    color: Color.whiteHex,
    fontWeight: '500'
  },
  titleCoffeeBean: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
})
export default HomeScreen