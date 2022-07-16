import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/Home";
import About from "../Screens/About";
import Contact from "../Screens/Contact";
import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import LoginScreen from "../Screens/LoginScreen";
import FeedScreen from "../Screens/FeedScreen";
import FeedDetailScreen from "../Screens/FeedDetailScreen";

import { Button } from "react-native";
import NewFeedScreen from "../Screens/NewFeedScreen";
import CameraScreen from "../Screens/CameraScreen";

const Stack = createStackNavigator();


const options = {
    gestureEnabled: true,
    transitionSpec: {
        open: { animation: 'timing', config: { duration: 300 } },
        close: { animation: 'timing', config: { duration: 300 } },
    },
    cardStyleInterpolator: ({ current: { progress } }) => {
        return {
            cardStyle: {
                opacity: progress,
            }
        }
    }
}
const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="TabHome" component={Home} />
            <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
    );
}

const ContactStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>
    );
}


const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={ProfileScreen} />
        </Stack.Navigator>
    );
}


const FeedStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                orientation: 'portrait',
            }}>
            <Stack.Screen options={{
                title: 'Home',
            }} name="FeedScreen" component={FeedScreen} />
            <Stack.Screen options={{
                title: 'Detail Screen'
            }} name="FeedDetailScreen" component={FeedDetailScreen} />
            <Stack.Screen options={{
                title: 'New Feed'
            }} name="NewFeedScreen" component={NewFeedScreen} />
            <Stack.Screen options={{
                title: 'New Feed',
                headerShown: false,
            }} name="CameraScreen" component={CameraScreen} />
        </Stack.Navigator>
    );
}




const AuthStack = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export { MainStackNavigator, ContactStackNavigator, HomeStack, AuthStack, FeedStack };