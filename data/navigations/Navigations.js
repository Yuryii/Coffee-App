import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import BeanDetailsScreen from '../screens/BeanDetailsScreen';
import CoffeeDetailsScreen from '../screens/CoffeeDetailsScreen';
import CartScreen from '../screens/CartScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import PaymentScreen from '../screens/PaymentScreen';
import Color from '../theme/Color';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ProductStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="HomeTab" component={MainTab} options={{ headerShown: false }} />
            <Stack.Screen name="BeanDetailScreen" component={BeanDetailsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="CoffeeDetailScreen" component={CoffeeDetailsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="PaymentScreenStack" component={PaymentScreenStack} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

const CartStackStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CardScreen" component={CartScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const FavouriteStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
const OrderHistoryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
const PaymentScreenStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    paddingHorizontal: wp(1),
                    paddingTop: 0,
                    backgroundColor: Color.background,
                    position: 'absolute',
                    borderTopWidth: 0,
                },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeScreen') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                    } else if (route.name === 'CartStackStack') {
                        iconName = focused ? 'shopping-cart' : 'shopping-cart';
                    }
                    else if (route.name === 'FavouriteStack') {
                        iconName = focused ? 'heart' : 'heart';
                    }
                    else if (route.name === 'OrderHistoryStack') {
                        iconName = focused ? 'bell' : 'bell-o';
                    }
                    // You can return any component that you like here!
                    return <FontAwesome name={iconName} size={hp(4)} color={color} />
                },
                tabBarActiveTintColor: Color.orangeTextHex,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="CartStackStack" component={CartStackStack} />
            <Tab.Screen name="FavouriteStack" component={FavouriteStack} />
            <Tab.Screen name="OrderHistoryStack" component={OrderHistoryStack} />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer >
            <Drawer.Navigator>
                <Drawer.Screen name='MainTab' component={ProductStack} options={{ headerShown: false }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}