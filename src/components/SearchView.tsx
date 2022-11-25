import React from "react";
import { useNavigation } from '@react-navigation/native';
import {
    Image,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    Button,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    View,
} from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import { Ionicons } from '@expo/vector-icons';
import Favorites from "./Favorites";

/**
 * It takes an object and returns a new object with the same properties, but with different names
 */
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

/**
 * It takes a query, formats it, fetches the results from the iTunes API, filters out the results that
 * don't have a trackId, trackName, and kind of 'song', and then maps the results to a new format
 * */
const searchItunes = async (query) => {
    if (query == "") return;
    const formattedQuery = query.split(" ").join("+");
    const response = await fetch(
        `https://itunes.apple.com/search?term=${formattedQuery}`
    );
    const json = await response.json();
    return json.results
        .filter((item) => item.trackId && item.trackName && item.kind == 'song')
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

    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(handleSubmit, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [input]);

    return (
        <View style={{ flex: 1 }}>

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
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Result', { item: item });
                                }}
                            >
                                <Favorites item={item} />
                                <Button style={styles.button} color="black" title="Add to favories" onPress={() => { onAdd(item); navigation.navigate('Favorites'); }} />
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
    container: { flexDirection: "row", margin: 10 },
    image: { width: 50, height: 50, marginRight: 12, borderRadius: 50 },
    info: { flex: 1, justifyContent: "center" },
    title: { color: "gray", fontSize: 16, fontWeight: "bold" },
    details: { color: "gray" },
    button: {
        backgroundColor: "white"
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderWidth: 1,
        borderBottomColor: 'black'
    }
});

export default SearchView;
