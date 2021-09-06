import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet, ScrollView, Button } from "react-native";
import { format, differenceInDays, eachDayOfInterval, addDays, subDays, isToday, toDate } from 'date-fns'

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Screen from '../components/Screen'
import Card from "../components/Card";


function ListingDetailsScreen({ route }) {
  const listing = route.params;

  var timeStamp2 = listing.listTime2;
  var timeStamp2Date = toDate(timeStamp2);

  var result3 = format(timeStamp2Date, 'MMMyyyy');
  var result = format(timeStamp2Date, 'MMMyyyy');
  console.log(result.localeCompare(result3));
  if (result === result3) {
    console.log('True')
  } else {
    console.log('False')
  }
  const diff = differenceInDays(new Date(), new Date(timeStamp2Date));

  const result2 = eachDayOfInterval({
    start: new Date(),
    end: new Date()
  })



  if (!isToday(timeStamp2Date)) {
    for (var i = 1; i < result2.length; i++) {
      console.log(format(result2[i], 'd	MMM yyyy hh:mm:ss:SS a'))
    }
  }

  console.log(isToday(timeStamp2Date));
  console.log(timeStamp2);
  console.log(format(timeStamp2Date, 'd	MMM yyyy hh:mm:ss:SS a'));
  console.log(listing.size);


  

  useEffect(() => {

    return () => {

    }
  }, [])

  return (
    <ScrollView>
      <Screen style={styles.screen}>
        <View style={styles.main}>

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{listing.listTitle}</Text>
            <Text style={styles.price}>${listing.listPrice}</Text>


            <Text style={styles.price}>{result} </Text>

            <Text style={styles.price}>{diff} </Text>

            {result2.map((value, key) => (
              <Text key={key} style={styles.title} > {format(value, 'd	MMM yyyy hh:mm:ss:SS a')} </Text>
            )
            )}

            <Text style={styles.price}>{format(result2[result2.length - 1], 'd	MMM yyyy hh:mm:ss:SS a')} </Text>

          </View>
        </View>


        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/me.jpg")}
            title="Shafqat Ullah Khan"
            subTitle={listing.size}
          />
        </View>

        <Button title={'Push'} onPress={testLocalNoti} />
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  detailsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
  main: {
    backgroundColor: colors.white,
    margin: 20,
    elevation: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderTopColor: colors.secondary,
    borderBottomColor: colors.secondary,
    borderLeftColor: colors.primary,
    borderRightColor: colors.primary
  }
});

export default ListingDetailsScreen;
