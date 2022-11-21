import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const MusicItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.artwork }} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{item.artist}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  image: { width: 50, height: 50, margin: 5, borderRadius: 50 },
  info: { flex: 1, justifyContent: "center" },
  title: { fontSize: 20 },
  details: { color: "gray" },
});

export default MusicItem;
