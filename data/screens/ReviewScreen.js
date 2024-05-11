import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Color from '../theme/Color'
import HeaderGoBackStack from '../components/HeaderGoBackStack'
import { widthPercentageToDP as wp, heightPercentageToDP as dp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import { Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { FlatList, Switch, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import rootReducer from '../../store/rootReducer'
import { updateRevieww } from '../../store/rootReducer'
import { fetchDataFromFirebase } from '../../store/rootReducer'
import { resetStatusReview, resetErrorReview } from '../../store/rootReducer'
const ReviewScreen = ({ navigation, route }) => {
  const statusReview = useSelector(state => state.rootReducer.statusReview)
  const dispatch = useDispatch();
  const data = useSelector(state => state.rootReducer.data)
  const emailName = useSelector(state => state.userReducer.userEmail)
  const product = data.find(item => item.id === route.params.id)
  const [rate, setRate] = useState([])
  const [level, setLevel] = useState('Not Rated')
  const handleSend = () => {
    if (isShowName) {
      dispatch(updateRevieww({ idProduct: product.id, review: { rate: rate.length, comment: text, name: emailName } }))
    }
    else {
      dispatch(updateRevieww({ idProduct: product.id, review: { rate: rate.length, comment: text, name: 'Anonymous participants' } }))
    }
  }

useEffect(() => {
  if (statusReview === 'succeeded') {
    navigation.goBack();
    dispatch(fetchDataFromFirebase());
    dispatch(resetStatusReview());
  }
}, [statusReview]);
  const handleLevel = () => {
    switch (rate.length) {
      case 0:
        setLevel('Not Rated')
        break;
      case 1:
        setLevel('Terrible')
        break;
      case 2:
        setLevel('Unsatisfactory')
        break;
      case 3:
        setLevel('Average')
        break;
      case 4:
        setLevel('Satisfactory')
        break;
      case 5:
        setLevel('Excellent')
        break;
      default:
        break;
    }
  }
  const handleRateStar = (index) => {
    if (rate.includes(index)) {
      setRate(rate.filter(item => item !== index))
      return;
    }
    setRate([...rate, index])
  }
  useEffect(() => {
    handleLevel()
  }, [rate])
  const startList = [0, 1, 2, 3, 4]
  const [isShowName, setShowName] = useState(true)
  const toggleSwitch = () => setShowName(previousState => !previousState);
  const [text, setText] = useState('')
  return (
    <View style={styles.container}>
      <View>
        <HeaderGoBackStack onPressBackButton={() => navigation.goBack()} name={'Review'} />
      </View>
      <View style={[styles.row, { gap: 15, alignItems: 'center' }]}>
        <Image source={{ uri: product.imageLink_square }} style={styles.image} />
        <Text style={styles.textWhiteContent}>{product.name}</Text>
      </View>
      <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={[styles.textWhiteTitle, []]}>Product Quality</Text>
        <View>
          <FlatList
            data={startList}
            renderItem={({ item, index }) =>
              <TouchableOpacity onPress={() => handleRateStar(index)}>
                {rate.includes(index) ? <AntDesign name="star" size={24} color={Color.orangeTextHex} /> : <AntDesign name="staro" size={24} color={Color.orangeTextHex} />}
              </TouchableOpacity>
            }
            horizontal
          />
        </View>
        <Text style={styles.textGreyTitle}>{level}</Text>
      </View>
      <View style={{ padding: 10, borderRadius: wp(1), height: dp(20), borderWidth: 1, borderColor: Color.greySubText, backgroundColor: Color.greyButton }}>
        <TextInput
          style={{ color: Color.whiteHex, fontSize: 16, }}
          placeholder='Please share a review for this product !'
          placeholderTextColor={Color.greySubText}
          value={text}
          onChangeText={setText}
          multiline
        />
      </View>
      <View style={styles.row}>
        <View style={{ width: wp(70) }}>
          <Text style={[styles.textWhiteTitle,]}>Show User Name for this review</Text>
          <Text style={[styles.textGreyTitle, { width: wp(80), fontSize: 14 }]}>Your name will be displayed as the {emailName} of this review</Text>
        </View>
        <Switch
          style={{ width: wp(15) }}
          trackColor={{ false: Color.greySubText, true: '#81b0ff' }}
          thumbColor={isShowName ? Color.orangeTextHex : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isShowName}
        />
      </View>
      <View style={{ alignSelf: 'center' }}>
        {
          statusReview === 'loading'
            ?
            <ActivityIndicator size="large" color={Color.orangeTextHex} />
            :
            <TouchableOpacity
              onPress={handleSend}
              style={{ backgroundColor: Color.orangeTextHex, alignItems: 'center', padding: wp(3), borderRadius: wp(3), width: wp(90) }}>
              <Text style={{ fontSize: 16, color: Color.whiteHex, }}>Send</Text>
            </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default ReviewScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
    padding: wp(4),
    gap: wp(5)
  },
  textWhiteTitle: {
    color: Color.whiteHex,
    fontWeight: '400',
    fontSize: 16
  },
  textGreyTitle: {
    color: Color.greySubText,
    fontWeight: '400',
    fontSize: 16,
    width: wp(26)
  },
  textWhiteContent: {
    color: Color.whiteHex,
    fontWeight: '300',
    fontSize: 16
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(2)
  },
  row: {
    flexDirection: 'row'
  },
})