import React from "react";
import { View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function Card({ title, subTitle, imageUrl, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.card}>
      {/* <Image style={styles.image} source={{ uri: imageUrl }} /> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          {subTitle}
        </Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderTopColor: colors.primary,
    borderBottomColor: colors.primary,
    borderLeftColor: colors.secondary,
    borderRightColor: colors.secondary,
    elevation: 13,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
