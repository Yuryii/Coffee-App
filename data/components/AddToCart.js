import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const AddToCart = (props) => {
    return (
        <View style={[styles.container]}>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>
                    {props.title}
                </Text>
                <View style={[{ flexDirection: 'row' }]}>
                    <Text style={styles.iconCurrency}>
                        $
                    </Text>
                    <Text style={styles.price}>
                        {props.price}
                    </Text>
                </View>
            </View>
            {/* next */}
            <TouchableOpacity style={styles.addButtonContainer} onPress={props.onPress}>
                <Text style={styles.addText}>
                    {props.textButton}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(8),
    },
    priceContainer: {
        alignItems: 'center'
    },
    priceText: {
        fontWeight: '500',
        fontSize: wp(3.1),
        color: Color.greySubText
    },
    iconCurrency: {
        fontSize: wp(5),
        color: Color.orangeTextHex,
        fontWeight: '500'
    },
    price: {
        fontSize: wp(5),
        fontWeight: '600',
        color: Color.whiteHex,
        paddingLeft: wp(1)
    },
    addButtonContainer: {
        backgroundColor: Color.orangeTextHex,
        width: wp(60),
        borderRadius: wp(5),
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(8)
    },
    addText: {
        color: Color.whiteHex,
        fontSize: wp(4),
        fontWeight: '600'
    }
})
export default AddToCart