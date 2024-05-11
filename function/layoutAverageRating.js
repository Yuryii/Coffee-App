import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import Color from '../data/theme/Color';

export default function layoutAverageRating(average_rating, size) {
    let layoutAverageRating;

    if (average_rating === 1) {
        layoutAverageRating = (
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
            </View>
        );
    } else if (average_rating > 1 && average_rating < 2) {
        layoutAverageRating = (
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-half-empty" size={24} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
            </View>
        );
    } else if (average_rating === 2) {
        layoutAverageRating = (
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
            </View>
        );
    } else if (average_rating > 2 && average_rating < 3) {
        layoutAverageRating = (
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-half-empty" size={24} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
            </View>
        );
    } else if (average_rating === 3) {
        layoutAverageRating = (
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
            </View>
        );
    } else if (average_rating > 3 && average_rating < 4) {
        layoutAverageRating = (
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-half-empty" size={24} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
            </View>
        );
    } else if (average_rating === 4) {
        layoutAverageRating = (
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
            </View>
        );
    } else if (average_rating > 4 && average_rating < 5) {
        layoutAverageRating = (
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-half-empty" size={24} color={Color.orangeTextHex} />
            </View>
        );
    } else if (average_rating === 5) {
        layoutAverageRating = (
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star" size={size} color={Color.orangeTextHex} />
            </View>
        );
    }
    else if (average_rating === 0) {
        layoutAverageRating = (
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
                <FontAwesome name="star-o" size={size} color={Color.orangeTextHex} />
            </View>
        );
    }

    return layoutAverageRating;
}