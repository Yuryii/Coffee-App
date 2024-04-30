import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Color from '../theme/Color'
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom'
import HistoryItem from '../components/HistoryItem'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { removeCheckedHistory } from '../../store/historyReducer'
import { addCheckedHistory } from '../../store/historyReducer'
const OrderHistoryScreen = () => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const historyData = useSelector(state => state.historyReducer.history)
  const handleDeleteAllHistory = () => {
    dispatch(removeCheckedHistory());
  }
  const handleSelectAll = () => {
    historyData.forEach((item) => {
      item.history.forEach((historyItem) => {
        dispatch(addCheckedHistory({ id: historyItem.id }));
      })
    }
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.background} />
      <HeaderTabNavigationCustom screenName='Order History' />
      <View >
        {
          historyData.length > 0
            ?
            !isEdit
              ?
              <TouchableOpacity onPress={() => setEdit(!isEdit)} style={{ flexDirection: 'row-reverse' }}>
                <Text style={{ color: Color.orangeTextHex, fontSize: 16, fontWeight: '600' }}>Edit</Text>
              </TouchableOpacity>
              :
              <View onPress={() => setEdit(!isEdit)} style={{ flexDirection: 'row', gap: widthPercentageToDP(15), alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={handleSelectAll}>
                  <Text style={{ color: Color.orangeTextHex, fontSize: 16, fontWeight: '600' }}>Select All</Text>
                </TouchableOpacity>
                <Text style={{ color: Color.orangeTextHex, fontSize: 20, fontWeight: '600', marginBottom: 30 }}>Select Items</Text>
                <TouchableOpacity onPress={() => setEdit(!isEdit)}>
                  <Text style={{ color: Color.orangeTextHex, fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                </TouchableOpacity>
              </View>

            :
            <Text style={[styles.textWhiteTitle, { textAlign: 'center', fontSize: 16 }]}>No Order History</Text>
        }
      </View>
        <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
          data={historyData}
          renderItem={({ item }) =>
            <HistoryItem date={item.date} history={item.history} onEdit={isEdit} />
          }
        />
        {historyData.length > 0
          ?
          isEdit
          &&
          <TouchableOpacity onPress={handleDeleteAllHistory} style={{ alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 10, backgroundColor: Color.orangeTextHex, marginBottom: 30 }}>
            <Text style={{ color: Color.whiteHex, fontSize: 20 }}>Delete</Text>
          </TouchableOpacity>
          :
          null
        }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    padding: 30,
    paddingTop: 0,
    gap: 15,

  },
  textWhiteTitle: {
    color: Color.whiteHex,
    fontWeight: '600'
  },
  timeAndPrice: {
    fontSize: 14,
    color: Color.whiteHex
  }
})
export default OrderHistoryScreen