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

const formatResponse = (item) => {
    return {
        title: item.trackName,
        artist: item.artistName,
        artwork: item.artworkUrl100,
        price: item.collectionPrice,
        genre: item.primaryGenreName,
        year: item.releaseDate,
        url: item.previewUrl,
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
        .filter((item) => item.trackId && item.trackName)
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
        <View style={{ flex: 1 }}>
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
                                <Image style={styles.image} source={{ uri: item.artwork }} />
                                <View style={styles.info}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.details}>{item.artist}</Text>
                                </View>
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
    container: { flexDirection: "row" },
    image: { width: 50, height: 50, margin: 5, borderRadius: 50 },
    info: { flex: 1, justifyContent: "center" },
    title: { fontSize: 20 },
    details: { color: "gray" },
    button: {
        backgroundColor: "black"
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
