import { View, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import HeaderGoBackStack from '../components/HeaderGoBackStack';
import Color from '../theme/Color';
import VisaCard from '../components/VisaCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Payment from '../components/Payment';
import Payment2 from '../components/Payment2';
import AddToCart from '../components/AddToCart';

const PaymentScreen = ({ navigation }) => {
  const [payment, setPayment] = useState('Visa')
  const handlePress = (name) => {
    setPayment(name)
  }
  return (
    <View style={styles.container}>
      <HeaderGoBackStack name='Payment' onPressBackButton={() => navigation.goBack()} />
      <VisaCard onPress={() => handlePress('Visa')} isSelected={payment === 'Visa'}/>
      <View style={styles.paymentsContainer}>
        <Payment icon='wallet' name='Wallet' prices='$ 100.50' onPress={() => handlePress('Wallet')} isSelected={payment === 'Wallet'}/>
        <Payment2 image={require('../images/app_images/gpay.png')} name='Google Pay' onPress={() => handlePress('GooglePay')} isSelected={payment === 'GooglePay'} />
        <Payment2 image={require('../images/app_images/applepay.png')} name='Apple Pay' onPress={() => handlePress('ApplePay')} isSelected={payment === 'ApplePay'} />
        <Payment2 image={require('../images/app_images/amazonpay.png')} name='Amazone' onPress={() => handlePress('Amazon')} isSelected={payment === 'Amazon'} />
      </View>
      <View style={{marginTop: hp(5)}}>
        <AddToCart title='Price' price='4.20' textButton='Pay from Credit Card' />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
    padding: wp(8),
    gap: hp(4),
    justifyContent: 'space-between'
  },
  paymentsContainer: {
    gap: hp(1.7)
  }
})
export default PaymentScreen