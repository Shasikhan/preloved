import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import routes from "../navigation/routes";
import listingsApi from '../api/listings';
import ActivityIndicator from '../components/ActivityIndicator';
import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import Button from "../components/Button";
import useApi from "../hooks/useApi";


function ListingsScreen({ navigation }) {


  const [lists, setLists] = useState(null);
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLists = async () => {
    try {
      const list = [];
      await firestore()
        .collection('lists')
        .orderBy('listTime', 'desc')
        .get()
        .then((querySnapshot) => {

          setSize(querySnapshot.docs.length);
          console.log('Total Lists: ', querySnapshot.docs.length);

          querySnapshot.forEach((doc) => {
            const { userId, listTitle, listImg, listTime, listTime2, listDesc, listPrice, listCategory } = doc.data();
            list.push({
              id: doc.id,
              userId,
              listTitle,
              listImg,
              listTime,
              listTime2,
              listDesc,
              listPrice,
              listCategory,
              size: querySnapshot.docs.length
            });
          });
        });

      setLists(list);

      setError(false);
      if (loading) {
        setLoading(false);
      }

      console.log('Lists: ', list);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  useEffect(() => {
    fetchLists();
    navigation.setOptions({
      headerRight: () => (
        <Button title='Refresh' onPress={() => fetchLists()} />
      ),
    });
    setRefreshing(false);
  }, []);


  return (
    <Screen style={styles.screen}>
      { error && (
        <>
          <AppText>Couldn't retrive the data.</AppText>
          <Button title='Retry' onPress={() => fetchLists()} />
        </>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        data={lists}
        keyExtractor={(listing) => listing.id}
        // initialNumToRender={10}
        // windowSize={5}
        //maxToRenderPerBatch={5}
        // updateCellsBatchingPeriod={30}
        // removeClippedSubviews={false}
        numColumns={3}
        renderItem={({ item }) => (
          <>

            <Card
              title={item.listTitle}
              subTitle={"$" + item.listPrice}
              //imageUrl={item.listImg}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item, size)}
            />
          </>
        )}

        //onEndReachedThreshold={0.1}
        refreshing={refreshing}
        onRefresh={() => fetchLists()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
