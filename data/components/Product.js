import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import Color from '../theme/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import rootReducer from '../../store/rootReducer';
const Product = ({  image, name, ingredient, price, onPress, add, id }) => {
  const data = useSelector(state => state.rootReducer.data)
  const product = data.find(item => item.id === id)
  const average_rating = product.review.reduce((acc, item) => acc + item.rate, 0) / product.review.length

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#252A32', '#0C0F14']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.ratingContainer} >
          <AntDesign name="star" size={10} color={Color.orangeTextHex} style={{ marginLeft: 8 }} />
          <Text style={[styles.rating, styles.text]}>{!average_rating ? 0 : average_rating}</Text>
        </View>
        <Text style={[styles.name, styles.text]}>
          {name}
        </Text>
        <Text style={[styles.ingredient, styles.text]}>
          {ingredient}
        </Text>
        <View style={styles.addProduct}>
          <View style={styles.priceContainer}>
            <Text style={[styles.iconPrice]}>
              $
            </Text>
            <Text style={[styles.price, styles.text]}>
              {price}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={add}>
              <View style={styles.iconAdd}>
                <Text style={[styles.text, styles.icon]}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  text: {
    color: Color.whiteHex
  },
  container: {
    padding: 12,
    borderRadius: 23,
    gap: 6,
    marginRight: 17
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    left: 64,
    top: 12,
    borderBottomLeftRadius: 26,
    borderTopEndRadius: 20,
    padding: 4,
    width: 48.5,
    backgroundColor: '#000000',
    opacity: 0.7
  },
  rating: {
    fontWeight: '500',
    fontSize: 10
  },
  image: {
    width: 100, height: 100, borderRadius: 16
  },
  name: {
    fontSize: 13
  },
  ingredient: {
    fontWeight: '400',
    fontSize: 9
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconPrice: {
    marginRight: 4,
    color: Color.orangeTextHex,
    fontSize: 15,
    fontWeight: 'bold'
  },
  price: {

  },
  addProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconAdd: {
    backgroundColor: Color.orangeTextHex,
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  icon: {
    fontSize: 25,
    top: -2.5,
    fontWeight: '400'
  }
})
export default Product