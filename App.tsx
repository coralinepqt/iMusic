import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SearchView from "./src/components/SearchView";
import Favorites from "./src/components/Favorites"
import ResultView from "./src/components/ResultView";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react/cjs/react.development";
import FavoritesList from "./src/components/FavoritesList";

const Tabs = createBottomTabNavigator();

const App = () => {
  const [libraryList, setLibraryList] = useState([]);

  const addItem = (item) => {
    setLibraryList((prev) => [...prev, item]);
  };
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "FavoritesList":
                iconName = focused ? "heart" : "heart-outline";
                break;
              case "Search":
                iconName = focused ? "musical-notes" : "musical-notes-outline";
                break;
              case "Result":
                iconName = focused ? "library" : "library-outline";
              default:
                iconName = focused ? "library" : "library-outline";
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name="Search">
          {(props) => <SearchView {...props} onAdd={addItem} />}
        </Tabs.Screen>
        <Tabs.Screen name="FavoritesList">
          {(props) => <FavoritesList {...props} libraryList={libraryList} />}
        </Tabs.Screen>
        <Tabs.Screen name="Result">
          {(props) => <ResultView {...props} onAdd={addItem} libraryList={libraryList} />}
        </Tabs.Screen>
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
