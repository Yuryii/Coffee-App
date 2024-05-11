import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import { widthPercentageToDP as wp, heightPercentageToDP as dp } from 'react-native-responsive-screen'
import layoutAverageRating from '../../function/layoutAverageRating'
import HeaderGoBackStack from './HeaderGoBackStack'
const ReviewItem = ( {name, rate, comment}) => {
    const rating = layoutAverageRating(rate, 16)
    return (
        <View style={styles.container}>
            <Text style={[styles.textWhite, {fontSize: 18, fontWeight: '400'}]}>{name}</Text>
            <Text style={styles.textWhite}>{rating}</Text>
            <Text style={styles.textWhite}>{comment}</Text>
        </View>
    )
}

export default ReviewItem

const styles = StyleSheet.create({
    container: {
        gap: wp(2),
        padding: wp(2),
    },
    backgroundGrey: {
        backgroundColor: Color.greyButton,
        borderRadius: wp(5),
    },
    textWhite: {
        color: Color.whiteHex,
        fontSize: 16,
        fontWeight: '300',
    }
})