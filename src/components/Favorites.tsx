import React from "react";
import { FlatList, StyleSheet, Text, View, Button, Image} from "react-native";

const libraryList = [{}];

interface FavoritesProps{
  route:any;
}

const addFavorites=(id:string, title:string, artist:string, artwork:string)=>{
  libraryList.push({id, title, artist, artwork});
  // console.log(artwork);
}

const LibraryView = ({route}: FavoritesProps) => {
  if(route.params){
    const{item} = route.params;
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
        </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    backgroundColor: "black",
    color: "white",
    padding: 10,
  },
});

export default LibraryView;