/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    ActivityIndicator,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import { registerLogin, registerTab } from '../Navigation';
import { fetchProfile } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
const WelcomeScreen = (props) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };

    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const response = await dispatch(fetchProfile());
            if (response.type === 'FETCH_PROFILE_SUCCESS') { }
        })();
    }, [dispatch]);

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View style={styles.container}>

                <>
                    <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontSize: 30, fontWeight: '700' }}>Welcome</Text>
                    <ActivityIndicator size="large" color={isDarkMode ? '#ffffff' : '#0000ff'} />
                </>

            </View>
        </SafeAreaView >

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 2,
        borderColor: 'red'
    },

});

WelcomeScreen.options = {
    topBar: {
        visible: false,
    },
};

export default WelcomeScreen;
