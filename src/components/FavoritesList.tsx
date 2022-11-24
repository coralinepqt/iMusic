import React from "react";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";
import Favorites from "./Favorites";

interface FavoritesProps {
  route: any;
}
const libraryList = [{}];

const addFavorites = (id: string, title: string, artist: string, artwork: string) => {
  libraryList.push({ id, title, artist, artwork });
}

const FavoritesList = ({ route }: FavoritesProps) => {
  if (route.params) {
    const { item } = route.params;
    addFavorites(item.id, item.title, item.artist, item.artwork);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={libraryList}
        renderItem={({ item }) => <Favorites item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    fontSize: 30,
    backgroundColor: "black",
    color: "white",
    padding: 10,
  },
});

export default FavoritesList;