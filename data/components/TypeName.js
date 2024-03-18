import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
const TypeName = (props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.typeCoffee, {color: props.color}]} onPress={props.onPress}>{props.name}</Text>
      <View style={[{height: 8, width: 8, borderRadius: 8, backgroundColor: props.colorDot, marginTop: 4}]}></View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    typeCoffee: {
        color: Color.greyTextHex,
      }
})
export default TypeName