import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator, HomeStack, FeedStack } from "./StackNavigator";
import Notifications from '../Screens/Notifications';
import FeedScreen from '../Screens/FeedScreen';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }} onPress={onPress}>
            <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: 'blue' }}>
                {children}
            </View>
        </TouchableOpacity>
    );
}
const screenOptions = {
    tabBarStyle: {
        tabBarShowLabel: false,
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 25,
        borderRadius: 15,
        height: 90,


    },
    tabBarItemStyle: {
        // backgroundColor: '#00ff00',
        margin: 5,
        borderRadius: 15,
    }
};
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen options={{ title: 'Overview', headerShown: false }} name="HomeTab" component={MainStackNavigator} />
            <Tab.Screen options={{ title: 'Overview', headerShown: false }} name="ContactTab" component={ContactStackNavigator} />
        </Tab.Navigator>
    );
};

function CustomTab({ state, descriptors, navigation }) {
    return (


        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, borderWidth: 1 }}
                    >
                        <MaterialCommunityIcons name="home" color={'#000'} size={20} />
                        <Text style={{ color: isFocused ? '#673ab7' : '#222', textAlign: 'center', }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>


    );
}

const BottomStack = () => {
    return (
        <Tab.Navigator
            {...{ ...screenOptions }}
        // tabBar={(props) => <CustomTab {...props} />}
        >
            <Tab.Screen options={({ route }) => ({
                tabBarStyle: ((route) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                    // console.log(routeName)
                    if (routeName === 'NewFeedScreen' || routeName === 'CameraScreen' || routeName === 'FeedDetailScreen') {
                        return { display: "none" }
                    }
                    return screenOptions.tabBarStyle;
                })(route),
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size, focused }) => {

                    return <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                        <Text style={{ color: color, textAlign: 'center', fontSize: 10 }}>Home</Text>
                    </View>
                },
            })}
                //  options={{ title: 'Overview', headerShown: false }} 
                name="Home" component={FeedStack} />
            <Tab.Screen name="Feed" component={HomeStack}

                options={({ route }) => ({
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarLabel: 'Feed',
                    tabBarStyle: screenOptions.tabBarStyle,
                    tabBarIcon: ({ color, size, focused }) => {
                        return <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialCommunityIcons name="account" color={color} size={size} />

                        </View>
                    },
                    tabBarButton: (props) => {
                        return <CustomTabBarButton {...props} />
                    }




                })}
            />
            <Tab.Screen name="Notifications" component={Notifications}
                options={({ route }) => ({
                    tabBarShowLabel: false,
                    // headerShown: false,
                    tabBarLabel: 'Notifications',
                    tabBarStyle: screenOptions.tabBarStyle,
                    tabBarIcon: ({ color, size, focused }) => {
                        return <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialCommunityIcons name="bell" color={color} size={size} />
                            <Text style={{ color: color, textAlign: 'center', fontSize: 10 }}>Notifications</Text>
                        </View>
                    }
                    ,
                })}

            />
        </Tab.Navigator >
    );
}



export { BottomTabNavigator, BottomStack };


const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});
