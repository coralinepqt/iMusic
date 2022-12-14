import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, Linking, Dimensions, TouchableOpacity } from "react-native";

/* Defining the type of the props that the component will receive. */
interface ResultViewProps {
  route: any;
}

const ResultView = ({ route }: ResultViewProps) => {
  const [like, setLike] = useState(false);
  const { item } = route.params;

  const { navigate } = useNavigation();

  /**
   * GoFavorites is a function that takes an object as an argument and navigates to the Favorites
   * screen, passing the object as a parameter.
   */
  const goFavorites = (item: Object) => {
    navigate('Favorites', {
      item: item
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
            <Text style={styles.text}>Année de sortie : {(item.year).slice(0, 4)}</Text>
            <Text style={styles.text}>Genre : {item.genre} - {item.country}</Text>
          </View>
          <TouchableOpacity onPress={() => { setLike(!like)}}>
            {
              like ? (
                <Ionicons name="heart" size={30} color="red" />
              ) : (
                <Ionicons name="heart-outline" size={30} color="black" onPress={() => {goFavorites(item) }}/>)
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
    marginTop: 20,
    padding: 20,
  },
  image: { flex: 1, height: Dimensions.get("window").width - 40 },
  info: { marginTop: 40, flexDirection: "row", justifyContent: 'space-between' },
  title: { fontSize: 20, fontWeight: 'bold' },
  details: { color: "gray" },
  text: { fontSize: 15 },
  header: {
    justifyContent: "center",
    flexDirection: "row"
  },
  play: {
    marginTop: 40,
    flex: 1,
    alignItems: 'center'
  }
});

export default ResultView;