import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Color from '../theme/Color'
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HeaderGoBackStack = ({ name, onPressBackButton }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button]} onPress={onPressBackButton}>
                <AntDesign name="arrowleft" size={17} color={Color.greyTextHex} />
            </TouchableOpacity>
            <Text style={{ color: Color.whiteHex, fontSize: wp(6), fontWeight: '600', width: wp(55),  }}>
                {name}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.background,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#21262E',
        borderWidth: 1,
        borderRadius: 11,
        padding: 7,
        alignItems: 'center',
        width: 35
    },
})
export default HeaderGoBackStack