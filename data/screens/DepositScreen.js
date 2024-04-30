import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../theme/Color';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { addMoney } from '../../store/userReducer';
import { FontAwesome } from '@expo/vector-icons';

const DepositScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [money, setMoney] = useState('')
    const handleDeposit = () => {
        dispatch(addMoney({ money: money }))
    }
    return (
        <View style={styles.container}>
            <HeaderTabNavigationCustom screenName="Deposit" onPress={() => navigation.openDrawer()} />
            <View style={styles.depositContainer}>
                <Text style={{ color: Color.whiteHex, fontSize: wp(4), textAlign: 'center', width: '100%' }}>Enter the amount you wish to deposit</Text>
                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Color.whiteHex, padding: wp(2), borderRadius: wp(5) }}>
                    <TextInput
                        placeholderTextColor={Color.whiteHex}
                        placeholder="0"
                        keyboardType="numeric"
                        style={{ color: Color.whiteHex, fontSize: 20, width: '70%', marginLeft: 10 }}
                        value={money}
                        onChangeText={setMoney} />
                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <FontAwesome name="usd" size={24} color={Color.orangeTextHex} />
                    </View>
                </View>
                <TouchableOpacity onPress={handleDeposit}>
                    <Text style={{ backgroundColor: Color.orangeTextHex, padding: wp(3), borderRadius: 10, textAlign: 'center', marginTop: wp(5), color: Color.whiteHex, fontSize: 20 }}>Deposit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DepositScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
        padding: wp(5),
    },
    depositContainer: {
        marginTop: hp(20),
        padding: wp(5),
        borderRadius: 10,
    }
})