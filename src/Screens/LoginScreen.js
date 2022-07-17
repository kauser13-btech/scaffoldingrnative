/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    ActivityIndicator,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import { CommonButton, TextFieldInput } from '../Components';
// import { registerTab } from '../Navigation';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProfile, loginSubmit } from '../actions';
const LoginScreen = (props) => {
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };
    const [authData, setAuthData] = useState({ username: 'ks_0@gmail.com', password: 'secret' });
    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            await dispatch(loginSubmit(username, password));
            const response = await dispatch(fetchProfile());
            setLoading(false);

        }
        catch (e) { }
        setLoading(false);
        // console.log(response);

    };


    return (


        <KeyboardAvoidingView style={styles.container}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <View style={{ width: '100%' }}>
                        <TextFieldInput isDarkMode={isDarkMode} textChangeFunction={(text) => {
                            setAuthData({ ...authData, username: text });
                        }} value={authData['username']} title={`Username`} />
                    </View>
                    <View style={{ width: '100%' }}>

                        <TextFieldInput isDarkMode={isDarkMode} textChangeFunction={(text) => {
                            setAuthData({ ...authData, password: text });
                        }} value={authData['password']} title={`Password`} />
                    </View>
                    <CommonButton loading={loading} pressFunction={() => {
                        handleLogin(authData['username'], authData['password'])
                    }} title={`Login`} />
                </>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>


    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});



export default LoginScreen;
