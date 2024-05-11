import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Color from '../theme/Color'
import { widthPercentageToDP as wp, heightPercentageToDP as dp } from 'react-native-responsive-screen'
import ReviewItem from '../components/reviewItem'
import { FlatList } from 'react-native-gesture-handler'
import layoutAverageRating from '../../function/layoutAverageRating'
import { Image } from 'react-native'
import HeaderGoBackStack from '../components/HeaderGoBackStack'
const AllReviewScreen = ({ route, navigation }) => {
  const data = useSelector(state => state.rootReducer.data)
  const product = data.find(item => item.id === route.params.id)
  console.log(product.review)
  const average_rating = product.review.reduce((acc, item) => acc + item.rate, 0) / product.review.length
  const rating = layoutAverageRating(!average_rating ? 0 : average_rating, 24)
  return (
    <View style={styles.container}>
      <HeaderGoBackStack onPressBackButton={() => navigation.goBack()} name={'Reviews'}/>
      <View style={[styles.row, styles.gap, {marginTop: wp(5)}]}>
        <Image source={{ uri: product.imageLink_square }} style={{ width: wp(10), height: wp(10) }} />
        <Text style={styles.textWhiteTitle}>{product.name}</Text>
      </View>
      <View style={styles.row}>
        {rating}
        <Text style={styles.textWhite}>{!average_rating ? 0 : average_rating}/5</Text>
        <Text style={styles.textWhite}>{product.review.length} (reviews)</Text>
      </View>
      <View style={styles.backgroundGrey}>
        <FlatList
          ItemSeparatorComponent={() =>
            <View style={{
              height: wp(3),
              borderBottomWidth: 1,
              borderColor: Color.greySubText,
              width: '90%',
              alignSelf: 'center' // Add this line
            }}
            />}
          data={product.review}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) =>
            <ReviewItem
              name={item.name}
              rate={item.rate}
              comment={item.comment}
            />
          }
        />
      </View>
    </View>
  )
}

export default AllReviewScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    padding: wp(4),
    gap: wp(3)
  },
  backgroundGrey: {
    backgroundColor: Color.greyButton,
    borderRadius: wp(1),
  },
  textWhite: {
    color: Color.whiteHex,
    fontSize: 16,
    fontWeight: '400',
  },
  textWhiteTitle: {
    color: Color.whiteHex,
    fontSize: 24,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  gap: {
    gap: wp(3),
  }
})