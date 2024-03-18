import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../theme/Color';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const HeaderTabNavigationCustom = (props) => {
  return (
    <View style={styles.header} >
        <TouchableOpacity onPress={props.onPress}><AntDesign name="menu-fold" size={wp(6)} color="white" /></TouchableOpacity>
        <Text style={styles.text}>{props.screenName}</Text>
        <Image style={{ width: wp(7), height: wp(7), borderRadius: wp(2) }} source={require('../images/app_images/avatar.png')}></Image>
      </View>
  )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      text: {
        color: Color.whiteHex,
        fontSize: hp(2.5),
        fontWeight: '600'
      }
})
export default HeaderTabNavigationCustom