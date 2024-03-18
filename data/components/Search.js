import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import { AntDesign } from '@expo/vector-icons';
const Search = () => {
    return (
        <View style={styles.search}>
            <AntDesign name="search1" size={20} color={Color.greyTextHex} />
            <TextInput multiline placeholder='Find Your Coffee...' style={styles.searchText} placeholderTextColor={Color.greyTextHex}></TextInput>
        </View>
    )
}
const styles = StyleSheet.create({
    search: {
        padding: 10,
        height: 45,
        borderRadius: 15,
        backgroundColor: Color.greyHex,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchText: {
        color: Color.greyTextHex,
        width: '88%',
    }
})
export default Search