import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom'
const OrderHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderTabNavigationCustom screenName='Order History' />
      <View>
        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
          <Text style={styles.textWhiteTitle}>
            Order Data
          </Text>
          <Text style={styles.textWhiteTitle}>
            Total Amount
          </Text>
        </View>
        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
          <Text style={styles.timeAndPrice}>
            20th March 16:23
          </Text>
          <Text style={[styles.timeAndPrice, {color: Color.orangeTextHex}]}>
            $ 74.40
          </Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    padding: 30,
    gap: 15
  },
  textWhiteTitle: {
    color: Color.whiteHex,
    fontWeight: '600'
  },
  timeAndPrice: {
    fontSize: 14,
    color: Color.whiteHex
  }
})
export default OrderHistoryScreen