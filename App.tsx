import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SearchView from "./src/components/SearchView";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react/cjs/react.development";

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
              case "Music":
                iconName = focused ? "heart" : "heart-outline";
                break;
              case "Search":
                iconName = focused ? "musical-notes" : "musical-notes-outline";
              default:
                iconName = focused ? "library" : "library-outline";
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{ activeTintColor: "black", inactiveTintColor: "gray" }}
      >
        <Tabs.Screen name="Search">
          {(props) => <SearchView {...props} onAdd={addItem} />}
        </Tabs.Screen>

      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
