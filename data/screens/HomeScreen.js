import { View, Text, StyleSheet, Image, StatusBar, ActivityIndicator, SafeAreaView, Button } from 'react-native'
import Color from '../theme/Color';
import { FlatList } from 'react-native-gesture-handler';
import Search from '../components/Search';
import TypeBar from '../components/TypeBar';
import Product from '../components/Product';
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom';
import { useDispatch } from 'react-redux';
import { addCoffeeSize, addBeanSize } from '../../store/addCartToReducer';
import { useEffect } from 'react';
import { fetchDataFromFirebase } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { useUser } from "@clerk/clerk-react";
import { fetchCartFromFirebase } from '../../store/addCartToReducer';
import { fetchUserFromFirebase } from '../../store/userReducer';
import { getFirestore } from "firebase/firestore";
import app from '../firebaseConfig';
import { collection, getDocs, query, where, updateDoc, addDoc, doc } from "firebase/firestore";
import { useState } from 'react';
import { searchItem } from '../../store/rootReducer';
import { setUserEmail } from '../../store/userReducer';
import historyReducer from '../../store/historyReducer';
import { fetchHistoryFromFirebase } from '../../store/historyReducer';
import { updateReviewInFirebase } from '../../store/rootReducer';
const HomeScreen = ({ navigation }) => {
  const data = useSelector(state => state.rootReducer.data)
  // this function will update all review in firebase = [] it just for testing
  const handleUpdateReviewAll = () => {
    const idList = data.map((item) => {
      return item.id
    })
    console.log(JSON.stringify(idList, null, 2))

    dispatch(updateReviewInFirebase(idList))
  }
  // ------------------------------------------------------------
  const historyData = useSelector(state => state.historyReducer.history)
  const newEmail = useSelector(state => state.userReducer.userEmail)
  const money = useSelector(state => state.userReducer.userMoney)
  const dispatch = useDispatch()
  const status = useSelector(state => state.rootReducer.status)
  const coffeeData = useSelector(state => state.rootReducer.coffeData)
  const beanData = useSelector(state => state.rootReducer.beansData)
  const cart = useSelector(state => state.addCartToReducer.cart)
  const { user } = useUser();
  const email = user.primaryEmailAddress.emailAddress;
  const db = getFirestore(app);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const cartCollectionRef = collection(db, 'cart');
    getDocs(query(cartCollectionRef, where('email', '==', email)))
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          let key = '';
          querySnapshot.forEach((doc) => {
            key = doc.id;
          });
          updateDoc(doc(db, 'cart', key), { cart: cart })
            .then(() => { })
            .catch(error => console.error(error));
        } else {
          addDoc(collection(db, 'cart'), { email: email, cart: cart });
        }
      })
      .catch(error => console.error(error));
  }, [cart]);
  useEffect(() => {
    dispatch(fetchDataFromFirebase());
    dispatch(fetchCartFromFirebase(email));
    dispatch(fetchUserFromFirebase(email));
    dispatch(fetchHistoryFromFirebase(email));
  }, [])
  // update cart to firebase when cart change
  useEffect(() => {
    const userRef = collection(db, 'user');
    getDocs(query(userRef, where('email', '==', email)))
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          let key = '';
          querySnapshot.forEach((doc) => {
            key = doc.id;
          })
          updateDoc(doc(db, 'user', key), { email: email, money: money })
            .then(() => {
            })
            .catch(error => console.error(error));
        }
        else if (querySnapshot.empty) {
          addDoc(collection(db, 'user'), { email: email, money: money })
        }
      });
  }, [money]);
  useEffect(() => {
    const userRef = collection(db, 'history');
    getDocs(query(userRef, where('email', '==', email)))
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          let key = '';
          querySnapshot.forEach((doc) => {
            key = doc.id;
          })
          updateDoc(doc(db, 'history', key), { email: email, history: historyData })
            .then(() => {
            })
            .catch(error => console.error(error));
        }
        else if (querySnapshot.empty) {
          addDoc(collection(db, 'history'), { email: email, history: historyData })
        }
      });
  }, [historyData])
  useEffect(() => {
    dispatch(setUserEmail({ email }))
  }, [newEmail])
  const addCoffeeToCart = (idCoffee) => {
    dispatch(addCoffeeSize({ idCoffee, size: 'S' }))
  }
  const addBeanToCart = (idBean) => {
    dispatch(addBeanSize({ idBean, size: '250gm' }))
  }
  const handleChangeText = (text) => {
    setSearchText(text)
    dispatch(searchItem({ text }))
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.background} />
      <HeaderTabNavigationCustom onPress={() => navigation.openDrawer()} />
      <View>
        <Text style={styles.title}>
          Find the best coffee for you
        </Text>
      </View>
      <Search text={searchText} handleChangeText={handleChangeText} />
      <TypeBar />
      {
        status === 'loading' ? <ActivityIndicator size="large" color="#fff" /> :
          <View>
            <View>
              <FlatList
                data={coffeeData}
                renderItem={({ item }) => (
                  <Product
                    name={item.name}
                    rating={item.average_rating}
                    image={item.imageLink_square}
                    ingredient={item.special_ingredients}
                    price={item.price[0].price}
                    onPress={() => navigation.navigate('CoffeeDetailScreen', { id: item.id })}
                    add={() => addCoffeeToCart(item.id)}
                    id={item.id}
                  />
                )}
                keyExtractor={item => item.id}
                horizontal
              />
            </View>
            <Text style={[styles.titleCoffeeBean]}>
              Coffee beans
            </Text>
            <View>
              <FlatList
                data={beanData}
                renderItem={({ item }) => (
                  <Product
                    name={item.name}
                    rating={item.average_rating}
                    image={item.imageLink_square}
                    ingredient={item.special_ingredients}
                    price={item.price[0].price}
                    onPress={() => navigation.navigate('BeanDetailScreen', { id: item.id })}
                    add={() => addBeanToCart(item.id)}
                    id={item.id}
                  />
                )}
                horizontal
                keyExtractor={item => item.id}
              />
            </View>
          </View>
      }
      {/* <View>
        <Button title="Update review" onPress={handleUpdateReviewAll} />
      </View> */}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: Color.background,
    gap: 12
  },
  title: {
    width: '70%',
    fontSize: 28,
    color: Color.whiteHex,
    fontWeight: '500'
  },
  titleCoffeeBean: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
})
export default HomeScreen