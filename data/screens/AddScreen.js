import { StyleSheet, Text, View, Image, ActivityIndicator, ToastAndroid } from 'react-native'
import React from 'react'
import Color from '../theme/Color'
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom';
import app from '../firebaseConfig';
const AddScreen = ({ navigation }) => {
    const db = getFirestore(app);
    const storage = getStorage();
    const [imageSquare, setImageSquare] = useState(null);
    const [imagePortrait, setImagePortrait] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const pickImage = async (image) => {
        // No permissions request is necessary for launching the image library
        let result;
        if (image === 'square') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });
        }
        else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [5, 7],
                quality: 1,
            });
        }
        if (!result.canceled) {
            image === 'square' ? setImageSquare(result.assets[0].uri) : setImagePortrait(result.assets[0].uri);
        }
    };
    handleSubmitAdd = async (values) => {
        if (!imageSquare && !imagePortrait) {
            setIsLoading(true);
            const docRef = await addDoc(collection(db, "Product"), values);
            setIsLoading(false);
            ToastAndroid.show('Product Added', ToastAndroid.SHORT)
            return;
        }
        setIsLoading(true);
        const s = await fetch(imageSquare)
        const file = await s.blob()
        const storageRef = ref(storage, 'coffee/imageSquare' + Date.now() + '.jpg');
        const p = await fetch(imagePortrait)
        const file2 = await p.blob()
        const storageRef2 = ref(storage, 'coffee/imagePortrait' + Date.now() + '.jpg');
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        await uploadBytes(storageRef2, file2).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        await getDownloadURL(storageRef).then((url) => {
            values.imageLink_square = url
        });
        await getDownloadURL(storageRef2).then((url) => {
            values.imageLink_portrait = url
        });
        values.imageLink_square = await getDownloadURL(storageRef)
        values.imageLink_portrait = await getDownloadURL(storageRef2)
        console.log(values)
        // add values to firebase
        const docRef = await addDoc(collection(db, "Product"), values);
        ToastAndroid.show('Product Added', ToastAndroid.SHORT)
        setIsLoading(false);
    }
    return (
        <View style={styles.container}>
            <HeaderTabNavigationCustom screenName="Add" onPress={() => navigation.openDrawer()} />
            <Formik
                initialValues=
                {{
                    name: '',
                    description: '',
                    roasted: '',
                    imageLink_square: '',
                    imageLink_portrait: '',
                    ingredients: '',
                    special_ingredients: '',
                    price: [
                        { size: '', price: '' },
                        { size: '', price: '' },
                        { size: '', price: '' },
                    ],
                    average_rating: '0',
                    ratings_count: '0',
                    type: '',
                }}
                onSubmit={(values) => {
                    handleSubmitAdd(values)
                    console.log(values)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <ScrollView >
                        <View style={styles.container}>
                            <Text style={[styles.titleText, { textAlign: 'center', fontSize: 24, color: Color.orangeTextHex }]}>AddScreen</Text>
                            <View style={styles.imageContaienr}>
                                <View style={{ gap: 10 }}>
                                    <Text style={styles.titleText}>Image Square</Text>
                                    <View style={styles.imageItemContainer}>
                                        <Image style={styles.image} source={{ uri: imageSquare }} />
                                        <TouchableOpacity onPress={() => pickImage('square')}>
                                            <AntDesign name="addfile" size={40} color={Color.orangeTextHex} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ gap: 10 }}>
                                    <Text style={styles.titleText}>Image Portrait</Text>
                                    <View style={styles.imageItemContainer}>
                                        <Image style={styles.image} source={{ uri: imagePortrait }} />
                                        <TouchableOpacity onPress={() => pickImage('portrait')}>
                                            <AntDesign name="addfile" size={40} color={Color.orangeTextHex} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    value={values.price[0].size}
                                    onChangeText={handleChange('price[0].size')}
                                    onBlur={handleBlur('price[0].size')}
                                    placeholder='Size'
                                    style={[styles.input, { width: '48%' }]}
                                    placeholderTextColor={Color.greySubText}
                                />
                                <TextInput
                                    value={values.price[0].price}
                                    onChangeText={handleChange('price[0].price')}
                                    onBlur={handleBlur('price[0].price')}
                                    placeholder='Price'
                                    style={[styles.input, { width: '48%' }]}
                                    placeholderTextColor={Color.greySubText}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    value={values.price[1].size}
                                    onChangeText={handleChange('price[1].size')}
                                    onBlur={handleBlur('price[1].size')}
                                    placeholder='Size'
                                    style={[styles.input, { width: '48%' }]}
                                    placeholderTextColor={Color.greySubText}
                                />
                                <TextInput

                                    value={values.price[1].price}
                                    onChangeText={handleChange('price[1].price')}
                                    onBlur={handleBlur('price[1].price')}
                                    placeholder='Price'
                                    style={[styles.input, { width: '48%' }]}
                                    placeholderTextColor={Color.greySubText}
                                />

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    value={values.price[2].size}
                                    onChangeText={handleChange('price[2].size')}
                                    onBlur={handleBlur('price[2].size')}
                                    placeholder='Size'
                                    style={[styles.input, { width: '48%' }]}
                                    placeholderTextColor={Color.greySubText}
                                />
                                <TextInput
                                    value={values.price[2].price}
                                    onChangeText={handleChange('price[2].price')}
                                    onBlur={handleBlur('price[2].price')}
                                    placeholder='Price'
                                    style={[styles.input, { width: '48%' }]}
                                    placeholderTextColor={Color.greySubText}
                                />
                            </View>
                            <TextInput
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                placeholder='Name'
                                style={styles.input}
                                placeholderTextColor={Color.greySubText}
                            />
                            <TextInput
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                placeholder='Description'
                                style={styles.input}
                                placeholderTextColor={Color.greySubText}
                            />
                            <TextInput
                                value={values.roasted}
                                onChangeText={handleChange('roasted')}
                                onBlur={handleBlur('roasted')}
                                placeholder='Roasted'
                                style={styles.input}
                                placeholderTextColor={Color.greySubText}
                            />
                            <TextInput
                                value={values.ingredients}
                                onChangeText={handleChange('ingredients')}
                                onBlur={handleBlur('ingredients')}
                                placeholder='Ingredients'
                                style={styles.input}
                                placeholderTextColor={Color.greySubText}
                            />
                            <TextInput
                                value={values.special_ingredients}
                                onChangeText={handleChange('special_ingredients')}
                                onBlur={handleBlur('special_ingredients')}
                                placeholder='Special Ingredients'
                                style={styles.input}
                                placeholderTextColor={Color.greySubText}
                            />
                            <TextInput
                                value={values.type}
                                onChangeText={handleChange('type')}
                                onBlur={handleBlur('type')}
                                placeholder='Type'
                                style={styles.input}
                                placeholderTextColor={Color.greySubText}
                            />
                            {
                                isloading
                                    ?
                                    <View style={styles.button}>
                                        <ActivityIndicator size="large" color={Color.whiteHex} />
                                    </View>
                                    :
                                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                        <Text style={styles.titleText}>Submit</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </ScrollView>
                )}
            </Formik>
        </View>
    )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.background,
        flex: 1,
        padding: 15,
        gap: 15
    },
    titleText: {
        color: Color.whiteHex,
        fontSize: 20
    },
    imageContaienr: {
        borderColor: Color.whiteHex,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 15,
        justifyContent: 'center',
        gap: 15,
        flexDirection: 'row',
    },
    imageItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Color.whiteHex,
        padding: 15,
        color: Color.whiteHex,
        fontSize: 20
    },
    button: {
        backgroundColor: Color.orangeTextHex,
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})