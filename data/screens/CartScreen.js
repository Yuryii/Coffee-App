import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Color from '../theme/Color'
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom'
import CoffeeCardMultiple from '../components/CoffeeCardMultiple'
import CoffeeCardOne from '../components/coffeeCardOne'
import { FlatList } from 'react-native-gesture-handler'
import AddToCart from '../components/AddToCart';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux'
import { useState } from 'react'
const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.addCartToReducer.cart)
  const status = useSelector((state) => state.addCartToReducer.statusCart)
  const error = useSelector((state) => state.addCartToReducer.errorCart)
  const [totalPrice, setTotalPrice] = useState(0)
  // total price cart
  useEffect(() => {
    let totalPrice = 0;
     cart.forEach((item) => {
         item.price.forEach((price) => {
           console.log('price.price' + price.price)
           totalPrice += parseFloat(price.price)
       })
     })
    console.log(totalPrice)
    totalPrice = totalPrice.toFixed(2)
    setTotalPrice(totalPrice)
    console.log(JSON.stringify(cart, null, 2))
  }, [cart])
  return (
    <View style={styles.container}>
      <HeaderTabNavigationCustom screenName='Cart' />
      {/*  */}

      <FlatList
        data={cart}
        renderItem={({ item }) => (
          item.price.length > 1
            ?
            <CoffeeCardMultiple
              sizes={item.price}
              image={item.imageLink_square}
              name={item.name}
              ingredient={item.special_ingredients}
              roasted={item.roasted}
            />
            :
            <CoffeeCardOne
              name={item.name}
              description={item.special_ingredients}
              size={item.price[0].size}
              image={item.imageLink_square}
              price={item.price[0].price} />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={{ height: 20 }}></View>
        )
        }
      />
      <AddToCart title='Total Price' price={totalPrice} textButton='Pay' onPress={() => cart.length === 0 ? alert('123') : navigation.navigate('PaymentScreen', { price: totalPrice })} />
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