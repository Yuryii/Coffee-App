import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom'
import FavouriteComponent from '../components/FavouriteProduct'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler'
// import {useSelector} from 'react-redux'
// import {useDispatch} from 'react-redux'
// import {addSizeS, addSizeM, addSizeL} from '../../store/addCartToReducer'
const FavouriteScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: hp(3) }}><HeaderTabNavigationCustom screenName='Favourite' /></View>
      <ScrollView>
        <FavouriteComponent />
        <FavouriteComponent />
        <FavouriteComponent />
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    padding: wp(5),
    paddingTop: 0,
    gap: hp(2)
  }
})
export default FavouriteScreen