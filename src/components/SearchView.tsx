import React from "react";
import { useNavigation } from '@react-navigation/native';
import {
    Image,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    View,
} from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import {Ionicons } from '@expo/vector-icons';
import Favorites from "./Favorites";

const formatResponse = (item) => {
    return {
        title: item.trackName,
        artist: item.artistName,
        artwork: item.artworkUrl100,
        genre: item.primaryGenreName,
        year: item.releaseDate,
        url: item.previewUrl,
        country: item.country,
        id: item.trackId.toString(),
    };
};

const searchItunes = async (query) => {
    if (query == "") return;
    const formattedQuery = query.split(" ").join("+");
    const response = await fetch(
        `https://itunes.apple.com/search?term=${formattedQuery}`
    );
    const json = await response.json();
    return json.results
        .filter((item) => item.trackId && item.trackName && item.kind=='song')
        .map(formatResponse);
};

const SearchView = ({ onAdd }) => {
    const [input, setInput] = useState("");
    const [listResults, setListResults] = useState([]);  


    const handleSubmit = () => {
        searchItunes(input).then((result) => {
            setListResults(result);
        });
    };

    const {navigate} = useNavigation();

    const handleOnPress = (item:Object)=>{
        navigate('Result', {
            item:item
        });
      };

    const goFavorites = (item:Object)=>{
    navigate('FavoritesList', {
        item:item
    }
    );
    };

    useEffect(() => {
        const timeout = setTimeout(handleSubmit, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [input]);

    return (
        <View style={{ flex: 1}}>
            <Text style={styles.header}>Search</Text>
            <TextInput
                value={input}
                style={styles.input}
                onChangeText={setInput}
                placeholder="Search artist or music ..."
            />
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={listResults}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.container} 
                            onPress={()=>handleOnPress(item)}>
                                <Favorites item={item} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>
            </View>


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

export default SearchView;
