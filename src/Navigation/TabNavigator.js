import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator, HomeStack, FeedStack, ApprovalStack } from "./StackNavigator";
import Notifications from '../Screens/Notifications';
import FeedScreen from '../Screens/FeedScreen';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen options={{ title: 'Overview', headerShown: false }} name="HomeTab" component={MainStackNavigator} />
            <Tab.Screen options={{ title: 'Overview', headerShown: false }} name="ContactTab" component={ContactStackNavigator} />
        </Tab.Navigator>
    );
};

const BottomStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen options={({ route }) => ({
                tabBarStyle: ((route) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                    // console.log(routeName)
                    if (routeName === 'NewFeedScreen' || routeName === 'CameraScreen' || routeName === 'FeedDetailScreen') {
                        return { display: "none" }
                    }
                    return
                })(route),
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            })}
                //  options={{ title: 'Overview', headerShown: false }} 
                name="Home" component={FeedStack} />
            <Tab.Screen name="Feed" component={HomeStack}

                options={({ route }) => ({

                    headerShown: false,
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                })}
            />
            <Tab.Screen name="Notifications" component={Notifications}
                options={({ route }) => ({

                    // headerShown: false,
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                })}

            />
        </Tab.Navigator>
    );
}


const ApprovalBottomStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen options={({ route }) => ({
                tabBarStyle: ((route) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                    // console.log(routeName)
                    // SignView
                    if (routeName === 'ApprovalDetailScreen' || routeName === 'SignView' || routeName === 'CameraScreen' || routeName === 'FeedDetailScreen') {
                        return { display: "none" }
                    }
                    return
                })(route),
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            })}
                //  options={{ title: 'Overview', headerShown: false }} 
                name="Home" component={ApprovalStack} />
            <Tab.Screen name="Feed" component={HomeStack}

                options={({ route }) => ({

                    headerShown: false,
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                })}
            />
            <Tab.Screen name="Notifications" component={Notifications}
                options={({ route }) => ({

                    // headerShown: false,
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                })}

            />
        </Tab.Navigator>
    );
}



export { BottomTabNavigator, BottomStack, ApprovalBottomStack };