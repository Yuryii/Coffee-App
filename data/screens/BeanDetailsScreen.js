import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Color from '../theme/Color';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddToCart from '../components/AddToCart';
import { FontAwesome6 } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const CoffeeDetailsScreen = ({ route, navigation }) => {
  const beanData = useSelector(state => state.rootReducer.beansData)
  const coffee = beanData.find(x => x.id === route.params.id)
  const [size, setSize] = useState('250gm')
  const dispatch = useDispatch()
  const handleAddBean = () => {
    const id = coffee.id;
    switch(id)
    {
      case '250gm':
      dispatch(addSize250gm(id))  
      break;
      case '500gm':
      dispatch(addSize1000gm(id))  
      break;
      case '1000gm':
      dispatch(addSize1000gm(id))  
      break;
    }
  }
  const handleChooseSize = (s) => {
    size === s ? setSize(null) : setSize(s)
  }
  const [price, setPrice] = useState(0)
  useEffect(() => {
    switch(size) {
      case '250gm':
        setPrice(coffee.price[0].price)
        break;
      case '500gm':
        setPrice(coffee.price[1].price)
        break;
      case '1000gm':
        setPrice(coffee.price[2].price)
        break;
    }
  },[size])
  return (
    <View style={styles.container}>
      <Image source={{uri: coffee.imageLink_portrait}} style={{ position: 'absolute', width: '100%', height: '61%' }} />
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
            <Text style={[styles.typeText, { fontSize: 12 }]}>{coffee.special_ingredients}</Text>
          </View>
          <View style={styles.typeContainer}>
            <View style={[styles.type, { marginRight: 20 }]}>
              <MaterialCommunityIcons name="fruit-cherries" size={24} color={Color.orangeTextHex} />
              <Text style={styles.typeText}>{coffee.type}</Text>
            </View>
            <View style={styles.type}>
            <FontAwesome6 name="location-dot" size={24} color={Color.orangeTextHex} />
              <Text style={[styles.typeText]}>{coffee.ingredients}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bodyInformation}>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={24} color={Color.orangeTextHex} />
            <Text style={[{ color: Color.whiteHex }]}>{coffee.average_rating}</Text>
            <Text style={[styles.typeText]}>({coffee.ratings_count})</Text>
          </View>
          <View style={[styles.type, { paddingHorizontal: 27, paddingVertical: 17 }]}>
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
            <Text style={[styles.typeText, { fontSize: 12, color: Color.whiteHex, fontWeight: '400' }]}>{coffee.description}</Text>
          </ScrollView>
        </View>
        <View style={[{ gap: 5 }]}>
          <Text style={[styles.typeText, { fontSize: 14, fontWeight: '600' }]}>Size</Text>
          <FlatList
            data={coffee.price}
            renderItem={({ item }) =>
            (
              <TouchableOpacity
                style={[styles.buttonSize, size === item.size ? {borderWidth: 2, borderColor: Color.orangeTextHex} : {    borderWidth: 0, borderColor: Color.background} ]}
                onPress={() => { handleChooseSize(item.size) }}               
              >
                <Text style={[styles.typeText, { fontSize: 16 }]}>
                  {item.size}
                </Text>
              </TouchableOpacity>
            )
            }
            scrollEnabled={false}
            horizontal
            ItemSeparatorComponent={() => (
              <View style={{ width: 25 }} />
            )}
          />
        </View>
        <AddToCart title='Price' textButton='Add to Cart' price={price} onPress={handleAddBean}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  informationContainer: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 269,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
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
    padding: 9,
    width: 99,
    backgroundColor: Color.greyButton,
    borderRadius: 10,
    alignItems: 'center'
  }
})
export default CoffeeDetailsScreen