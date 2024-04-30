import { View, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import HeaderGoBackStack from '../components/HeaderGoBackStack';
import Color from '../theme/Color';
import VisaCard from '../components/VisaCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Payment from '../components/Payment';
import Payment2 from '../components/Payment2';
import AddToCart from '../components/AddToCart';
import { useSelector } from 'react-redux';
import { subtractMoney } from '../../store/userReducer';
import { useDispatch } from 'react-redux';
import { deleteAllCart } from '../../store/addCartToReducer';
import { addHistory } from '../../store/historyReducer';

const PaymentScreen = ({ navigation, route }) => {
  const date = new Date();
  const formatDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const hrs = date.getHours();
    const min = date.getMinutes();

    const suffix = day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';

    return `${day}${suffix} ${month} ${hrs}:${min}`;
  };

  const email = useSelector(state => state.userReducer.userEmail)
  const cart = useSelector(state => state.addCartToReducer.cart)
  const dispatch = useDispatch()
  const totalPrice = route.params.price
  const money = useSelector(state => state.userReducer.userMoney)
  const [payment, setPayment] = useState('Visa')
  const handlePress = (name) => {
    setPayment(name)
  }
  const handlePay = () => {
    if (money < totalPrice) {
      alert('You do not have enough money')
      return
    }
    dispatch(subtractMoney({ totalPrice: totalPrice }))
    
    dispatch(addHistory({ history: { history: cart, date: formatDate()}, email: email}))
    dispatch(deleteAllCart())
    navigation.navigate('HomeScreen');
  }
  return (
    <View style={styles.container}>
      <HeaderGoBackStack name='Payment' onPressBackButton={() => navigation.goBack()} />
      <VisaCard onPress={() => handlePress('Visa')} isSelected={payment === 'Visa'} />
      <View style={styles.paymentsContainer}>
        <Payment icon='wallet' name='Wallet' amount={money} onPress={() => handlePress('Wallet')} isSelected={payment === 'Wallet'} />
        <Payment2 image={require('../images/app_images/gpay.png')} name='Google Pay' onPress={() => handlePress('GooglePay')} isSelected={payment === 'GooglePay'} />
        <Payment2 image={require('../images/app_images/applepay.png')} name='Apple Pay' onPress={() => handlePress('ApplePay')} isSelected={payment === 'ApplePay'} />
        <Payment2 image={require('../images/app_images/amazonpay.png')} name='Amazone' onPress={() => handlePress('Amazon')} isSelected={payment === 'Amazon'} />
      </View>
      <View style={{ marginTop: hp(5) }}>
        <AddToCart
          title='Price'
          price={totalPrice}
          textButton='Pay from Credit Card'
          onPress={handlePay}
        />
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