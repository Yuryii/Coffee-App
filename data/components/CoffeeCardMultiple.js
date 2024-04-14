import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import { LinearGradient } from 'expo-linear-gradient';
import SizeCart from './sizeCart';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';

const CoffeeCardMultiple = ({ image, name, roasted, ingredient, sizes, onDelete }) => {
    const data = sizes;
    const rightSwipe = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 25 }}>
                <TouchableOpacity>
                    <AntDesign name="delete" size={60} color="white" />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <Swipeable renderRightActions={rightSwipe} onSwipeableOpen={onDelete }>
            <LinearGradient
                style={styles.container}
                colors={['#252A32', '#0C0F14']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={[styles.headerContainer]}>
                    <TouchableOpacity >
                        <Image source={{ uri: image }} style={styles.image} />
                    </TouchableOpacity>
                    <View>
                        <View style={styles.descriptionContainer}>
                            <Text style={[styles.whiteText, styles.name]}>{name}</Text>
                            <Text style={[styles.greySubText, styles.description]}>{ingredient}</Text>
                            <View style={[styles.roastedContainer]}>
                                <Text style={[styles.greySubText, styles.roasted]}>
                                    {roasted}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <FlatList
                    style={styles.sizesContainer}
                    data={data}
                    renderItem={({ item }) => <SizeCart size={item.size} price={item.price} style={styles.sizeContainer} />}
                    keyExtractor={item => item.size + item.price}
                    ItemSeparatorComponent={() => (<View style={{ height: 6 }}></View>)}
                    scrollEnabled={false}
                />
            </LinearGradient>
        </Swipeable>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Color,
        padding: wp(3),
        borderRadius: wp(7),

    },
    whiteText: {
        color: Color.whiteHex
    },
    greySubText: {
        color: Color.greySubText
    },
    roastedContainer: {
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6)
    },
    image: {
        width: wp(28),
        height: wp(28),
        borderRadius: wp(5)
    },
    name: {
        fontSize: wp(5),
        fontWeight: '400',
        lineHeight: wp(8)
    },
    description: {
        fontSize: wp(3),
        fontWeight: '400'
    },
    descriptionContainer: {
        gap: wp(2.5)
    },
    roastedContainer: {
        padding: wp(3),
        backgroundColor: Color.greyButton,
        borderRadius: wp(3)
    },
    roasted: {
        fontSize: wp(3),
        fontWeight: '500'
    },
    sizeContainer: {
        alignSelf: 'center'
    },
    sizesContainer: {
        marginTop: hp(1.5)
    }
})
export default CoffeeCardMultiple