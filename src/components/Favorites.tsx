import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const libraryList = [{}];

interface FavoritesProps {
  route: any;
}

const addFavorites = (id: string, title: string, artist: string, artwork: string) => {
  libraryList.push({ id, title, artist, artwork });
}

const LibraryView = ({ route }: FavoritesProps) => {
  const [like, setLike] = useState(false);

  const {navigate} = useNavigation();

  const goFavorites = (item:Object)=>{
    navigate('Favorites', {
        item:item
    }
    );
  };

  if (route.params) {
    const { item } = route.params;
    addFavorites(item.id, item.title, item.artist, item.artwork);
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Favorites</Text>
      <FlatList
        data={libraryList}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: item.artwork }} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.details}>{item.artist}</Text>
            </View>
            <TouchableOpacity onPress={()=>{setLike(!like); item.onAdd; goFavorites(item)}}>
                {
                like ?(
                <Ionicons name="heart" size={30} color="red" />
                ): (
                <Ionicons name="heart-outline" size={30} color="black" />)
                }
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", margin:10 },
    image: { width: 50, height: 50, marginRight: 12, borderRadius: 50 },
    info: { flex: 1, justifyContent: "center" },
    title: { fontSize: 16, fontWeight:"bold"},
    details: { color: "gray" },
    button: {
        backgroundColor: "white"
    },
    header: {
        fontSize: 30,
        backgroundColor: "black",
        color: "white",
        padding: 10,
    },
    input: {
        backgroundColor: "white",
        padding: 10,
    }
});

export default LibraryView;