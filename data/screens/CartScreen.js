import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom'
import CoffeeCardMultiple from '../components/CoffeeCardMultiple'
import CoffeeCardOne from '../components/coffeeCardOne'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import AddToCart from '../components/AddToCart';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux'
const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.addCartToReducer.cart)
  console.log(cart)
  return (
    <View style={styles.container}>
      <HeaderTabNavigationCustom screenName='Cart' />
      {/*  */}

      <FlatList
        data={cart}
        renderItem={({ item }) => (
          item.prices.length > 1
            ?
            <CoffeeCardMultiple 
            sizes={item.prices} 
            image={item.imagelink_square}
            name={item.name}
            ingredient={item.special_ingredient}
            roasted={item.roasted}
            />
            :
            <CoffeeCardOne
              name={item.name}
              description={item.special_ingredient}
              size={item.prices[0].size}
              image={item.imagelink_square}
              price={item.prices[0].price} />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={{ height: 20 }}></View>
        )
        }
      />
      <AddToCart title='Total Price' price='10.40' textButton='Pay' onPress={() => navigation.navigate('PaymentScreenStack')} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    padding: wp(5),
    gap: 20
  }
})
export default CartScreen