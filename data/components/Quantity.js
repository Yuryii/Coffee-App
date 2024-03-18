import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Color from '../theme/Color'
import { TextInput } from 'react-native-gesture-handler'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Quantity = () => {
    const [quantity, setQuantity] = useState(1)
    const incrementQuantity = () => {

        setQuantity(quantity + 1)
    }
    const decrementQuantity = () => {
        if (quantity === 1) {
            alert('xoa size nay')
        }
        else {
            setQuantity(quantity - 1)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={decrementQuantity} style={styles.buttonSize}>
                <Text style={[styles.text,]}>-</Text>
            </TouchableOpacity>
            <View style={[styles.quantityCotainter]}>
                <TextInput value={quantity.toString()}
                    onChangeText={(value) => {
                        if (!isNaN(value) && parseInt(value) >= 1) {
                            setQuantity(parseInt(value));
                        }
                    }} style={[styles.text, {alignItems: 'center'}]} keyboardType='numeric' ></TextInput>
            </View>
            <TouchableOpacity onPress={incrementQuantity} style={[styles.buttonSize]}>
                <Text style={[styles.text]}>+</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: wp(4),
        alignItems: 'center',
    },
    buttonSize: {
        backgroundColor: Color.orangeTextHex,
        borderRadius: wp(1.4),
        width: wp(8),
        alignItems: 'center',
        justifyContent: 'center',
        height: wp(7),
        alignItems: 'center',
        justifyContent: 'center'
    },
    quantityCotainter: {
        backgroundColor: Color.background,
        width: wp(15),
        height: wp(8),
        borderRadius: wp(2),
        borderWidth: 1, borderColor: Color.orangeTextHex,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Color.whiteHex,
        fontSize: hp(2.3),
        fontWeight: '500'
    }
})
export default Quantity