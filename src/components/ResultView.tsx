import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View,Image, Linking, Dimensions, TouchableOpacity } from "react-native";

interface ResultViewProps{
  route:any;
}

const ResultView = ({route}: ResultViewProps) => {
  const [like, setLike] = useState(false);
  const{item} = route.params;

  const {navigate} = useNavigation();

  const goFavorites = (item:Object)=>{
    navigate('FavoritesList', {
        item:item
    }
    );
  };
  
  return (
    <View style={{ flex: 1 }}>
       <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={{ uri: item.artwork }} />
            </View>
            <View style={styles.info}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.details}>{item.artist}</Text>
                <Text style={styles.text}>Année de sortie : {(item.year).slice(0,4)}</Text>
                <Text style={styles.text}>Genre : {item.genre} - {item.country}</Text>
              </View>
              <TouchableOpacity style={styles.fav} onPress={()=>{setLike(!like); goFavorites(item)}}>
                {
                  like ?(
                  <Ionicons name="heart" size={30} color="red" />
                  ): (
                  <Ionicons name="heart-outline" size={30} color="black" />)
                }
                
              </TouchableOpacity>
            </View>
              <TouchableOpacity style={styles.play} onPress={() => Linking.openURL(item.url)}>
                <Ionicons name="play-circle" size={70} color="black" />
              </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,  
    padding: 20,
  },
  image: { flex:1, height:Dimensions.get("window").width - 40 },
  info: { marginTop:20, flexDirection: "row", justifyContent:'space-between'},
  title: { fontSize: 20, fontWeight:'bold' },
  details: { color: "gray"},
  text: { fontSize: 15 },
  header: {
      justifyContent: "center",
      flexDirection: "row"
  },
  play:{
    flex:1,
    alignItems:'center'
  }
});

export default ResultView;