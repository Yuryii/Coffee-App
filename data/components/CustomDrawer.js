import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Color from '../theme/Color';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-expo";
import {useDispatch} from 'react-redux';
import { resetState } from '../../store/addCartToReducer';

const CustomDrawer = (props) => {
    const dispatch = useDispatch();
    const { isLoaded, signOut } = useAuth();
    const handleSignOut = async () => {
        await signOut();
        dispatch(resetState())
    }
    if (!isLoaded) {
        return null;
    }

    const { user } = useUser();
    const name = user.fullName;
    const image = user.imageUrl;
    return (
        <View style={{ flex: 1, backgroundColor: Color.background }}>
            <LinearGradient
                colors={['#252A32', '#0C0F14']}
                style={{ padding: 15, paddingTop: 40 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }} >
                <View style={{ gap: 10 }}>
                    <Image
                        source={{ uri: image }}
                        style={{ width: 90, height: 90, borderRadius: 90 / 2 }}
                    />
                    <Text style={{ color: 'white' }}>
                        {name}
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Text style={{ color: 'white' }}>280 Coins</Text>
                        <FontAwesome6 name="coins" size={24} color={Color.orangeTextHex} />
                    </View>
                </View>
            </LinearGradient>
            <DrawerContentScrollView {...props} >
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={{ borderColor: Color.whiteHex, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 50, padding: 10, alignContent: 'space-between' }}>
                <View >
                    <TouchableOpacity onPress={handleSignOut} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="logout" size={24} color="white" />
                        <Text style={{ color: 'white', paddingLeft: 8 }}>Sign Out</Text>
                    </TouchableOpacity >
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="setting" size={24} color="white" />
                    <Text style={{ color: 'white', paddingLeft: 8 }}>Setting</Text>
                </View>
            </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({})