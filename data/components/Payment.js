import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome5 } from '@expo/vector-icons';
import Color from '../theme/Color';

const Payment = ({ amount, name, icon, onPress, isSelected }) => {
    return (
        <TouchableOpacity onPress={onPress} style={isSelected ? styles.selected : null}>
            <LinearGradient style={[styles.container,]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#252A32', '#0C0F14']}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name={icon} size={wp(7)} color={Color.orangeTextHex} />
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>{amount}</Text>
                    <Text style={{ color: Color.orangeTextHex, fontSize: 11, alignSelf: 'flex-end' }}>  đ</Text>
                </View>
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
export default Payment