import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom'
const FavouriteScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderTabNavigationCustom screenName='Favourite'/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    padding: 30
  }
})
export default FavouriteScreen