import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CoffeeData from '../data/CoffeeData'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Color from '../theme/Color';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddToCart from '../components/AddToCart';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux'
import { addSizeS, addSizeM, addSizeL } from '../../store/addCartToReducer';
const CoffeeDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const coffee = CoffeeData.find(x => x.id === route.params.id)
  const [size, setSize] = useState('S')
  const [price, setPrice] = useState(0)
  const addToCart = () => {
    const idCoffee = coffee.id
    switch(size) {
      case 'S': 
      dispatch(addSizeS({idCoffee}))
      break;
      case 'M': 
      dispatch(addSizeM({idCoffee}))
      break;
      case 'L': 
      dispatch(addSizeL({idCoffee}))
      break;
    }
  }
  const handleChooseSize = (sizez) => {
    size === sizez ? setSize(null) : setSize(sizez)
  }
  useEffect(() => {
    switch(size) {
      case 'S':
        setPrice(coffee.prices[0].price)
        break;
      case 'M':
        setPrice(coffee.prices[1].price)
        break;
      case 'L':
        setPrice(coffee.prices[2].price)
        break;
    }
  },[size])
  return (
    <View style={styles.container}>
      <Image source={coffee.imagelink_portrait} style={{ position: 'absolute' }} />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.button, { marginRight: 285 }]} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={17} color={Color.greyTextHex} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
          <FontAwesome name="heart" size={17} color="#DC3535" />
        </TouchableOpacity>
      </View>
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.name}>{coffee.name}</Text>
            <Text style={[styles.typeText, { fontSize: 12 }]}>{coffee.special_ingredient}</Text>
          </View>
          <View style={styles.typeContainer}>
            <View style={[styles.type, { marginRight: 20 }]}>
              <Fontisto name="coffeescript" size={20} color={Color.orangeTextHex} />
              <Text style={styles.typeText}>{coffee.type}</Text>
            </View>
            <View style={styles.type}>
              <MaterialCommunityIcons name="water" size={29} color={Color.orangeTextHex} />
              <Text style={[styles.typeText, { top: -5 }]}>{coffee.ingredients}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bodyInformation}>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={24} color={Color.orangeTextHex} />
            <Text style={[{ color: Color.whiteHex }]}>{coffee.average_rating}</Text>
            <Text style={[styles.typeText]}>({coffee.ratings_count})</Text>
          </View>
          <View style={[styles.type, { paddingHorizontal: 31, paddingVertical: 17 }]}>
            <Text style={styles.typeText}>{coffee.roasted}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={[{ gap: 5 }]}>
          <Text style={[styles.typeText, { fontSize: 14, fontWeight: '600' }]}>
            Description
          </Text>
          <ScrollView style={[{ height: 57 }]}>
            <Text style={[styles.typeText, { fontSize: hp(1.5), color: Color.whiteHex, fontWeight: '400' }]}>{coffee.description}</Text>
          </ScrollView>
        </View>
        <View style={[{ gap: 5 }]}>
          <Text style={[styles.typeText, { fontSize: 14, fontWeight: '600' }]}>Size</Text>
          <FlatList
            data={coffee.prices}
            renderItem={({ item }) =>
            (
              <TouchableOpacity
                style={[styles.buttonSize, size === item.size ? {borderWidth: 2, borderColor: Color.orangeTextHex} : {    borderWidth: 0, borderColor: Color.background} ]}
                onPress={() => { handleChooseSize(item.size) }}               
              >
                <Text style={[styles.typeText, { fontSize: hp(2) }]}>
                  {item.size}
                </Text>
              </TouchableOpacity>
            )
            }
            scrollEnabled = {false}
            horizontal
            ItemSeparatorComponent={() => (
              <View style={{ width: wp(6) }} />
            )}
          />
        </View>
        <AddToCart title='Price' price={price} textButton='Add to Cart' onPress={addToCart}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  informationContainer: {
    padding: wp(5),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: hp(33)
  },
  headerContainer: {
    flexDirection: 'row',
    padding: wp(6),
    marginTop: 23,
  },
  iconBack: {
    color: 'white',
    fontSize: 20.6
  },
  button: {
    backgroundColor: Color.background,
    borderWidth: 1,
    borderRadius: 11,
    padding: 7
  },
  typeContainer: {
    flexDirection: 'row',
  },
  type: {
    backgroundColor: Color.greyButton,
    padding: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  typeText: {
    color: Color.greySubText,
    fontSize: 10,
    fontWeight: '500',
    fontSize: 10
  },
  name: {
    color: Color.whiteHex,
    fontSize: 20,
    fontWeight: '600'
  },
  bodyInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  bodyContainer: {
    backgroundColor: Color.background,
    gap: 20,
    padding: 18,
  },
  buttonSize: {
    width: wp(25.5),
    height: wp(10),
    backgroundColor: Color.greyButton,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default CoffeeDetailsScreen