import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Color from '../theme/Color'
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import { addCheckedHistory } from '../../store/historyReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import rootReducer from '../../store/rootReducer';
import userReducer from '../../store/userReducer';
// ...

const HistoryItem = ({ date, history, onEdit }) => {
    const email = useSelector(state => state.userReducer.userEmail);
    const data = useSelector(state => state.rootReducer.data);
    const isReviewed = (id) => { 
        const product = data.find(item => item.id === id);
        const index = product.review.findIndex(item => item.name === email);
        console.log(index)
        return  index === -1 ? true : false;
    }
    const dispatch = useDispatch();
    const checkedItems = useSelector(state => state.historyReducer.deleteHistory);

    const handleChecked = (id, date) => {
        dispatch(addCheckedHistory({ id: id, date: date }));
    }
    const isChecked = (id, date) => {
        const indexDate = checkedItems.findIndex(item => item.date === date);
        if (indexDate === -1) {
            return false;
        } else {
            return checkedItems[indexDate].id.includes(id);
        }
    }
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View>
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <Text style={styles.textWhiteTitle}>
                        Order Data
                    </Text>
                    <Text style={styles.textWhiteTitle}>
                        Total Amount
                    </Text>
                </View>
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <Text style={styles.textWhiteTitle}>
                        {date}
                    </Text>
                    <Text style={{ color: Color.orangeTextHex }}>
                        $ {history.reduce((acc, item) => acc + item.price.reduce((acc, item) => acc + item.price * item.quantity, 0), 0)}
                    </Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={history}
                    ItemSeparatorComponent={() => <View style={{ height: hp(2) }} />}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', gap: wp(5) }}>
                            {onEdit && <Checkbox value={isChecked(item.id, date)} onValueChange={() => handleChecked(item.id, date)} />}
                            <TouchableOpacity onPress={() => navigation.navigate('AllReviewScreen', { id: item.id })}>
                                <LinearGradient
                                    style={styles.itemContainer}
                                    colors={['#252A32', '#0C0F14']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}>
                                    <View style={styles.headerContainer}>
                                        <View style={{ flexDirection: 'row', gap: wp(4), alignItems: 'center' }}>
                                            <Image source={{ uri: item.imageLink_square }} style={styles.image} />
                                            <View>
                                                <Text style={{ color: 'white', fontSize: 20, fontWeight: '400' }}>{item.name}</Text>
                                                <Text style={{ color: 'white', fontWeight: '300', fontSize: wp(3) }}>{item.special_ingredients}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row, { gap: wp(1), width: wp(12) }]}>
                                            <Text style={{ color: Color.orangeTextHex, fontSize: wp(5), fontWeight: 'bold' }}>$</Text>
                                            <Text style={{ fontSize: wp(5), color: 'white', fontWeight: '500' }}>
                                                {item.price.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <FlatList
                                            data={item.price}
                                            ItemSeparatorComponent={() => <View style={{ height: hp(1) }} />}
                                            renderItem={({ item }) =>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(10), }}>
                                                    <View style={{ flexDirection: 'row', gap: wp(1), }}>
                                                        <View style={{ alignItems: 'center', backgroundColor: Color.background, height: hp(5), width: wp(15), borderTopLeftRadius: wp(4), borderBottomLeftRadius: wp(4), justifyContent: 'center' }}>
                                                            <Text style={{ fontSize: item.size.length > 1 ? wp(3.5) : wp(5), color: 'white', fontWeight: '500' }}>{item.size}</Text>
                                                        </View>
                                                        <View style={{ alignItems: 'center', backgroundColor: Color.background, height: hp(5), width: wp(25), borderTopRightRadius: wp(4), borderBottomRightRadius: wp(4), justifyContent: 'center' }}>
                                                            <View style={[styles.row, { alignItems: 'center', gap: wp(1) }]}>
                                                                <Text style={{ color: Color.orangeTextHex, alignItems: 'center', fontSize: wp(5), fontWeight: 'bold' }}>$</Text>
                                                                <Text style={{ fontSize: wp(5), color: 'white', fontWeight: '500' }}>{item.price}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(1) }}>
                                                        <Text style={{ color: Color.orangeTextHex }}>
                                                            X
                                                        </Text>
                                                        <Text style={styles.textWhiteTitle}>
                                                            {item.quantity}
                                                        </Text>
                                                    </View>
                                                    <Text style={{ color: Color.orangeTextHex, width: wp(12) }}>
                                                        {item.price * item.quantity}
                                                    </Text>
                                                </View>
                                            }
                                        />
                                    </View>
                                    {
                                        isReviewed(item.id) &&
                                        <View>
                                            <Text style={{ color: Color.whiteHex, textAlign: 'center' }}>We warmly welcome your feedback to help us enhance the quality of our product and service !</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: wp(7) }}>
                                                <TouchableOpacity 
                                                    onPress={() => navigation.navigate('AllReviewScreen', { id: item.id })}
                                                style={{ backgroundColor: Color.whiteHex, alignItems: 'center', padding: wp(3), borderRadius: wp(3), width: wp(34) }}>
                                                    <Text style={{ fontSize: 16, color: 'black', }}>All Review</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{ backgroundColor: Color.orangeTextHex, alignItems: 'center', padding: wp(3), borderRadius: wp(3), width: wp(34) }}
                                                    onPress={() => navigation.navigate('ReviewScreen', { id: item.id })}
                                                >
                                                    <Text style={{ fontSize: 16, color: Color.whiteHex, }}>Evaluate</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        gap: wp(3),
    },
    itemContainer: {
        borderRadius: wp(2),
        borderRadius: wp(5),
        padding: wp(4),
        gap: hp(1.5)
    },
    textWhiteTitle: {
        color: Color.whiteHex,
        fontWeight: '600',
        fontSize: wp(5)
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: wp(18),
        height: wp(18),
        borderRadius: wp(5)
    },
    row: {
        flexDirection: 'row'
    },
})
export default HistoryItem