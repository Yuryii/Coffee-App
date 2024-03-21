import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../theme/Color';

const Payment2 = ({ prices, image, name, isSelected, onPress }) => {
    return (
        <TouchableOpacity style={isSelected ? styles.selected : null} onPress={onPress}>
            <LinearGradient style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#252A32', '#0C0F14']}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={image} style={{ width: wp(8), height: hp(3.8) }} />
                    <Text style={styles.text}>{name}</Text>
                </View>
                <Text style={styles.text}>{prices}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: wp(3),
        borderRadius: wp(10),
        flexDirection: 'row',
        paddingHorizontal: wp(4),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: Color.whiteHex,
        fontSize: wp(4),
        paddingLeft: wp(3)
    },
    selected: {
        borderColor: Color.orangeTextHex,
        borderWidth: 1,
        borderRadius: wp(10),
    }
})
export default Payment2