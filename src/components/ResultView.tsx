import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View,Image,Button, Linking } from "react-native";

interface ResultViewProps{
  route:any;
}

const ResultView = ({route}: ResultViewProps) => {
  const{item} = route.params;

  const {navigate} = useNavigation();

  const goFavorites = (item:Object)=>{
    navigate('Favorites', {
        item:item
    }
    );
  };
  
  return (
    <View style={{ flex: 1 }}>
       <Text style={styles.header1}>Details Music</Text>
       <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={{ uri: item.artwork }} />
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.details}>{item.artist}</Text>
                <Text style={styles.text}>Genre : {item.genre}</Text>
                <Text style={styles.text}>Price : {item.price} $</Text>
                <Button title='Listening preview'
                    color="black"
                    style={styles.button}
                    onPress={() => Linking.openURL(item.url)} />
                <Button style={styles.button} title="Favories" onPress={() => { item.onAdd; goFavorites(item); }}/>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", },
  image: { width: 200, height: 200 },
  info: { flex: 1, },
  title: { fontSize: 20 },
  details: { color: "gray" },
  text: { fontSize: 15 },
  header: {
      justifyContent: "center",
      padding: 20,
      flexDirection: "row"
  },
  header1: {
    fontSize: 30,
    backgroundColor: "black",
    color: "white",
    padding: 10,
  },
  button:{
      backgroundColor:"black"
  }
});

export default ResultView;