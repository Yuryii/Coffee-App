import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../theme/Color'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const VisaCard = (props) => {
  return (
    <TouchableOpacity style={[styles.container, props.isSelected ? styles.selected : null]} onPress={props.onPress}>
      <View >
        <Text style={[styles.titleCard, styles.mainText]}>Credit Card</Text>
      </View>
      <LinearGradient style={styles.cartContainer} colors={['#252A32', '#0C0F14']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.flexRowAndJustifyCenter}>
          <MaterialCommunityIcons name="integrated-circuit-chip" size={wp(9)} color={Color.orangeTextHex} />
          <Fontisto name="visa" size={wp(8)} color={Color.whiteHex} />
        </View>
        <Text style={styles.mainText}>3 8 9 7   8 9 2 3   6 7 4 5   4 6 3 8</Text>
        <View>
          <View style={styles.flexRowAndJustifyCenter}>
            <Text style={styles.subText}>
              Card Holder Name
            </Text>
            <Text style={styles.subText}>Expiry Date</Text>
          </View>
          <View style={styles.flexRowAndJustifyCenter}>
            <Text style={styles.mainText}>Robert Evans</Text>
            <Text style={styles.mainText}>02/30</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: hp(1.5),
    padding: wp(3)
  },
  cartContainer: {
    borderRadius: wp(5),
    gap: hp(4),
    padding: wp(6)
  },
  mainText: {
    fontSize: wp(4),
    color: Color.whiteHex,
    fontWeight: '500'
  },
  subText: {
    fontSize: wp(3),
    color: Color.greySubText
  },
  cardContainer: {

  },
  titleCard: {

  },
  flexRowAndJustifyCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selected: {
    borderColor: Color.orangeTextHex,
    borderWidth: 1,
    borderRadius: wp(6),
}
})
export default VisaCard