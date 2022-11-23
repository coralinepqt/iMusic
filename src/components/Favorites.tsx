import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const Favorites = ({ item }) => {
  const [like, setLike] = useState(false);
  console.log(item); 
    const {navigate} = useNavigation();


  const goFavorites = (item:Object)=>{
        navigate('FavoritesList', {
            item:item
        }
        );
      };

  return (
    <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.artwork }} />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: { flex:1, flexDirection: "row" },
    image: { width: 50, height: 50, marginRight: 12, borderRadius: 50 },
    info: {flex:1, justifyContent:"center"},
    title: { fontSize: 16, flexWrap:'wrap', fontWeight:"bold"},
    details: {color: "gray" },
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

export default Favorites;