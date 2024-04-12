import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CoffeeData from '../data/CoffeeData'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Color from '../theme/Color';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddToCart from '../components/AddToCart';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';

const FavouriteProduct = () => {
    return (
        <View style={[styles.container]}>
            <Image source={require('../images/coffee_assets/americano/portrait/americano_pic_1_portrait.png')} style={{ position: 'absolute', width: wp(90), borderRadius: wp(10), height: hp(67),  }} />
            <View style={styles.informationContainer}>
                <View style={styles.titleContainer}>
                    <View>
                        <Text style={styles.name}>Cappuccino</Text>
                        <Text style={[styles.typeText, { fontSize: 12 }]}>With stemed Mild</Text>
                    </View>
                    <View style={styles.typeContainer}>
                        <View style={[styles.type, { marginRight: 20 }]}>
                            <Fontisto name="coffeescript" size={20} color={Color.orangeTextHex} />
                            <Text style={styles.typeText}>Coffee</Text>
                        </View>
                        <View style={styles.type}>
                            <MaterialCommunityIcons name="water" size={29} color={Color.orangeTextHex} />
                            <Text style={[styles.typeText, { top: -5 }]}>Milk</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bodyInformation}>
                    <View style={styles.ratingContainer}>
                        <AntDesign name="star" size={24} color={Color.orangeTextHex} />
                        <Text style={[{ color: Color.whiteHex }]}>4.5</Text>
                        <Text style={[styles.typeText]}>6.879</Text>
                    </View>
                    <View style={[styles.type, { paddingHorizontal: 31, paddingVertical: 17 }]}>
                        <Text style={styles.typeText}>Medium Roast</Text>
                    </View>
                </View>
            </View>
            <LinearGradient style={styles.bodyContainer} colors={['#252A32', '#0C0F14']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={[{ gap: 5 }]}>
                    <Text style={[styles.typeText, { fontSize: 14, fontWeight: '600' }]}>
                        Description
                    </Text>
                    <ScrollView style={[{ height: 57 }]}>
                        <Text style={[styles.typeText, { fontSize: hp(1.5), color: Color.whiteHex, fontWeight: '400' }]}>Description Text</Text>
                    </ScrollView>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    informationContainer: {
        padding: wp(5),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: hp(33),
        width: wp(90),
    },
    typeContainer: {
        flexDirection: 'row',
    },
    type: {
        backgroundColor: Color.greyButton,
        padding: 6,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    typeText: {
        color: Color.greySubText,
        fontSize: 10,
        fontWeight: '500',
        fontSize: 10
    },
    name: {
        color: Color.whiteHex,
        fontSize: 20,
        fontWeight: '600'
    },
    bodyInformation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    bodyContainer: {
        gap: 20,
        padding: 18,
        borderBottomLeftRadius: wp(10),
        borderBottomRightRadius: wp(10),
        width: wp(90),
    },

})

export default FavouriteProduct;
