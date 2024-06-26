import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import Quantity from './Quantity'
import { useSelector } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SizeCart = ({size, price, incrementQuantity, decrementQuantity, quantity}) => {
 
    return (
        <View style={styles.container}>
            <View style={styles.size}>
                <Text style={styles.text}>{size}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.text, { color: Color.orangeTextHex, fontWeight: 'bold' }]}>$ </Text>
                <Text style={[styles.text]}>{price}</Text>
            </View>
            <Quantity incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} quantity={quantity}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: wp(4),
        alignItems: 'center',
        justifyContent: 'center'
    },
    size: {
        height: hp(5),
        backgroundColor: Color.background,
        borderRadius: wp(2),
        width: wp(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Color.whiteHex,
        fontSize: hp(2.3),
        fontWeight: '500'
    },

})
export default SizeCart