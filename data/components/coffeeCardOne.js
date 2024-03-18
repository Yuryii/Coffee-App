import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import { LinearGradient } from 'expo-linear-gradient';
import SizeCart from './sizeCart';
import Quantity from './Quantity';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const CoffeeCardOne = ({ image, name, size, price, description }) => {
    return (
        <LinearGradient
            style={styles.container}
            colors={['#252A32', '#0C0F14']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={[styles.headerContainer]}>
                <Image source={image} style={styles.image} />
                <View>
                    <View style={styles.descriptionContainer}>
                        <Text style={[styles.whiteText, styles.name]}>{name}</Text>
                        <Text style={[styles.greySubText, styles.description]}>{description}</Text>
                        <View style={{flexDirection: 'row', gap: 8}}>
                            <View style={styles.buttonSize}>
                                <Text style={[styles.whiteText, { fontSize: hp(2.2) }]}>
                                    {size}
                                </Text>
                            </View>
                            <Text style={[{ color: Color.orangeTextHex, fontSize: hp(2.5), fontWeight: 'bold' }]}>
                                $
                            </Text>
                            <Text style={[styles.whiteText, { fontSize: hp(2.5), fontWeight: '600', }]}>
                                {price}
                            </Text>
                        </View> 
                        <Quantity/>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Color,
        padding: wp(3),
        borderRadius: wp(5),
    },
    whiteText: {
        color: Color.whiteHex
    },
    greySubText: {
        color: Color.greySubText
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5)
    },
    image: {
        width: wp(30),
        height: wp(30),
        borderRadius: wp(6),
    },
    name: {
        fontSize: wp(5),
        fontWeight: '400',
        lineHeight: hp(3)
    },
    description: {
        fontSize: wp(3),
        fontWeight: '400'
    },
    descriptionContainer: {
        gap: hp(1.3)
    },
    buttonSize: {
        backgroundColor: Color.background,
        borderRadius: wp(2.5),
        width: wp(20),
        height: hp(4.3),
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default CoffeeCardOne