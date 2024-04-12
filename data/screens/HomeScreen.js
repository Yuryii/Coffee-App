import { View, Text, StyleSheet, Image, StatusBar, ActivityIndicator } from 'react-native'
import Color from '../theme/Color';
import { FlatList } from 'react-native-gesture-handler';
import Search from '../components/Search';
import TypeBar from '../components/TypeBar';
import Product from '../components/Product';
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom';
import { useDispatch } from 'react-redux';
import { addSizeS, addSize250gm } from '../../store/addCartToReducer';
import { useEffect, useState } from 'react';
import { fetchDataFromFirebase } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { useUser } from "@clerk/clerk-react";
import { fetchCartFromFirebase } from '../../store/addCartToReducer';
import { getFirestore } from "firebase/firestore";
import app from '../firebaseConfig';
import { collection, getDocs, query, where, updateDoc, addDoc, doc } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const status = useSelector(state => state.rootReducer.status)
  const error = useSelector(state => state.rootReducer.error)
  const coffeeData = useSelector(state => state.rootReducer.coffeData)
  const beanData = useSelector(state => state.rootReducer.beansData)
  const cart = useSelector(state => state.addCartToReducer.cart)
  const { user } = useUser();
  const statusCart = useSelector(state => state.addCartToReducer.statusCart)
  const errorCart = useSelector(state => state.addCartToReducer.errorCart)
  const email = user.primaryEmailAddress.emailAddress;
  const db = getFirestore(app);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    dispatch(fetchDataFromFirebase());
    dispatch(fetchCartFromFirebase(email));
  }, [])

  // Trong component của bạn
  const [docAdded, setDocAdded] = useState(false);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (statusCart === 'succeeded' && !docAdded) {
      console.log('hehe')
      if (check) {
        console.log(statusCart);
        console.log('adding')
        addDoc(collection(db, 'cart'), { email: email, cart: cart })
        console.log('added')
        setDocAdded(true);
      }
    }
  }, [statusCart, docAdded, check]);  // Thêm docAdded vào mảng phụ thuộc
  const addCoffeeToCart = (idCoffee) => {
    dispatch(addSizeS({ idCoffee }))
    const cartCollectionRef = collection(db, 'cart');
    getDocs(query(cartCollectionRef, where('email', '==', email)))
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          let key = '';
          alert('da co email naysan pham trong gio hang');
          querySnapshot.forEach((doc) => {
            const docRef = doc.ref;
            key = doc.id;
          })
          updateDoc(doc(db, 'cart', key), { cart: cart })
            .then(() => {
              console.log('updated');
            })
            .catch(error => console.error(error));
        }
        else if (querySnapshot.empty) {
          setCheck(true);
        }
      });
  }
  const addBeanToCart = (idBean) => {
    dispatch(addSize250gm({ idBean }))
  }
  return (
    <View style={styles.container}>
      <HeaderTabNavigationCustom onPress={() => navigation.openDrawer()} />
      <View>
        <Text style={styles.title}>
          Find the best coffee for you
        </Text>
      </View>
      <Search />
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
                  />
                )}
                horizontal
                keyExtractor={item => item.id}
              />
            </View>
          </View>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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