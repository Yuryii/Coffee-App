import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import { AntDesign } from '@expo/vector-icons';
const PaymentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { marginRight: 285 }]} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={17} color={Color.greyTextHex} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
    padding: 20
  },
  button: {
    backgroundColor: '#21262E',
    borderWidth: 1,
    borderRadius: 11,
    padding: 7,
    alignItems: 'center',
    width: 35
  },
})
export default PaymentScreen