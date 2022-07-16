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
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    ActivityIndicator,
    Pressable,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { CustomTextInput, CustopmDropdown } from '../Components/Input';
import { CommonButton } from '../Components';
import { makePost, syncPostJobCreator } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { posts_mock } from '../queue/mockData';
// import { getQueueInstance } from '../queue/queueInstance';

const NewFeedScreen = ({ navigation }) => {

    const [inputData, setInputData] = useState({
        title: '',
        description: '',
        location: ''
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };
    const dispatch = useDispatch();
    const savePost = async () => {
        try {
            setLoading(true);
            await dispatch(makePost({ title: inputData['title'], description: inputData['description'] }));
            setLoading(false);
            navigation.goBack();
        } catch (e) {
            setLoading(false);
        }
    }
    const updateImages = (image) => {
        setImages([...images, image]);
    }
    const navigateToCamera = () => {
        navigation.navigate("CameraScreen", {
            updateImages: updateImages
        });
    }
    console.log(images);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <View>
                            <CustomTextInput onChangeInput={(title) => {
                                setInputData({ ...inputData, title: title });
                            }} title={`Project Title`} value={inputData['title']} isDarkMode={isDarkMode} />


                            <CustomTextInput onChangeInput={(description) => {
                                setInputData({ ...inputData, description: description });
                            }} title={`Project Desscription`} value={inputData['description']} isDarkMode={isDarkMode} />

                            <View>
                                <CustopmDropdown onChangeInput={(location) => {
                                    setInputData({ ...inputData, location: location });
                                }} data={[{ id: 1, title: 'Dhaka' }, { id: 2, title: "Rajshahi" }]} title={`Select  Location`} value={inputData['description']} isDarkMode={isDarkMode} />
                            </View>
                            <View>
                                <CommonButton pressFunction={navigateToCamera} title={`Attach Image`} />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <CommonButton loading={loading} pressFunction={savePost} title={`Save`} />
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>


    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },

});

NewFeedScreen.options = {
    topBar: {
        visible: true,
        backButton: {
            showTitle: false,
        }
    },
    bottomTabs: {
        visible: false,
    },
};

export default NewFeedScreen;
