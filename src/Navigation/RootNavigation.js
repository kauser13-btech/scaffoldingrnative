import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar, View, ActivityIndicator, useColorScheme } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../actions';
import { AuthStack } from './StackNavigator';
import { ApprovalBottomStack } from './TabNavigator';
const RootNavigation = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const token = useSelector(state => state.auth['api_token'] && state.auth['api_token']);
    // console.log(token);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const init = async () => {
        try {
            await dispatch(fetchProfile());
        } catch (e) {
            setLoading(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        init()
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color={isDarkMode ? '#ffffff' : '#0000ff'} />
            </View>
        )
    }

    return (
        <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {
                token === undefined ?
                    <AuthStack /> : <ApprovalBottomStack />
            }
        </NavigationContainer>
    )
}


export default RootNavigation;