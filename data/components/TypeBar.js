import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Color from '../theme/Color'
import TypeName from './TypeName'
import { searchItem } from '../../store/rootReducer'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
const TypeBar = () => {
  const dispatch = useDispatch()
  const coffeeData = useSelector(state => state.rootReducer.coffeeDataSearched)
  useEffect(() => {
    setCoffeeFilter(0)
  }, [])
  // Lọc ra các tên duy nhất từ mảng CoffeeData
  const typeCoffees = [...new Set(coffeeData.map(coffee => coffee.name))]
    .map((name, index) => ({ id: index + 1, name }));
  const typeCofeess = [{ id: 0, name: 'All' }, ...typeCoffees]

  const [coffeeFilter, setCoffeeFilter] = useState(null)
  const handlePress = (id, text) => {
    coffeeFilter === id ? setCoffeeFilter(null) : setCoffeeFilter(id)
    dispatch(searchItem({text}))
  }
  return (
    <View>
      <FlatList
        data={typeCofeess}
        renderItem={({ item }) =>
          <TypeName
            onPress={() => handlePress(item.id, item.name)}
            name={item.name}
            color={coffeeFilter === item.id ? Color.orangeTextHex : Color.greyTextHex}
            colorDot={coffeeFilter === item.id ? Color.orangeTextHex : Color.background} />
        }
        keyExtractor={item => item.id}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      />


    </View>
  )
}

const styles = StyleSheet.create({

})
export default TypeBar